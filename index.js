const file = files => require(`./src/${files}`);
const { Client } = require('discord.js');
const client = new Client();
require('discord-buttons')(client);

module.exports = {
    Economy: file('Economy'),
    GiveawayManager: file('GiveawayManager'),
    DiscordEmbed: file('DiscordEmbed'),
    Matematik: file('Matematik'),
    Bot: file('Bot'),
    version: require('./package.json').version
};