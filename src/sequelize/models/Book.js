const Sequelize = require('sequelize');
class Book extends Sequelize.Model {
  static initiate(sequelize) {
    Book.init(
      {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING(50), allowNull: false },
        author: { type: Sequelize.STRING(10), allowNull: false },
        summaryinfo: { type: Sequelize.STRING(200), field: 'summary_info' },
        price: { type: Sequelize.INTEGER, allowNull: false },
        description: { type: Sequelize.TEXT },
        totalPages: { type: Sequelize.INTEGER, field: 'total_pages' },
        ISBN: { type: Sequelize.STRING(20), allowNull: false },
        chapters: { type: Sequelize.TEXT },
        releaseDay: { type: Sequelize.DATE, allowNull: false, field: 'release_day' },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Book',
        tableName: 'books',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Book.belongsTo(db.Genre, { foreignKey: { name: 'genreId', field: 'genre_id' }, targetKey: 'id' });
  }
}

module.exports = Book;
