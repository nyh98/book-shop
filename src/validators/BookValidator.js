const errTemplate = require('../error/errTemplate');

class BookValidator {
  static checkvalue(req, res, next) {
    const { limit, page } = req.query;

    if (!limit || !page) return res.status(400).json(errTemplate.msg('조회할 도서 갯수와 페이지 데이터가 없습니다'));

    if (parseInt(page) <= 0 || 0 >= parseInt(limit)) {
      return res.status(400).json(errTemplate.msg('음수 또는 0 인 값이 있습니다'));
    }

    next();
  }
}

module.exports = BookValidator;
