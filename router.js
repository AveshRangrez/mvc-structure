const express = require('express');
const RootRouter = express.Router();
// const pkg = require('./package.json');   
const userRouter = require('./routes/user.router');
const registerRouter = require('./routes/register.router');
const loginRouter = require('./routes/login.router');
const authRouter = require('./routes/auth.router');
const emailRouter = require('./routes/email.router');

RootRouter.use(("/"), userRouter);
RootRouter.use(("/"), registerRouter);
RootRouter.use(("/"), loginRouter);
RootRouter.use(("/"), authRouter);
RootRouter.use(('/'), emailRouter);


module.exports = RootRouter;