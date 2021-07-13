# ghost-eco

## Yükleme
   ```npm
   npm i ghost-eco
   ```

## Örnek Kod:

   ```js
    const { Client } = require('discord.js');
    const { Economy } = require('ghost-eco');
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

    client.login(process.env.token);
   ```

## Telif Hakkı:

   - Ghost Development: [Tıkla!](https://discord.gg/delimine)