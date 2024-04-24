const Sequelize = require('sequelize');
class ShoppingCart extends Sequelize.Model {
  static initiate(sequelize) {
    ShoppingCart.init(
      {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        quantity: { type: Sequelize.INTEGER, allowNull: false },
      },
      { sequelize, modelName: 'ShoppingCart', tableName: 'shopping_carts' }
    );
  }

  static associate(db) {
    db.ShoppingCart.belongsTo(db.User, { foreignKey: { name: 'userId', field: 'user_id' }, targetKey: 'id' });
    db.ShoppingCart.belongsTo(db.Book, { foreignKey: { name: 'bookId', field: 'book_id' }, targetKey: 'id' });
  }
}

module.exports = ShoppingCart;
