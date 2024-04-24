const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const cartRouter = require('./routers/cartRouter');
const { sequelize } = require('./sequelize/models');
const genreRouter = require('./routers/genreRouter');
const orderRouter = require('./routers/orderRouter');

dotenv.config();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('디비 연결 성공');
  })
  .catch(err => {
    console.log(err);
  });
const app = express();

app.use(cookieParser());
app.use(express.json());

//남용환
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/carts', cartRouter);
app.use('/genre', genreRouter);
app.use('/orders', orderRouter);

app.listen(process.env.PORT || 8888, () => {
  console.log(`open Server port ${process.env.PORT || 8888}`);
});
