const errTemplate = require('../error/errTemplate.js');
const utils = require('../utils/utils.js');

class UserValidator {
  static join(req, res, next) {
    const { email, pwd, nickName } = req.body;

    if (!email || !pwd || !nickName) return res.status(400).json(errTemplate.msg('필요한 데이터가 없습니다'));

    if (utils.isNotString(email, pwd, nickName)) {
      return res.status(400).json(errTemplate.msg('문자열이 아닙니다'));
    }

    next();
  }

  static emailAndPwd(req, res, next) {
    const { email, pwd } = req.body;

    if (!email || !pwd) return res.status(400).json(errTemplate.msg('누락된 항목이 있습니다'));

    if (utils.isNotString(email, pwd)) {
      return res.status(400).json(errTemplate.msg('문자열이 아닙니다'));
    }

    next();
  }
}

module.exports = UserValidator;
