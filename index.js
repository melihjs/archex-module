const file = files => require(`./src/struct/${files}`);

module.exports = {
  Economy: file('Economy'),
  GiveawayManager: file('GiveawayManager'),
  DiscordEmbed: file('DiscordEmbed'),
  Matematik: file('Matematik'),
  Bot: file('Bot'),
  AutoRole: file('AutoRole'),
  MessagePage: file('MessagePage'),
  Music: file('Music'),
  Logger: file('Logger'),
  version: require('./package.json').version
};