const express = require('express');
const registerRouter = express.Router();
const registerController = require('../controller/register.controller');

registerRouter.use('/', registerController);

module.exports = registerRouter;