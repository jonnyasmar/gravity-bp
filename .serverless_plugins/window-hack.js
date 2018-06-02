'use strict';

class WindowHack {
  constructor(serverless, options) {
    if (typeof window === 'undefined') {
      global.window = {};
    }
  }
}

module.exports = WindowHack;
