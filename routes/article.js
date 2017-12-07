var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/mysqlConnect.js');
router.get('/list', function(req, res, next) {

    pool.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            conn.query('select * from t_article',[],function(err,result){
                //释放连接
                conn.release();
                //事件驱动回调
                res.json({list:result});
            });
        }
    });

});

router.get('/targetArticle/:id',function(req,res,next){
    var id = req.params.id;
    pool.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            conn.query('select * from t_article where id = '+id, [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    conn.release();
                    res.json({list:result});
                }
            });
        }
    });
});

router.post('/add',function(req,res,next){
    var data = req.body;
    var date = new Date();
    date.setHours(date.getHours() + 8);
    var sql = "INSERT INTO t_article SET id=?,title=?,author=?,mdValue=?,htmlValue=?,keyword=?,create_time=?",
        values = [ ,data.title,data.author,data.mdValue,data.htmlValue,data.keyWord,date];
    pool.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            conn.query(sql,values,function(err,result){
                if (err) {
                    return next(err);
                } else {
                    conn.release();
                    res.json({c:100,insertId:result.insertId});
                }
            });
        }
    });
});
module.exports = router;
