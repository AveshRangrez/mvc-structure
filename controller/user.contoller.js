const express = require('express');
const userController = express.Router();
const app = express();
const { get, search } = require('../services/userservice');
const { checklogin } = require('../middleware/auth.middleware');


app.set('views', (__dirname, 'views'));
app.set("view engine", "ejs");

userController.use(express.urlencoded({ extended: false }));

userController.use('/Images', express.static('Images'))

userController.get('/', async (req, res, next) => {
    const _userdata = await get();
    res.render('index.ejs', { data: _userdata });
    res: _userdata

});

// userController.get('/userlogin', function (req, res, next) {
//     var token = jwt.sign({ foo: 'bar'}, 'loginToken');
//     localStorage.setItem('myToken', token)
//     res.send("login Successfully")
// });


// userController.get('/userlogout', function (req, res, next) {
//     localStorage.removeItem('myToken')
//     res.send("logout Successfully")
// });


userController.get('/search', checklogin, async (req, res, next) => {
    const userdata = await get();
    res.render('search.ejs', { name: userdata})
    res: userdata
})

userController.post('/search', checklogin, async (req, res, next) => {
    console.log(req.body)
    const _searchdata = await search(req.body);
    res.render('search.ejs', { name : _searchdata })
})


module.exports = userController;



// userController.get('/:id', async (req, res) => {
//     const _userById = await getById(req.params.id);
//     res.status(200).send({
//         res: _userById
//     })
// })