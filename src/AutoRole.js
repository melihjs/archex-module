const { EventEmitter } = require('events');

class AutoRole extends EventEmitter {
  constructor(client) {
    super();

    if (!client) throw new Error("A client wasn't provided.");

    this.client = client;

    this.client.on('ready', async () => { return; });
  }

  async onJoinMember(guild = {}) {
    this.client.on('guildMemberAdd', async (member) => {
      if (!member.user.bot) {
        this.client.channels.cache.get(guild.channel).send(guild.message).then(async () => {
          return member.roles.add(guild.role);
        });
      } else {
        return;
      }
    });
  }

  async onJoinBot(guild = {}) {
    this.client.on('guildMemberAdd', async (member) => {
      if (member.user.bot) {
        this.client.channels.cache.get(guild.channel).send(guild.message).then(async () => {
          return member.roles.add(guild.role);
        });
      } else {
        return;
      }
    });
  }
}

module.exports = AutoRole;