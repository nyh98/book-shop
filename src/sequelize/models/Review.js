const Sequelize = require('sequelize');
class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init(
      {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        createdAt: { type: Sequelize.INTEGER, allowNull: false, field: 'created_at' },
        comment: { type: Sequelize.TEXT, allowNull: false },
      },
      { sequelize, modelName: 'Review', tableName: 'reviews', charset: 'utf8', collate: 'utf8_general_ci' }
    );
  }

  static associate(db) {
    db.Review.belongsTo(db.User, { foreignKey: { name: 'userId', field: 'user_id' }, targetKey: 'id' });
    db.Review.belongsTo(db.Book, { foreignKey: { name: 'bookId', field: 'book_id' }, targetKey: 'id' });
  }
}

module.exports = Review;
