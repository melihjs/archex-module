const { EventEmitter } = require('events');
const Discord = require('discord.js');

class Bot extends EventEmitter {
    constructor(client, { options = {} }) {
        super();

        if (!client) throw new Error("A client wasn't provided.");
        if (!options.token) throw new Error("A token wasn't provided.");
        if (!options.prefix) throw new Error("A prefix wasn't provided.");

        this.client = client;
        this.token = options.token;
        this.prefix = options.prefix;
        this.client.on('ready', async () => {
            if (options.mobile == true) {
                Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
            } else if (options.mobile == false) {
                if (!options.presence.name) throw new Error("A presence name wasn't provided.");
                this.client.user.setPresence({
                    activity: {
                        name: options.presence.name,
                        type: options.presence.type || "PLAYING"
                    },
                    status: options.presence.status || "online"
                })
            }
        });

        this.client.login(this.token).catch(async () => {
            throw new Error("A valid token wasn't provided. If you need help come the discord.gg/delimine");
        });
    }

    async onMessage({ name, message }) {
        if (!name) throw new Error("A name wasn't provided.");
        if (!message) throw new Error("A message wasn't provided.");
        this.client.on('message', async (msg) => {
            var prefix = this.prefix;
            if (msg.content.indexOf(prefix) !== 0) return;
            var args = msg.content.slice(prefix.length).trim().split(/ +/g);
            var command = args.shift().toLowerCase();
            if (command == name) {
                var Msg = message
                .replace('{ping}', this.client.ws.ping)
                .replace('{user}', message.author);
                return msg.channel.send(Msg);
            }
        });
    }

    async onJoinMember(guild = {}) {
        if (!guild.channel) throw new Error("A channel wasn't provived.");
        if (!guild.message) throw new Error("A message wasn't provived.");
        this.client.on('guildMemberAdd', async (member) => {
            if (!member.user.bot) {
                var Msg = guild.message
                .replace('{userName}', member.user.username)
                .replace('{userName}', member.user.username)
                .replace('{userName}', member.user.username)
                .replace('{userName}', member.user.username)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name);
                return this.client.channels.cache.get(guild.channel).send(Msg).catch(async (error) => {
                    throw new Error(error);
                });
            } else {
                return;
            }
        });
    }

    async onJoinBot(guild = {}) {
        if (!guild.channel) throw new Error("A channel wasn't provided.");
        if (!guild.message) throw new Error("A message wasn't provided.");
        this.client.on('guildMemberAdd', async (member) => {
            if (member.user.bot) {
                var Msg = guild.message
                .replace('{botName}', member.user.username)
                .replace('{botName}', member.user.username)
                .replace('{botName}', member.user.username)
                .replace('{botName}', member.user.username)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name);
                return this.client.channels.cache.get(guild.channel).send(Msg).catch(async (error) => {
                    throw new Error(error);
                });
            } else {
                return;
            }
        });
    }

    async leaveGuild(guildId) {
        if (!guildId) throw new Error("A guild Id wasn't provided.");
        this.client.guilds.cache.get(guildId).leave();
    }

    async onReady(message) {
        this.client.on('ready', async () => {
            console.log(message);
        });
    }

    async onLeaveMember(guild = {}) {
        if (!guild.channel) throw new Error("A channel wasn't provided.");
        if (!guild.message) throw new Error("A message wasn't provided.");
        this.client.on('guildMemberRemove', async (member) => {
            if (!member.user.bot) {
                var Msg = guild.message
                .replace('{userName}', member.user.username)
                .replace('{userName}', member.user.username)
                .replace('{userName}', member.user.username)
                .replace('{userName}', member.user.username)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name);
                return this.client.channels.cache.get(guild.channel).send(Msg).catch(async (error) => {
                    throw new Error(error);
                });
            } else {
                return;
            }
        });
    }

    async onLeaveBot(guild = {}) {
        if (!guild.channel) throw new Error("A channel wasn't provided.");
        if (!guild.message) throw new Error("A message wasn't provided.");
        this.client.on('guildMemberRemove', async (member) => {
            if (member.user.bot) {
                var Msg = guild.message
                .replace('{botName}', member.user.username)
                .replace('{botName}', member.user.username)
                .replace('{botName}', member.user.username)
                .replace('{botName}', member.user.username)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name)
                .replace('{guildName}', member.guild.name);
                return this.client.channels.cache.get(guild.channel).send(Msg).catch(async (error) => {
                    throw new Error(error);
                });
            } else {
                return;
            }
        });
    }

    async onGuildBoost(guild = {}) {
        if (!guild.channel) throw new Error("A channel wasn't provided.");
        if (!guild.message) throw new Error("A message wasn't provided.");
        if (!guild.role) throw new Error("A role wasn't provided.");
        this.client.on('guildMemberBoost', async (member) => {
            if (member.roles.cache.has(guild.role)) {
                return;
            } else {
                this.client.channels.cache.get(guild.channel).send(guild.message).catch(() => {});
            };
        });
    }
}

module.exports = Bot;