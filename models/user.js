const Model = require('../config/dbconnection');

class User extends Model {
    static get tableName() {
        return "nodeform";
    }
    static get idColumn() {
        return 'id';
      }
} 

module.exports = User;