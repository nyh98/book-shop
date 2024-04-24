const Sequelize = require('sequelize');
class Genre extends Sequelize.Model {
  static initiate(sequelize) {
    Genre.init(
      {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        genre: { type: Sequelize.STRING(10), allowNull: false },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Genre',
        tableName: 'genres',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {}
}

module.exports = Genre;
