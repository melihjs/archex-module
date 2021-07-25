const Discord = require('discord.js');
const mongoose = require('mongoose');
const { schedule, getWinner, endGiveaway } = require('../functions/GiveawayManager');
const scheduler = require('node-schedule');
const { EventEmitter } = require('events');
const Giveaway = require('../functions/GiveawayStarter');
const Model = require('../models/GiveawayManager');

class GiveawayManager extends EventEmitter {
    constructor(client, { mongoURL = '', emoji = '🎉', embedColor = '#5555dd' }) {
        super();

        if (!client) throw new Error("A client wasn't provided.");
        if (!mongoURL) throw new Error("A connection string wasn't provided.");

        this.client = client;
        this.url = mongoURL;
        this.emoji = emoji;
        this.color = embedColor;

        mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.client.on('ready', async () => {
            const now = new Date();
            const giveaways = await Model.find({ endsOn: { $gt: now }, hasEnded: 'False' });
            await schedule(this, giveaways);
        });
    }

    async start(message, options) {
        if (!options.time) throw new Error("You didn't provide a duration.");
        if (!options.prize) throw new Error("You didn't provide a prize.");
        if (!options.winners || isNaN(options.winners)) throw new Error("You didn't provide an amount of winners OR winners is not a number.");
        var guild = this.client.guilds.cache.get(message.guild.id);
        var channel = guild.channels.cache.get(message.channel.id);
        const giveawayEmbed = new Discord.MessageEmbed()
        .setAuthor(options.prize)
        .setColor(this.color)
        .setDescription(`🎖️ Winners: ${options.winners}
        🥳 Hosted By: <@${message.author.id}>`)
        .setFooter(`Ends `)
        .setTimestamp(new Date(Date.now() + options.time));
        var msg = await channel.send(giveawayEmbed);
        await msg.react(this.emoji);
        const newGiveaway = new Giveaway({
            prize: options.prize,
            duration: options.time,
            channelId: message.channel.id,
            guildId: message.guild.id,
            endsOn: new Date(Date.now() + options.time),
            startsOn: new Date(),
            messageId: msg.id,
            winners: options.winners,
            hostedBy: message.author.id
        });
        msg.channel.send('Created the giveaway. 🎉');
        await schedule(this, [newGiveaway]);
        this.emit('giveawayStart', newGiveaway);
        return newGiveaway;
    }

    async end(messageId) {
        let data = await Model.findOne({ messageId: messageId });
        if (!data) return false;
        if (data.hasEnded === 'True') return false;
        var job = scheduler.scheduledJobs[`${messageId}`];
        if (!job) return false;
        job.cancel();
        var channel = this.client.channels.cache.get(data.channelId);
        if (channel) {
            var message = await channel.messages.fetch(messageId);
            if (message) {
                var { embeds, reactions } = message;
                var reaction = reactions.cache.get(this.emoji);
                var users = await reaction.users.fetch();
                var entries = users.filter(user => !user.bot).array();
                if (embeds.length === 1) {
                    var embed = embeds[0];
                    var winner = getWinner(entries, data.winners);
                    var finalWinners;
                    if (!winner) {
                        finalWinners = 'Nobody Reacted';
                    }
                    else {
                        finalWinners = winner.map(user => user.toString()).join(', ');
                    }
                    embed.setDescription(`🎖️ Winner(s): ${finalWinners}`);
                    embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL({ format: 'png', size: 512 }));
                    embed.setTimestamp();
                    await message.edit(embed);
                    if (!winner) {
                        message.channel.send(`Nobody reacted to the **${data.prize}** giveaway. **ID**: \`${messageId}\`\n${message.url}`);
                    }
                    else {
                        message.channel.send(`Congratulations ${finalWinners}, you won the **${data.prize}**!\n${message.url}`);
                    }
                    var ended = await endGiveaway(messageId);
                    this.emit('giveawayEnd', ended);
                }
            }
        }
        return data;
    }

    async fetch(messageId) {
        var giveaway = await Model.findOne({ messageId: messageId });
        if (!giveaway) return false;
        return giveaway;
    }

    async reroll(messageId) {
        var giveaway = await Model.findOne({ messageId: messageId });
        if (!giveaway) return false;
        if (giveaway.hasEnded === 'False') return false;
        var channel = this.client.channels.cache.get(giveaway.channelId);
        if (channel) {
            var message = await channel.messages.fetch(messageId);
            if (message) {
                var { embeds, reactions } = message;
                var reaction = reactions.cache.get(this.emoji);
                var users = await reaction.users.fetch();
                var entries = users.filter(user => !user.bot).array();
                var winner = getWinner(entries, giveaway.winners);
                var finalWinners;
                if (!winner) {
                    finalWinners = 'Nobody Reacted';
                    message.channel.send(`Nobody reacted to the **${giveaway.prize}** giveaway. **ID**: \`${messageId}\`\n${message.url}`);
                }
                else {
                    finalWinners = winner.map(user => user.toString()).join(', ');
                    message.channel.send(`Congratulations ${finalWinners}, you won the **${giveaway.prize}**!\n**ID**: \`${messageId}\`\n${message.url}`);
                }
                if (embeds.length === 1) {
                    const embed = embeds[0];
                    embed.setDescription(`🎖️ Winner(s): ${finalWinners}`);
                    await message.edit(embed);
                }
            }
        }
        this.emit('giveawayReroll', giveaway);
        return giveaway;
    }

    async list(guildId) {
        if (!guildId) throw new Error("Please provide a guild ID.");
        var Giveaways = await Model.find({ guildId: guildId, hasEnded: 'False' });
        if (Giveaways.length < 1) return false;
        var array = [];
        Giveaways.map(i => array.push({
            hostedBy: this.client.users.cache.get(i.hostedBy).tag ? this.client.users.cache.get(i.hostedBy).tag : "Nobody#0000",
            timeRemaining: i.endsOn - Date.now(),
            messageId: i.messageId,
            prize: i.prize
        }));
        return array;
    }
}

module.exports = GiveawayManager;