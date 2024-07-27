const register = require('../models/register.model');


const get = async() => {
    return await register.query();
}
const getEmail = async(email) => {
    console.log(email)
    return await register.query().where("email", email);
}
// const getPassword = async(password) => {
//     console.log(password)
//     return await register.query().where("password",password)
// }
const save = async (userdata) => {
    return await register.query().insertGraphAndFetch(userdata);
}
module.exports = { 
    get,
    save,
    getEmail
}