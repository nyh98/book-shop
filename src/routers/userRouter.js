const express = require('express');
const userValidator = require('../validators/userValidator');
const UserController = require('../controller/userController');
const UserError = require('../error/userError');

const userRouter = express.Router();

//남용환
userRouter.post('/join', userValidator.join, UserController.join, UserError.join);

userRouter.post('/login', userValidator.emailAndPwd, UserController.login, UserError.login);

userRouter.put('/pwd', userValidator.emailAndPwd, UserController.resetPwd);

userRouter.use(UserError.err);

module.exports = userRouter;
