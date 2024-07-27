const express = require('express');
const authRouter = express.Router();
const authController = require('../controller/auth.Contoller');

authRouter.use('/', authController);

module.exports = authController;