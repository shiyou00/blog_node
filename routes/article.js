var express = require('express');
var router = express.Router();


//allow custom header and CORS
router.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
/**
 * 请求地址：http://localhost:3000/article/list
 */
router.get('/list', function(req, res, next) {
    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query('select id,title,author,content,keyWord,update_time,create_time from article', [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    console.log(result);
                    res.json({list:result});
                }
            });
        }
    });
});

router.get('/targetArticle/:id',function(req,res,next){
    var id = req.params.id;
    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query('select id,title,author,content,keyWord,update_time,create_time from article where id = '+id, [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    console.log(result);
                    res.json({list:result});
                }
            });
        }
    });
});

module.exports = router;
