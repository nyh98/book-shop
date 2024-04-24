const Sequelize = require('sequelize');
class Like extends Sequelize.Model {
  static initiate(sequelize) {
    Like.init(
      { id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true } },
      { sequelize, timestamps: false, modelName: 'Like', tableName: 'likes' }
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.User, { foreignKey: { name: 'userId', field: 'user_id' }, targetKey: 'id' });
    db.Like.belongsTo(db.Book, { foreignKey: { name: 'bookId', field: 'book_id' }, targetKey: 'id' });
  }
}

module.exports = Like;
