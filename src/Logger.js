const { EventEmitter } = require('events');
const { Logs } = require('../functions/Logs');

class Logger extends EventEmitter {
  log(text) {
    if (text) {
      return console.log(`${Logs.LOG} MESAJ:\n\n${text}`);
    } else {
      throw new Error("A log message wasn't provided.");
    }
  }

  warn(text) {
    if (text) {
      return console.warn(`${Logs.WARN} MESAJ:\n\n${text}`);
    } else {
      throw new Error("A warn message wasn't provided.");
    }
  }

  info(text) {
    if (text) {
      return console.log(`${Logs.INFO} MESAJ:\n\n${text}`);
    } else {
      throw new Error("A info message wasn't provided.");
    }
  }

  success(text) {
    if (text) {
      return console.log(`${Logs.SUCCESS} MESAJ:\n\n${text}`);
    } else {
      throw new Error("A success message wasn't provided.");
    }
  }

  error(text) {
    if (text) {
      return console.error(`${Logs.ERROR} MESAJ:\n\n${text}`);
    } else {
      throw new Error("A error message wasn't provided.");
    }
  }
}

module.exports = Logger;