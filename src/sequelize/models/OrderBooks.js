const Sequelize = require('sequelize');

class OrderBooks extends Sequelize.Model {
  static initiate(sequelize) {
    OrderBooks.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        quantity: { type: Sequelize.INTEGER, allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'OrderBooks',
        tableName: 'order_books',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.OrderBooks.belongsTo(db.Order, { foreignKey: { name: 'orderId', field: 'order_id' }, targetKey: 'id' });
    db.OrderBooks.belongsTo(db.Book, { foreignKey: { name: 'bookId', field: 'book_id' }, targetKey: 'id' });
  }
}

module.exports = OrderBooks;
