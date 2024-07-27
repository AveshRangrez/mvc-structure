const express = require('express');
const userRouter = express.Router();
const userController  = require('../controller/user.contoller');

userRouter.use('/', userController);

module.exports = userRouter;