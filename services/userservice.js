const User = require('../models/user');

const get = async () => {
    return await User.query().orderBy('id','ASC');
};

const save = async (userbody) => {
    console.log(userbody);
    return await User.query().insertGraphAndFetch(userbody);
};
const getById = async (userid) => {
    return await User.query().where("id", userid).first();
};
const getByName = async (data) => {
    return await User.query().where('name', data).first();
}
const put = async (userbody) => {
    return await User.query().upsertGraphAndFetch(userbody);
};

const remove = async (userid) => {
    return await User.query().delete.where("userId", userid);
};
const search = async (data) => {
    console.log(data);
    return await User
        .knex()
        .table('usertable')
        .whereLike('name', `%${data.name}%`);
};
module.exports = {
    get,
    save,
    getById,
    getByName,
    put,
    remove,
    search
}
