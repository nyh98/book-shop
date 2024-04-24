const errTemplate = require('../error/errTemplate');

class CartValidator {
  static checkValue(req, res, next) {
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity) return res.status(400).json(errTemplate.msg('필요한 데이터가 없습니다'));

    next();
  }
}

module.exports = CartValidator;
