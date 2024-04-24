const express = require('express');
const BookValidator = require('../validators/BookValidator');
const BookController = require('../controller/BookController');
const BookError = require('../error/BookError');
const TokenValidator = require('../validators/TokenValidator');

const bookRouter = express.Router();
//남용환
bookRouter.get('/', BookValidator.checkvalue, BookController.getBooks, BookError.getErr);

bookRouter.post('/like/:id', TokenValidator.verify, BookController.updateLike, BookError.likeErr);

bookRouter.delete('/like/:id', TokenValidator.verify, BookController.deleteLike, BookError.likeErr);

module.exports = bookRouter;
