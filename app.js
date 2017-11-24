var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOptions = {
        host: 'localhost',
        user: 'root',//root用户
        password: '123456',//密码
        port: 3306,//端口
        database: 'article'//数据库
    };
//引入路由文件
var index = require('./routes/article');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//mysql连接
app.use(myConnection(mysql, dbOptions, 'single')); //作为中间件来使用
//静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
//使用路由
app.use('/article', index);

// 捕捉404错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
