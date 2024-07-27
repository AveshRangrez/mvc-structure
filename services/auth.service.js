// const register = require('../models/register.model');



// const login = async (data) => {
//     // console.log(data);
//     // const  { email }  = data
//     // return await register.query().where('email', email).first();
//     return await register.query().where('email', data.email).andWhere('password2', data.password).first();
// }

// module.exports = { login }