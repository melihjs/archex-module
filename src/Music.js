const { EventEmitter } = require('events');
const DisTube = require('distube');
const { Database } = require("quickmongo");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

class Music extends EventEmitter {
  constructor(client, url = '') {
    super();

    if (!client) throw new Error("A client wasn't provided.");
    if (!url) throw new Error("A mongo URL wasn't provided.");

    this.client = client;
    this.db = new Database(url);
    this.distube = new DisTube(client, { 
      searchSongs: false, 
      emitNewSongOnly: true 
    });
  }

  async kur(message) {
    if (!message) throw new Error("A message handler wasn't provided.");
    message.delete();
    var stop = new MessageButton()
    .setStyle("red")
    .setLabel("Durdur")
    .setID("stop");
    var pause = new MessageButton()
    .setStyle("blurple")
    .setLabel("Duraklat")
    .setID("pause");
    var resume = new MessageButton()
    .setStyle("green")
    .setLabel("Devam Et")
    .setID("resume");
    var skip = new MessageButton()
    .setStyle("grey")
    .setLabel("Atla")
    .setID("skip");
    var queue = new MessageButton()
    .setStyle("blurple")
    .setLabel("Sıra")
    .setID("queue");
    var Row = new MessageActionRow()
    .addComponent(stop)
    .addComponent(pause)
    .addComponent(resume)
    .addComponent(skip)
    .addComponent(queue);
    var Embed = new MessageEmbed()
    .setColor('BLURPLE')
    .setTitle("Hiçbir şey oynamıyor!")
    .setImage("https://media.discordapp.net/attachments/864172498722226227/865621684883030046/20210523_174346.jpg?width=427&height=427");
    this.msg = await message.channel.send(Embed, Row);
    this.db.set(`${message.guild.id}`, `${this.msg.id}`);
  }

  async oynat(message, music) {
    if (!message) throw new Error("A message handler wasn't provided.");
    if (!music) throw new Error("A music name handler wasn't provided.");
    this.events(message);
    this.distube.play(message, music);
    message.delete();
  }

  async events(message) {
    if (!message) throw new Error("A message handler wasn't provided.");
    var msgId = await this.db.get(`${message.guild.id}`)
    var msg = await message.channel.messages.fetch(msgId)
    this.distube.on("playSong", (message, queue, song) => {
      var Embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(`Şu an oynatılıyor: **${song.name}**`)
      .setImage(song.thumbnail);
      msg.edit({ embed: Embed });
    });
    this.distube.on("finish", (message, que, song) =>{
      var Embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle("Hiçbir şey oynamıyor!")
      .setImage("https://media.discordapp.net/attachments/864172498722226227/865621684883030046/20210523_174346.jpg?width=427&height=427");
      msg.edit({ embed: Embed });
    });
  }
  async buton(button) {
    if (!button) throw new Error("A button handler wasn't provided.");
    button.reply.defer();
    var embed = new MessageEmbed()
    .setColor('BLURPLE')
    .setTitle("Hiçbir şey oynamıyor!")
    .setImage("https://media.discordapp.net/attachments/864172498722226227/865621684883030046/20210523_174346.jpg?width=427&height=427");
    var message = button.message;
    if (button.id == 'stop') {
      this.distube.stop(message)
      button.message.edit(embed)
      button.message.channel.send('Sıradaki Müzik Durduruldu!')
    } else if (button.id == 'pause') {
      this.distube.pause(message)
      button.message.channel.send('Sıradaki Müzik Duraklatıldı!')
    } else if (button.id == 'resume') {
      this.distube.resume(message)
      button.message.channel.send('Sıradaki Müziğe Devam Edildi!')
    } else if (button.id == 'queue') {
      var queue = this.distube.getQueue(message);
      var curqueue = queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n");
      button.message.channel.send(curqueue)
    } else if (button.id == 'skip') {
      this.distube.skip(message)
      button.message.channel.send('Sıradaki Müzik Atlandı!')
    }
  }
}

module.exports = Music;