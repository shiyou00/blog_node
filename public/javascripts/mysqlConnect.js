//mysql断线重连
/*************************************/
var mysql = require('mysql');
var connection;
function handleError (err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }else console.log('connected as id ' + connection.threadId);
}
// 连接数据库
function connect () {
    connection = mysql.createConnection({
        host     : '47.93.50.196',
        user     : 'root',
        password : 'root',
        database : 'article'
    });
    connection.connect(handleError);
    connection.on('error', handleError);
}
/*************************************/
connect();
module.exports=connection;