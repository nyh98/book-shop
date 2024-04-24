const errTemplate = require('./errTemplate');

class OrderError {
  static err(err, req, res, next) {
    console.log(err);
    res.status(400).json(errTemplate.msg('에러발생 관리자에게 문의하세요'));
  }
}

module.exports = OrderError;
