//for testing modules and bit's of code before using them
const sqlHelper = require('./db/sql-helper');
const compareDates = require('compare-dates');

let c = sqlHelper.createConditionals('code', [110, 300]);
let g = sqlHelper.createConditionals('grid', [0, 1, 2]);

let conditionals = [];
conditionals.push(c);
conditionals.push(g);

//console.log(sqlHelper.linkTogether(conditionals));

//testing out the date npm package
let d1 = new Date('2015-09-09');
let d2 = new Date('2015-09-08');

console.log(compareDates.isAfter(d1, d2));