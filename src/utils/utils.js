const crypto = require('crypto');

const utils = Object.freeze({
  hashing(pwd, saltValue = null) {
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPwd = crypto.pbkdf2Sync(pwd, saltValue ?? salt, 10000, 10, 'sha512').toString('base64');

    return { salt, hashPwd };
  },
  isNotString(...values) {
    return values.every(target => typeof target !== 'string');
  },

  isNotValidOrderItems(items) {
    if (Array.isArray(items)) {
      const result = items.every(item => {
        if (item.bookId && item.quantity) return true;
      });
      return !result;
    }
    return true;
  },
});

module.exports = utils;
