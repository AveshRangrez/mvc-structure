const register = require('../models/register.model');




const get = async () => {
    return await register.query();
}

const getlogin = async (data) => {
    // console.log(data);
    // const  { email }  = data
    // return await register.query().where('email', email).first();
    return await register.query().where('email', data.email).andWhere('password2', data.password).first();
}
// const getPass = async (data) => {
//     // console.log(data);
//     const { password } = data
//     return await register.query().where('password2', password).first();
// }
const getById = async (data) => {
    const { id } = data
    return await register.query().where('id', id).first();
}
const put = async (data) => {
    console.log(data);
    return await register.query().upsertGraphAndFetch(data);
}
const remove = async (data) => {
    const { id } = data
    return await register.query().delete().where('id', id).first();
  };
  

module.exports = {
    get,
    getlogin,
    getById,
    put,
    remove
}