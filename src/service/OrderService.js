const { Sequelize, where } = require('sequelize');
const { sequelize, Book } = require('../sequelize/models');
const Order = require('../sequelize/models/Order');
const OrderBooks = require('../sequelize/models/OrderBooks');
const bookService = require('./BookService');
const cartService = require('./CartService');

//남용환
class OrderService {
  #orderModel;
  #orderBooksModel;
  #bookService;
  #cartService;

  constructor() {
    this.#orderModel = Order;
    this.#orderBooksModel = OrderBooks;
    this.#bookService = bookService;
    this.#cartService = cartService;
  }

  async #createOrder(address, consignee, phoneNumber, paymentMethod, totalPrice, userId, Txn = null) {
    return await this.#orderModel.create(
      { address, consignee, phoneNumber, paymentMethod, totalPrice, userId },
      { transaction: Txn }
    );
  }

  /**
   *
   * @param {{bookId , quantity}[]} items
   */
  async #createOrderBooks(items, orderId, Txn = null) {
    const result = items.map(async item => {
      return await this.#orderBooksModel.create(
        { orderId, bookId: item.bookId, quantity: item.quantity },
        { transaction: Txn }
      );
    });
    return await Promise.all(result);
  }

  async createOrderTxn(items, address, consignee, phoneNumber, paymentMethod, userId) {
    const Txn = await sequelize.transaction();
    try {
      const total_price = await this.#bookService.getTotalPrice(items, Txn);

      const result = await this.#createOrder(address, consignee, phoneNumber, paymentMethod, total_price, userId, Txn);
      const ordersPk = result.id;
      await this.#createOrderBooks(items, ordersPk, Txn);
      const bookIds = items.map(item => item.bookId);

      await this.#cartService.deletedItem(userId, bookIds);

      await Txn.commit();
    } catch (e) {
      await Txn.rollback();
      throw new Error(e);
    }
  }

  async viewOrderByUserId(userId) {
    const orders = await this.#orderModel.findAll({ userId });

    const orderIds = orders.map(order => order.id);

    const orderBooks = await this.#orderBooksModel.findAll({
      attributes: ['quantity', 'order_id', 'book_id'],
      include: { model: Book },
      where: { orderId: orderIds },
    });

    const result = orders.map(order => {
      const orderJson = order.toJSON();
      const items = orderBooks.filter(orderBook => orderBook.dataValues.order_id === order.id);
      orderJson.items = items;
      return orderJson;
    });
    return result;
  }
}

const orderService = new OrderService();
module.exports = orderService;
