const orderService = require('../service/OrderService');
//남용환
class OrderController {
  static async createOrder(req, res, next) {
    const userId = res.locals.userId;
    const { items, address, consignee, phoneNumber, paymentMethod } = req.body;

    await orderService
      .createOrderTxn(items, address, consignee, phoneNumber, paymentMethod, userId)
      .then(() => res.sendStatus(201))
      .catch(e => next(e));
  }

  static async viewOrder(req, res, next) {
    const userId = res.locals.userId;

    await orderService
      .viewOrderByUserId(userId)
      .then(rows => res.status(200).json(rows))
      .catch(e => next(e));
  }
}

module.exports = OrderController;
