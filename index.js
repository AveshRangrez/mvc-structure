require('dotenv').config();
const express = require('express');
const app = express();
const RootRouter = require('./router');
app.use(express.json());

app.use('/images', express.static('images'));


app.use(RootRouter)
app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Your Server is running on ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`);
});