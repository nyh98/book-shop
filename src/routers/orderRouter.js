const express = require('express');
const TokenValidator = require('../validators/TokenValidator');
const OrderError = require('../error/OrderError');
const OrderController = require('../controller/OrderController');
const OrderValidator = require('../validators/OrderValidator');

const orderRouter = express.Router();
//남용환
orderRouter.use(TokenValidator.verify);

orderRouter.post('/', OrderValidator.orderValueCheck, OrderController.createOrder);

orderRouter.get('/', OrderController.viewOrder);

orderRouter.use(OrderError.err);
module.exports = orderRouter;
