const errTemplate = require('./errTemplate');

class BookError {
  static getErr(err, req, res, next) {
    if (err.message === 'Not found') return res.status(404).json(errTemplate.msg('정보를 찾을 수 없습니다'));

    console.log(err);
    res.status(400).json(errTemplate.msg('조회 실패 관리자에게 문의하세요'));
  }

  static likeErr(err, req, res, next) {
    if (err.message === 'Not found') return res.status(404).json(errTemplate.msg('정보를 찾을 수 없습니다'));

    if (err.message === '이미 좋아요 한 도서입니다') return res.status(400).json(errTemplate.msg(err.message));

    console.log(err.message);
    res.status(400).json(errTemplate.msg('에러 발생 관리자에게 문의하세요'));
  }
}

module.exports = BookError;
