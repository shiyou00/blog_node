var mysql = require('mysql');
var pool = mysql.createPool({
    host     : '47.93.50.196',
    user     : 'root',
    password : 'root',
    database : 'article',
    debug:true
});
module.exports = pool;