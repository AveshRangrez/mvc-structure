const Model = require('../config/dbconnection');

class register extends Model {
    static get tableName() {
        return "nodeform";
    }
    static get idColumn() {
        return 'id';
      }
}
module.exports = register;