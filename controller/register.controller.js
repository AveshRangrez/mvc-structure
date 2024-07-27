const express = require("express");
const app = express();
const registerController = express.Router();
const bcrypt = require("bcrypt");   
const session = require("express-session");
const flash = require('express-flash');
const { get, save, getEmail } = require('../services/register.service');



app.set("view engine", "ejs");
registerController.use(express.urlencoded({ extended: false }));

registerController.use(session({
    secret: "secret",

    resave: false,

    saveUninitialized: false
})
);

registerController.use(flash());


registerController.get('/register', async (req, res, next) => {
    res.render('register.ejs')
});


registerController.post('/register', async (req, res, next) => {
    let { name, email, password, password2 } = req.body;

    const emaildata = await getEmail(email);

    console.log(req.body);

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: "please enter all fields" });
    }
    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" })
        console.log("Password should be at least 6 characters");
    }
    if (password != password2) {
        errors.push({ message: "Password do not match" });
    }
    if (emaildata.length != 0) {
        errors.push({ message: "Email Already Registered" });
    }
    if (errors.length > 0) {
        res.render("register.ejs", { errors });
    }
    else {
        let hashedPassword = await bcrypt.hash(password, 10);
        req.body['password'] = hashedPassword
        // req.body['password2'] = hashedPassword
        const _savedUser = await save(req.body);
        res: _savedUser,
            req.flash("success_msg", "You are now Registered. please Log in");
        res.redirect("/login");

        // const _savedUser = await save(req.body);
        // res.status(200).send({
        //     res: _savedUser,               
        // });
        // req.flash("success_msg", "You are now Registered. please Log in");
        // res.redirect("/login")
        console.log("You are now Registered");
    }
});

module.exports = registerController;