const express = require('express');
const app = express();
const loginController = express.Router();
const session = require('express-session');
// const sessionStorage = require('sessionstorage-for-nodejs')
const flash = require('express-flash');
const { get, getlogin, getById, put, remove } = require('../services/login.service');
const { sign } = require('../utils/auth.utils');
const { checklogin } = require('../middleware/auth.middleware');



app.set("view engine", "ejs");
loginController.use(express.urlencoded({ extended: false }));

loginController.use(session({
    secret: "secret",

    resave: false,

    saveUninitialized: false
})
);

loginController.use(flash())


loginController.get('/login', async (req, res, next) => {
    res.render('login.ejs');
    // var token = jwt.sign({ foo: 'bar'}, 'loginToken');
    // localStorage.setItem('myToken', token)
    // console.log(token);
    console.log("Login Page open");
});

loginController.post('/login', async (req, res) => {
    const userLogin = await getlogin(req.body);
    console.log(userLogin)

    let errors = [];
    
    if (!userLogin) {
        errors.push({ message: "Please enter the correct details" });
        console.log("Please enter the correct details");
    }
    if (errors.length > 0) {
        res.render("login.ejs", { errors })
    }
    else {
        // var token = jwt.sign({ foo: 'bar' }, 'loginToken');
        const token = await sign(req.body);
        localStorage.setItem("myToken", token);
        res.redirect("/");
        console.log('Login Successfully');
    }
});

loginController.get('/update', checklogin, async (req, res, next) => {
    res.render('dataupdate.ejs')
});

loginController.post('/update', async (req, res, next) => {

    const updateid = await getById(req.body);

    let errors = [];

    if (!updateid) {
        errors.push({ message: "Please ente r the Valid ID" });
        console.log("Please enter the valid ID");
    }
    if (errors.length > 0) {
        res.render("dataupdate.ejs", { errors })
    }
    else {
        const putUserResponse = await put(req.body);
        res: putUserResponse
        console.log("Details successfully update");
        res.redirect("/")
    }
});

loginController.get('/delete', checklogin, async (req, res, next) => {
    res.render('delete.ejs')
});

loginController.post('/delete', async (req, res, next) => {

    const deletebyid = await getById(req.body);

    let errors = [];

    if (!deletebyid) {
        errors.push({ message: "Please enter the correct Id" });
        console.log("Please enter the correct Id");
    }

    if (errors.length > 0) {
        res.render("delete.ejs", { errors })
    }

    else {
        const deleteUserResponse = await remove(req.body);
        res: deleteUserResponse
        console.log("Data Successfully deleted");
        res.redirect("/");
    }

})

loginController.get('/dashboard', checklogin, async (req, res, next) => {
    res.render('dashboard.ejs')
})

module.exports = loginController;


// loginController.get('/:id', async (req, res, next) => {
//     const userId = await getById(req.body);
//     res.status(200).send({
//         res: userId
//     })
// })


// loginController.post('/userslogin', async (req, res) => {
//     console.log(req.body);
//     const _savedUser = await getlogin(req.body);
//     const token = await sign(req.body);
//     res.status(200).send({
//        res: _savedUser,
//         res: token,
//         status: 200,
//         message: 'login successfully'
//     })
// })