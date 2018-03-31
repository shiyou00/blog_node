var express = require('express');
var router = express.Router();


router.get('/fish.html', function(req, res, next) {
    res.render('fish/index.html', { title: 'Express' });
});

module.exports = router;