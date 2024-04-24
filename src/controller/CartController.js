const errTemplate = require('../error/errTemplate');
const cartService = require('../service/CartService');

//남용환
class CartController {
  static async add(req, res, next) {
    const userId = res.locals.userId;
    const { bookId, quantity } = req.body;

    await cartService
      .add(bookId, userId, quantity)
      .then(() => res.sendStatus(201))
      .catch(e => next(e));
  }

  static async viewCart(req, res, next) {
    const userId = res.locals.userId;

    await cartService
      .viewCartByUserId(userId)
      .then(items => res.status(200).json(items))
      .catch(e => next(e));
  }

  static async deletedItem(req, res, next) {
    const userId = res.locals.userId;
    const { bookId } = req.body;

    await cartService
      .deletedItem(userId, bookId)
      .then(() => res.sendStatus(200))
      .catch(e => next(e));
  }

  static async getCheckedItems(req, res, next) {
    const userId = res.locals.userId;
    const { checkedItems } = req.body;

    if (!Array.isArray(checkedItems)) {
      return res.status(400).json(errTemplate.msg('체크된 아이템들을 배열로 보내주세요'));
    }

    await cartService
      .viewCartByUserId(userId, checkedItems)
      .then(items => res.status(200).json(items))
      .catch(e => next(e));
  }
}

module.exports = CartController;
