const express = require('express');
const emailController = express.Router();
const  nodemail  = require('../services/email.service');
// const { checklogin } = require('../middleware/auth.middleware');


emailController.get('/email', async (req, res, next) => {
    res.render('email.ejs');
})


emailController.post('/email', nodemail);

module.exports = emailController;
