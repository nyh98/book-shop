const Sequelize = require('sequelize');
class BookImg extends Sequelize.Model {
  static initiate(sequelize) {
    BookImg.init(
      {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        img: { type: Sequelize.TEXT, allowNull: false },
      },
      { sequelize, timestamps: false, modelName: 'BookImg', tableName: 'book_imgs' }
    );
  }

  static associate(db) {
    db.BookImg.belongsTo(db.Book, { foreignKey: { name: 'bookId', field: 'book_id' }, targetKey: 'id' });
  }
}

module.exports = BookImg;
