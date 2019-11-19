//for testing modules and bit's of code before using them
const sqlHelper = require('./db/sql-helper');

console.log(sqlHelper.createConditionals('code', [110]));
