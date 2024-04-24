const errTemplate = require('./errTemplate');

class CartError {
  static err(err, req, res, next) {
    if (err.message === 'Not found') return res.status(404).json(errTemplate.msg('정보를 찾을 수 없습니다'));

    if (err instanceof TypeError) return res.status(500).json(errTemplate.msg('개발자의 실수 관리자에게 문의하세요'));

    console.log(err);
    res.status(400).json('에러 발생 관리자에게 문의하세요');
  }
}

module.exports = CartError;
