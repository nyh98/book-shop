const errTemplate = Object.freeze({
  msg: message => {
    return { err: message };
  },
});

module.exports = errTemplate;
