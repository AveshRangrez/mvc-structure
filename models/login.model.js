const Model = require('../config/dbconnection');

class login extends Model {
    static get tableName() {
        return "nodeform";
    }
    static get idColumn() {
        return 'id';
      }
} 
module.exports = login;