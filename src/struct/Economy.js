const { MessageEmbed } = require('discord.js');
const { EventEmitter } = require('events');
const data = require("quick.db");
const ms = require('parse-ms');
const { utc } = require('moment');

class Economy extends EventEmitter {
    constructor(filePath) {
		super(filePath);
        this.file = filePath || "./json.sqlite";
        this.db = data;
    }

    daily(userID, guildID, message) {
        var user = message.client.users.cache.get(userID);
        function rastgeleMiktar(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        let times = this.db.fetch(`günlük_${userID}_${guildID}`);
        let day = 86400000;
        if (times !== null && day - (Date.now() - times) > 0) {
            let time = ms(day - (Date.now() - times));
            var Embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setColor("RED")
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`:x: Günlük ödülünü almak için **${time.hours}** saat, **${time.minutes}** dakika, **${time.seconds}** saniye sonra tekrar dene!`);
            return message.channel.send({ embed: Embed });
        }
        var miktar = rastgeleMiktar(100, 650);
        var Embed2 = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
        .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`:white_check_mark: **${user.tag}** günlük ödülünü topladın, ödül: **${miktar}** TL, zaman: **${utc(Date.now()).format('DD/MM/YYYY')}**`);
        return message.channel.send({ embed: Embed2 }).then(async () => {
            this.db.add(`para_${guildID}_${userID}`, miktar),
            this.db.set(`günlük_${userID}_${guildID}`, Date.now());
        });
    }

    fetchMoney(userID, guildID, message) {
        var user = message.client.users.cache.get(userID);
        var para = this.db.fetch(`para_${guildID}_${userID}`);
        var Embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
        .setColor("BLURPLE")
        .setTimestamp()
        .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
        .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`:ok_hand: **${user.tag}** adlı kullanıcının toplam parası: **${para || 0}** TL`);
        return message.channel.send({ embed: Embed });
    }

    addMoney(userID, guildID, message, miktar) {
        if (typeof miktar !== "number" && !miktar) throw new Error('Miktar sayı olmazsa kabul edilmez.');
        var perm = "ADMINISTRATOR";
        var user = message.client.users.cache.get(userID);
        if (!message.member.permissions.has(perm)) {
            var Embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setColor("RED")
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`:x: **${user.tag}** senin bunu yapmak için yetkin yok!`);
            return message.channel.send({ embed: Embed });
        } else {
            var Embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`:ok_hand: **${user.tag}** adlı kullanıcının cüzdanına **${miktar}** TL eklendi.`);
            return message.channel.send({ embed: Embed }).then(async () => {
                this.db.add(`para_${guildID}_${userID}`, miktar);
            });
        }
    }

    delMoney(userID, guildID, message, miktar) {
        var user = message.client.users.cache.get(userID);
        var paras = this.db.fetch(`para_${guildID}_${userID}`);
        if (!paras) {
            var Embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setColor("RED")
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`:x: **${user.tag}** adlı kullanıcının hiç parası yok!`);
            return message.channel.send({ embed: Embed });
        } else if (paras < miktar) {
            var Embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setColor("RED")
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`:x: Girmiş olduğunuz miktar, kullanıcının parasından fazla!`);
            return message.channel.send({ embed: Embed });
        }
        if (typeof miktar !== "number" && !miktar) throw new Error('Miktar sayı olmazsa kabul edilmez.');
        var perm = "ADMINISTRATOR";
        if (!message.member.permissions.has(perm)) {
            var Embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setColor("RED")
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`:x: **${user.tag}** senin bunu yapmak için yetkin yok!`);
            return message.channel.send({ embed: Embed });
        } else {
            var Embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`:ok_hand: **${user.tag}** adlı kullanıcının cüzdanından **${miktar}** TL silindi.`);
            return message.channel.send({ embed: Embed }).then(async () => {
                this.db.subtract(`para_${guildID}_${userID}`, miktar);
            });
        }
    }

    leaderboard(guildID, message, length) {
        var Para = this.db.all().filter(data => data.ID.startsWith(`para_${guildID}`)).sort((a, b) => b.data - a.data);
        Para.length = length;
        var stat = "";
        for (var i in Para) {
            stat += `**${Para.indexOf(Para[i])+1}.** <@${Para[i].ID.replace(`para_${guildID}_`, "")}> - \`${Para[i].data}\` Para!\n`
        }
        var Embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
        .setColor("BLURPLE")
        .setTimestamp()
        .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic:true}))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(stat || "Veri bulunamadı!");
        return message.channel.send({ embed: Embed })
    }
}

module.exports = Economy;