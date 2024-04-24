const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        email: { type: Sequelize.STRING(30), allowNull: false, unique: true },
        pwd: { type: Sequelize.STRING(255), allowNull: false },
        nickName: { type: Sequelize.STRING(6), allowNull: false, unique: true, field: 'nick_name' },
        salt: { type: Sequelize.STRING(255), allowNull: false },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {}
}

module.exports = User;
