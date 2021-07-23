# archex

## Yükleme
   ```npm
   npm i archex
   ```

## Dropwn Roles Kod:

  ```js
  const { Client } = require('discord.js');
const { Bot } = require('archex');
const client = new Client();
const bot = new Bot(client, {
    token: "token",
    prefix: "prefix",
    mobile: true
});
require('discord-buttons')(client);

bot.onReady('Bot ready!');

bot.selectRoleMenu({
    commandName: "kullanılacak komut ismi", // use with prefix!
    message: "mesaj",
    options: {
        label: "label",
        value: "rol id",
        description: "açıklama",
        emoji: "emoji"
    },
    menu: {
        placeholder: "boşluk",
        id: "id",
        minValues: "sayı",
        maxValues: "sayı"
    }
});
  ```

## Ekonomi Kod:

   ```js
    const { Client } = require('discord.js');
    const { Economy } = require('archex');
    const client = new Client();
    const eco = new Economy();
    client.eco = eco;

    client.on('ready', async () => {
    console.log('ready');
    });

    client.on('message', async (message) => {
    if (!message.guild) return;
    var args = message.content.split(" ");
    if (args[0] == "!daily") {
        client.eco.daily(message.author.id, message.guild.id, message);
    } else if (args[0] == "!money") {
        client.eco.fetchMoney(message.author.id, message.guild.id, message);
    } else if (args[0] == "!addMoney") {
        var mone = args[1];
        if (!args[1]) mone = "1";
        client.eco.addMoney(message.author.id, message.guild.id, message, mone);
    } else if (args[0] == "!delMoney") {
        var mone = args[1];
        if (!args[1]) mone = "1";
        client.eco.delMoney(message.author.id, message.guild.id, message, mone);
    } else if (args[0] == "!leaderboard") {
        client.eco.leaderboard(message.guild.id, message, 10);
    }
    });

    client.login('token');
   ```

## Giveaway Kod:
   
   ```js
   const { Client } = require('discord.js');
const { GiveawayManager } = require('ghost-eco');
const client = new Client();
const ms = require('ms');
client.giveaways = new GiveawayManager(client, {
  mongoURL: 'mongoURL',
  emoji: '🎉',
  embedColor: 'BLURPLE'
});

client.on('ready', async () => {
  console.log('ready');
});

client.on('message', async (message) => {
  if (!message.guild) return;
  var args = message.content.split(" ");
  if (args[0] == "!gw") {
    var süre = args[1];
    var winnerCount = args[2];
    var ödül = args.slice(3).join(" ");
    client.giveaways.start(message, { 
      prize: ödül,
      time: ms(süre),
      winners: winnerCount
    });
  }
});

client.login('token');
```

## Bot Kod:

```js
const { Client, MessageEmbed } = require('discord.js');
const { Bot } = require('ghost-eco');
const client = new Client();
const bot = new Bot(client, { 
  token: process.env.token,
  prefix: '!',
  mobile: true
});

bot.onReady('Bot ready!');

bot.onMessage({
  name: "deneme",
  message: "deneme"
});

bot.onJoinMember({
  channel: "864515384752340992",
  message: "{userName} adlı kullanıcı katıldı, hoş geldin!"
});

bot.onJoinBot({
  channel: "864515384752340992",
  message: "{botName} adlı bot OAuth2 metoduyla katıldı!"
});
```

## Music kod:

```js
const { Client } = require('discord.js');
const { Music } = require('archex');
const client = new Client();
client._music = new Music(client, 'mongoURL');
require('discord-buttons')(client);

client.on('ready', async () => console.log('ready'));

client.on('message', async (message) => {
  var args = message.content.split(" ");
  if (args[0] == "!pl") {
    var msc = args.slice(1).join(" ");
    if (!msc) return message.channel.send("Music!");
    client._music.oynat(message, msc);
  } else if (args[0] == "!!kur") {
    client._music.kur(message);
  };
});

client.on('clickButton', async (button) => {
  client._music.buton(button);
});

client.login("token");
```

## Telif Hakkı:

   - Ghost Development: [Tıkla!](https://discord.gg/delimine)