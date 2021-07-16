const file = files => require(`./src/${files}`);

module.exports = {
    Economy: file('Economy'),
    GiveawayManager: file('GiveawayManager'),
    DiscordEmbed: file('DiscordEmbed'),
    Matematik: file('Matematik'),
    Bot: file('Bot'),
    AutoRole: file('AutoRole'),
    MessagePage: file('MessagePage'),
    Music: file('Music'),
    version: require('./package.json').version
};