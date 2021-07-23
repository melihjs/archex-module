const { EventEmitter } = require('events');
const Discord = require('discord.js');
const { MessageMenuOption, MessageMenu } = require('discord-buttons');

class Bot extends EventEmitter {
    constructor(client, dt = {}) {
        super();

        if (!client) throw new Error("A client wasn't provided.");
        if (!dt.token) throw new Error("A token wasn't provided.");
        if (!dt.prefix) throw new Error("A prefix wasn't provided.");

        this.client = client;
        this.token = dt.token;
        this.prefix = dt.prefix;
        this.client.on('ready', async () => {
            if (dt.mobile == true) {
                Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
            } else if (dt.mobile == false) {
                if (!dt.presence.name) throw new Error("A presence name wasn't provided.");
                this.client.user.setPresence({
                    activity: {
                        name: dt.presence.name,
                        type: dt.presence.type || "PLAYING"
                    },
                    status: dt.presence.status || "online"
                })
            }
        });

        this.client.login(this.token).catch(async () => {
            throw new Error("A valid token wasn't provided. If you need help come the discord.gg/delimine");
        });
    }

    async onMessage(options = {}) {
        if (!options.name) throw new Error("A name wasn't provided.");
        if (!options.message) throw new Error("A message wasn't provided.");
        this.client.on('message', async (msg) => {
            var prefix = this.prefix;
            if (msg.content.indexOf(prefix) !== 0) return;
            var args = msg.content.slice(prefix.length).trim().split(/ +/g);
            var command = args.shift().toLowerCase();
            if (command == options.name) {
                var Msg = options.message
                .replace('{ping}', this.client.ws.ping)
                .replace('{user}', msg.author);
                if (!options.embed) {
                  return msg.channel.send(Msg);
                } else {
                  var Embed = new Discord.MessageEmbed()
                  .setTitle(options.embed.title)
                  .setAuthor(options.embed.author.name, options.embed.author.icon, options.embed.author.url)
                  .setDescription(options.embed.description)
                  .setImage(options.embed.image)
                  .setThumbnail(options.embed.thumbnail)
                  .setColor(options.embed.color)
                  .setURL(options.embed.url)
                  .setFooter(options.embed.footer.name, options.embed.footer.icon);
                  return msg.channel.send(Embed);
                }
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

    async selectRoleMenu(guild = {}) {
      if (!guild.options.label) throw new Error("A options label wasn't provided.");
      if (!guild.options.value) throw new Error("A options value wasn't provided.");
      if (!guild.options.description) throw new Error("A options desc wasn't provided.");
      if (!guild.options.emoji) throw new Error("A options emoji wasn't provided.");
      if (guild.options) {
        var MenuOpt = new MessageMenuOption()
        .setLabel(guild.options.label)
        .setValue(guild.options.value)
        .setDescription(guild.options.description)
        .setEmoji(guild.options.emoji)
        .setDefault(true);
        if (!guild.menu.placeholder) throw new Error("A menu placeholder wasn't provided.");
        if (!guild.menu.id) throw new Error("A menu Id wasn't provided.");
        if (!guild.menu.minValues) throw new Error("A menu min values wasn't provided.");
        if (!guild.menu.maxValues) throw new Error("A menu max values wasn't provided.");
        if (guild.menu) {
          var Menu = new MessageMenu()
          .setPlaceholder(guild.menu.placeholder)
          .setID(guild.menu.id)
          .setMinValues(guild.menu.minValues)
          .setMaxValues(guild.menu.maxValues)
          .addOption(MenuOpt);
          this.client.on('message', async (message) => {
            var args = message.content.split(" ");
            if (args[0] == `${this.prefix}${guild.commandName}`) {
              return message.channel.send(guild.message, Menu);
            }
          });
          this.client.on('clickMenu', async (menu) => {
            await menu.clicker.fetch();
            if (menu.id == guild.menu.id) {
              var member;
              var fetchMem = await menu.guild.members.fetch(menu.clicker.member.id, false);
              if (fetchMem) member = menu.guild.members.cache.get(menu.clicker.member.id);
              await member.fetch(true);
              var rol = menu.values[0];
              if (menu.clicker.member.roles.cache.has(rol)) {
                menu.clicker.member.roles.remove(rol);
                menu.reply.send(`Senden <@&${rol}> rolünü aldım!`, true);
              } else {
                menu.clicker.member.roles.add(rol);
                menu.reply.send(`Sana <@&${rol}> rolünü verdim!`, true);
              }
            }
          });
        }
      }
    }
}

module.exports = Bot;