const { Util } = require('discord.js');

class Embed {
  constructor(data = {}, skipValidation) {
    this.setup(data, skipValidation);
  }

  setup(data, skipValidation) {
    this.type = data.type || 'rich';
    this.title = data.title || null;
    this.description = data.description || null;
    this.url = data.url || null;
    this.color = 'color' in data ? Util.resolveColor(data.color) : null;
    this.timestamp = 'timestamp' in data ? new Date(data.timestamp).getTime() : null;
    this.fields = [];
    if (data.fields) {
      this.fields = skipValidation ? data.fields.map(Util.cloneObject) : this.constructor.normalizeFields(data.fields);
    }
    this.thumbnail = data.thumbnail
      ? {
          url: data.thumbnail.url,
          proxyURL: data.thumbnail.proxyURL || data.thumbnail.proxy_url,
          height: data.thumbnail.height,
          width: data.thumbnail.width,
        }
      : null;
    this.image = data.image
      ? {
          url: data.image.url,
          proxyURL: data.image.proxyURL || data.image.proxy_url,
          height: data.image.height,
          width: data.image.width,
        }
      : null;
    this.video = data.video
      ? {
          url: data.video.url,
          proxyURL: data.video.proxyURL || data.video.proxy_url,
          height: data.video.height,
          width: data.video.width,
        }
      : null;
    this.author = data.author
      ? {
          name: data.author.name,
          url: data.author.url,
          iconURL: data.author.iconURL || data.author.icon_url,
          proxyIconURL: data.author.proxyIconURL || data.author.proxy_icon_url,
        }
      : null;
    this.provider = data.provider
      ? {
          name: data.provider.name,
          url: data.provider.name,
        }
      : null;
    this.footer = data.footer
      ? {
          text: data.footer.text,
          iconURL: data.footer.iconURL || data.footer.icon_url,
          proxyIconURL: data.footer.proxyIconURL || data.footer.proxy_icon_url,
        }
      : null;
  }

  setColor(color) {
    if (!color) return console.log('DiscordAPIError: Renksiz gömülü mesaj olmaz, lütfen bir renk belirt.');
    this.color = color;
    return this;
  }

  setTimestamp(timestamp = Date.now()) {
    if (timestamp instanceof Date) timestamp = timestamp.getTime();
    this.timestamp = timestamp;
    return this;
  }

  setImage(url) {
    if (!url) return console.log('DiscordAPIError: Boş fotoğraf olmaz.');
    this.image = url;
    return this;
  }

  setThumbnail(url) {
    if (!url) return console.log('DiscordAPIError: Boş fotoğraf olmaz.');
    this.thumbnail = url;
    return this;
  }

  spliceFields(index, deleteCount, ...fields) {
    this.fields.splice(index, deleteCount, ...this.constructor.normalizeFields(...fields));
    return this;
  }

  setAuthor(name, iconURL, url) {
    if (!name) return console.log('DiscordAPIError: Yazar tarafındaki yazı bölümü boş olmaz.');
    this.author = { name: name, iconURL, url };
    return this;
  }

  setFooter(text, iconURL) {
    if (!text) return console.log('DiscordAPIError: Altbilgi boş olmaz.');
    this.footer = { text: text, iconURL };
    return this;
  }

  setTitle(title) {
    if (!title) return console.log('DiscordAPIError: Başlık boş olmaz.');
    this.title = title;
    return this;
  }
  
  setDescription(desc) {
    if (!desc) return console.log('DiscordAPIError: Açıklama boş olmaz.');
    this.description = desc;
    return this;
  }

  setURL(url) {
    if (!url) return console.log('DiscordAPIError: Geçersiz görünülü URL girdiniz veya hiç bir URL girmediniz.');
    this.url = url;
    return this;
  }

  addField(name, value, inline) {
    return this.addFields({ name, value, inline });
  }

  addFields(...fields) {
    this.fields.push(...this.constructor.normalizeFields(fields));
    return this;
  }

  toJSON() {
    return {
      title: this.title,
      type: 'rich',
      description: this.description,
      url: this.url,
      timestamp: this.timestamp && new Date(this.timestamp),
      color: this.color,
      fields: this.fields,
      thumbnail: this.thumbnail,
      image: this.image,
      author: this.author && {
        name: this.author.name,
        url: this.author.url,
        icon_url: this.author.iconURL,
      },
      footer: this.footer && {
        text: this.footer.text,
        icon_url: this.footer.iconURL,
      },
    };
  }

  static normalizeField(name, value, inline = false) {
    return {
      name: name,
      value: value,
      inline,
    };
  }

  static normalizeFields(...fields) {
    return fields
      .flat(2)
      .map(field =>
        this.normalizeField(field.name, field.value, typeof field.inline === 'boolean' ? field.inline : false),
      );
  }
}

module.exports = Embed;