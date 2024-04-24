const Sequelize = require('sequelize');
const User = require('./User');
const Book = require('./Book');
const BookImg = require('./BookImg');
const Genre = require('./Genre');
const Like = require('./Like');
const Order = require('./Order');
const Review = require('./Review');
const ShoppingCart = require('./ShoppingCart');
const OrderBooks = require('./OrderBooks');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Book = Book;
db.BookImg = BookImg;
db.Genre = Genre;
db.Order = Order;
db.Review = Review;
db.ShoppingCart = ShoppingCart;
db.Like = Like;
db.OrderBooks = OrderBooks;

User.initiate(sequelize);
Book.initiate(sequelize);
BookImg.initiate(sequelize);
Genre.initiate(sequelize);
Order.initiate(sequelize);
Review.initiate(sequelize);
ShoppingCart.initiate(sequelize);
Like.initiate(sequelize);
OrderBooks.initiate(sequelize);

User.associate(db);
Book.associate(db);
BookImg.associate(db);
Genre.associate(db);
Order.associate(db);
Review.associate(db);
ShoppingCart.associate(db);
Like.associate(db);
OrderBooks.associate(db);

module.exports = db;
