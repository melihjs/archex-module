const Model = require('../models/GiveawayManager');

class Giveaway {
    constructor(options) {
        this.prize = options.prize;
        this.endsOn = options.endsOn;
        this.guildId = options.guildId;
        this.channelId = options.channelId;
        this.hostedBy = options.hostedBy;
        this.messageId = options.messageId;
        this.startsOn = options.startsOn;
        this.winners = options.winners;
        this.hasEnded = 'False';
        this.duration = options.duration;
        const newGiveaway = new Model({
            prize: this.prize,
            endsOn: this.endsOn,
            guildId: this.guildId,
            channelId: this.channelId,
            hostedBy: this.hostedBy,
            messageId: this.messageId,
            startsOn: this.startsOn,
            winners: this.winners,
            hasEnded: this.hasEnded,
            duration: this.duration
        });
        newGiveaway.save();
    }
}

module.exports = Giveaway;