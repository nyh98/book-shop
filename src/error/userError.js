const errTemplate = require('./errTemplate');

class UserError {
  static err(err, req, res, next) {
    console.log(err);
    res.status(400).json(errTemplate.msg('에러발생 관리자에게 문의하세요'));
  }
  static join(err, req, res, next) {
    console.log(err);
    res.status(400).json(errTemplate.msg('회원가입 실패 관리자에게 문의하세요'));
  }
  static login(err, req, res, next) {
    if (err.message == 'Not found') {
      return res.status(404).join(errTemplate.msg('아이디 또는 비밀번호가 일치하지 않습니다'));
    }

    if (err.message === '비밀번호가 틀립니다') {
      return res.status(400).json(errTemplate.msg(err.message));
    }

    res.status(400).json(errTemplate.msg('로그인 실패 관리자에게 문의하세요'));
  }
}

module.exports = UserError;
