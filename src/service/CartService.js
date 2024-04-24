const { ShoppingCart, Book } = require('../sequelize/models');
const bookService = require('./BookService');

//남용환
class CartService {
  #cartModel;
  #bookService;

  constructor() {
    this.#cartModel = ShoppingCart;
    this.#bookService = bookService;
  }

  /**
   * @param {'up' | 'down'} handle
   */
  async #modifyQuantity(handle, item, userId, bookId) {
    switch (handle) {
      case 'up':
        return await this.#cartModel.update(
          { quantity: item.quantity + 1 },
          {
            where: { userId, bookId },
          }
        );
      case 'down':
        return await this.#cartModel.update(
          { quantity: item.quantity - 1 },
          {
            where: { userId, bookId },
          }
        );

      default:
        throw new TypeError('handle param is "up" or "down"');
    }
  }

  async add(bookId, userId, quantity) {
    //존재하는 책인지 검증 존재하지 않는 책이면 getBooks()에서 에러 발생
    await this.#bookService.getBooks({ id: bookId });

    //이미 장바구니에 있는 아이템이면 수량 증가
    const item = await this.#cartModel.findOne({ where: { userId, bookId } });
    if (item) {
      return await this.#modifyQuantity('up', item, userId, bookId);
    }

    //장바구니 추가
    await this.#cartModel.create({
      userId: userId,
      bookId: bookId,
      quantity,
    });
  }

  /**
   * @param {number[]} checkedItems
   */
  async viewCartByUserId(userId, checkedItems = null) {
    const whereSql = checkedItems ? { userId, bookId: checkedItems } : { userId };

    const items = await this.#cartModel.findAll({
      include: [{ model: Book }],
      where: whereSql,
    });

    return items;
  }

  async deletedItem(userId, bookId) {
    await this.#cartModel.destroy({ where: { userId, bookId } });
  }
}

const cartService = new CartService();
module.exports = cartService;
