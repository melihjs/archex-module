class Matematik {
  constructor(client, { token = '', sayi = '', sayi2 = '' }) {
    super();

    if (!client) throw new Error("A client wasn't provided.");
    if (!sayi) throw new Error("A number 1 wasn't provided.");
    if (!sayi2) throw new Error("A number 2 wasn't provided.");

    this.client = client;
    this.sayi1 = sayi;
    this.sayi2 = sayi2;
    this.token = token;

    this.client.login(this.token).catch(async (error) => {
      throw new Error(error);
    });
  }

  toplama(message) {
    var toplam = Math.floor(this.sayi1) + Math.floor(this.sayi2);
    return message.channel.send(`Toplama işleminin sonucu: **${toplam}**`);
  }

  çıkarma(message) {
    var toplam = Math.floor(this.sayi1) - Math.floor(this.sayi2);
    return message.channel.send(`Çıkarma işleminin sonucu: **${toplam}**`);
  }

  çarpma(message) {
    var toplam = Math.floor(this.sayi1) * Math.floor(this.sayi2);
    return message.channel.send(`Çarpma işleminin sonucu: **${toplam}**`);
  }

  bölme(message) {
    var toplam = Math.floor(this.sayi1) / Math.floor(this.sayi2);
    return message.channel.send(`Bölme işleminin sonucu: **${toplam}**`);
  }
}

module.exports = Matematik;