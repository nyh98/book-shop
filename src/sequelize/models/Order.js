const Sequelize = require('sequelize');
class Order extends Sequelize.Model {
  static initiate(sequelize) {
    Order.init(
      {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        address: { type: Sequelize.TEXT, allowNull: false },
        consignee: { type: Sequelize.STRING(10), allowNull: false },
        phoneNumber: { type: Sequelize.STRING(20), allowNull: false, field: 'phone_number' },
        paymentMethod: { type: Sequelize.STRING(10), allowNull: false, field: 'payment_method' },
        totalPrice: { type: Sequelize.INTEGER, allowNull: false, field: 'total_price' },
        paymentDate: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW, field: 'payment_date' },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Order',
        tableName: 'orders',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Order.belongsTo(db.User, { foreignKey: { name: 'userId', field: 'user_id' }, targetKey: 'id' });
  }
}

module.exports = Order;
