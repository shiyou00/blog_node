var express = require('express');
var app = express();
var port = 8086;
app.use(express.static('public'));
app.listen(port);
console.log('监听'+port+'端口');