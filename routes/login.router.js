const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controller/login.controller');


loginRouter.use("/" ,loginController);

module.exports = loginController;