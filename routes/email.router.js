const express = require('express');
const emailRouter = express.Router();
// const nodemail = require('../services/email.service');
const emailController = require('../controller/email.controller');



// emailRouter.post('/email',nodemail);
emailRouter.use('/', emailController)

// module.exports = nodemail;
module.exports = emailController;