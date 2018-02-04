var express = require('express');
var router = express.Router();


router.get('/vertical.html', function(req, res, next) {
    res.render('css/verticalAlign', { title: 'Express' });
});

module.exports = router;