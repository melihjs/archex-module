const { EventEmitter } = require('events');

class MessagePageMenu extends EventEmitter {
  async create(message, [ embed1, embed2 ], buttonEmoteOne, buttonEmoteTwo) {
    if (!message) throw new Error("A message wasn't provided.");
    if (!embed1) throw new Error("A embed one message wasn't provided.");
    if (!embed2) throw new Error("A embed two message wasn't provided.");
    if (!buttonEmoteOne) throw new Error("A button emote one wasn't provided.");
    if (!buttonEmoteTwo) throw new Error("A button emote two wasn't provided.");
    var msg = await message.channel.send({ embed: embed1 });
    await msg.react(buttonEmoteOne);
    await msg.react(buttonEmoteTwo);
    var filter = (reaction, user) => user.id !== message.client.user.id;
    var cl = msg.createReactionCollector(filter);
    cl.on('collect', async (reaction, user) => {
      if (reaction._emoji.name == buttonEmoteOne) {
        return msg.edit({ embed: embed1 }).then(async () => {
          reaction.users.remove(message.author.id);
        });
      } else if (reaction._emoji.name == buttonEmoteTwo) {
        return msg.edit({ embed: embed2 }).then(async () => {
          reaction.users.remove(message.author.id);
        });
      }
    });
  }
}

module.exports = MessagePageMenu;