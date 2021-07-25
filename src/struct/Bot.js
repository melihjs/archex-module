const { EventEmitter } = require('events');
const Discord = require('discord.js');
const { MessageMenuOption, MessageMenu } = require('discord-buttons');

class Bot extends EventEmitter {
    constructor(client, dt = {}) {
      super();
        if (!client) throw new Error("A client wasn't provided.");
        this.client = client;
    }

    async leaveGuild(guildId) {
        if (!guildId) throw new Error("A guild Id wasn't provided.");
        this.client.guilds.cache.get(guildId).leave();
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

    async on(eventname, code) {
      if (!eventname) throw new Error("A event name wasn't provided: ready, message!");
      if (!code) throw new Error("A event code wasn't provided.");
      if (eventname == 'ready') {
        this.client.on('ready', code);
      } else if (eventname == 'message') {
        this.client.on('message', code);
      } else if (eventname == 'guildMemberJoin') {
        this.client.on('guildMemberAdd', code);
      } else if (eventname == 'guildMemberLeave') {
        this.client.on('guildMemberRemove', code);
      } else if (eventname == 'guildBoost') {
        this.client.on('guildMemberBoost', code);
      } else if (eventname == 'guildAdd') {
        this.client.on('guildCreate', code);
      } else if (eventname == 'guildRemove') {
        this.client.on('guildDelete', code);
      } else if (eventname == 'eval') {
        
      }
    }

    async start(token) {
      if (!token) throw new Error("A bot token wasn't provided.");
      this.client.login(token).catch(async () => {
        throw new Error("A valid token wasn't provided. If you need help come the: discord.gg/RCmv5uR3tj");
      });
    }

    async userSetStatus(status) {
      if (!status) throw new Error("A bot status wasn't provided.");
      this.client.on('ready', async () => {
        this.client.user.setStatus(status);
      });
    }
}

module.exports = Bot;