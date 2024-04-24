const { Book, Genre, Like, sequelize } = require('../sequelize/models');
const { Op, Sequelize } = require('sequelize');

class BookService {
  #bookModel;
  #likeModel;
  constructor() {
    this.#bookModel = Book;
    this.#likeModel = Like;
  }

  //남용환
  #assembleQueryParams(reqQuery) {
    const where = {};
    const joinWhere = {};
    const pageDatas = {};
    if (reqQuery.id) {
      where.id = { [Op.eq]: reqQuery.id };
    }

    if (reqQuery.news === 'true') {
      const curDate = new Date();
      const lastMonth = new Date(Date.parse(curDate) - 30 * 1000 * 60 * 60 * 24);

      where.releaseDay = { [Op.between]: [lastMonth, curDate] };
    }

    if (reqQuery.genre) {
      joinWhere.genre = { [Op.eq]: reqQuery.genre };
    }

    if (reqQuery.page && reqQuery.limit) {
      const limit = parseInt(reqQuery.limit);
      const currentPage = parseInt(reqQuery.page);

      pageDatas.limit = limit;
      pageDatas.offset = limit * (currentPage - 1);
    }

    return { where, joinWhere, pageDatas };
  }

  /**
   *
   * @param {import('sequelize').WhereOptions | undefined} where
   * @param {Number} currentPage
   * @param {Number} limit
   */
  async #createPagination(where, currentPage, limit) {
    const totalItems = await this.#bookModel.count({ include: { model: Genre, where } });
    const totalPaging = Math.ceil(totalItems / limit);
    const pagination = { currentPage, totalPaging };
    return pagination;
  }

  //남용환
  async getBooks(reqQuery, userId = null) {
    const { where, joinWhere, pageDatas } = this.#assembleQueryParams(reqQuery);
    const rows = await this.#bookModel.findAll({
      attributes: [
        'id',
        'title',
        'author',
        'summary_info',
        'price',
        'description',
        'total_pages',
        'ISBN',
        'chapters',
        'release_day',
        [
          Sequelize.literal(`(SELECT EXISTS (SELECT * FROM likes WHERE Book.id = book_id AND user_id = ${userId}))`),
          'liked',
        ],
        [Sequelize.literal('(SELECT COUNT(*) FROM likes WHERE Book.id = likes.book_id)'), 'likes'],
      ],
      include: [
        {
          model: Genre,
          attributes: ['genre'],
          where: joinWhere,
        },
      ],
      where: where,
      limit: pageDatas.limit,
      offset: pageDatas.offset,
    });

    if (!rows[0]) throw new Error('Not found');

    const currentPage = Number(reqQuery.page);
    const pagination = await this.#createPagination(joinWhere, currentPage, pageDatas.limit);

    const result = { items: rows, pagination };
    return result;
  }

  //남용환
  async updateLike(bookId, userId) {
    //해당 아이디의 책이 존재하는지 검증
    const book = await this.#bookModel.findOne({ where: { id: bookId } });
    if (!book) throw new Error('Not found');

    //이미 좋아요를 한 책인지 검증(중복 방지)
    const likeResult = await this.#likeModel.findOne({ where: { userId, bookId } });

    if (likeResult) throw new Error('이미 좋아요 한 도서입니다');

    await this.#likeModel.create({ userId, bookId });
  }

  async deleteLike(bookId, userId) {
    const book = await this.#bookModel.findOne({ where: { id: bookId } });
    if (!book) throw new Error('Not found');
    await this.#likeModel.destroy({ where: { userId, bookId } });
  }

  /**
   *
   * @param {{bookId , quantity}[]} items
   * @returns
   */
  async getTotalPrice(items, Txn = null) {
    const results = items.map(async item => {
      const [result, metaData] = await sequelize.query('SELECT sum(price * ?) AS price FROM books WHERE id = ?', {
        replacements: [item.quantity, item.bookId],
        Transaction: Txn,
      });

      const [data] = result;

      return data.price;
    });
    return await Promise.all(results).then(result => result.reduce((a, b) => Number(a) + Number(b)));
  }
}

const bookService = new BookService();

module.exports = bookService;
