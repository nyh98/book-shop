const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const errTemplate = require('../error/errTemplate');
dotenv.config();

class TokenValidator {
  static verify(req, res, next) {
    const { tk } = req.cookies;

    if (!tk) return res.status(401).json(errTemplate.msg('로그인 해주세요'));

    jwt.verify(tk, process.env.SECRET_KEY, (err, data) => {
      if (err) return res.status(400).json(errTemplate.msg('잘못된 접근입니다'));

      if (data) {
        res.locals.userId = data.userId;
        next();
      }
    });
  }
}

module.exports = TokenValidator;
