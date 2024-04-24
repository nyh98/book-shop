const bookService = require('../service/BookService');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//남용환
class BookController {
  static async getBooks(req, res, next) {
    const reqDatas = req.query;
    const { tk } = req.cookies;

    //토큰 검증 후 에러(ex. 토큰이 없다, 유효기간이 지남, 조작된 토큰,)이면 null값으로 도서 조회
    //토큰 검증 후 유효한 토큰이면 디코딩된 유저 아이디로 도서 조회
    jwt.verify(tk, process.env.SECRET_KEY, async (err, data) => {
      const userId = err ? null : data.userId;
      await bookService
        .getBooks(reqDatas, userId)
        .then(rows => res.status(200).json(rows))
        .catch(e => next(e));
    });
  }

  static async updateLike(req, res, next) {
    const bookId = req.params.id;
    const { userId } = res.locals;

    await bookService
      .updateLike(bookId, userId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(e => next(e));
  }

  static async deleteLike(req, res, next) {
    const bookId = req.params.id;
    const userId = res.locals.userId;

    await bookService
      .deleteLike(bookId, userId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(e => next(e));
  }
}

module.exports = BookController;
