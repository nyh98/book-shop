const express = require('express');
const TokenValidator = require('../validators/TokenValidator');
const CartController = require('../controller/CartController');
const CartValidator = require('../validators/CartValidator');
const CartError = require('../error/CartError');

const cartRouter = express.Router();
//남용환
cartRouter.use(TokenValidator.verify);

cartRouter.post('/', CartValidator.checkValue, CartController.add);

cartRouter.get('/', CartController.viewCart);

cartRouter.delete('/', CartController.deletedItem);

cartRouter.get('/order-sheet', CartController.getCheckedItems);

cartRouter.use(CartError.err);

module.exports = cartRouter;
