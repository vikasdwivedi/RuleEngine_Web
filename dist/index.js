'use strict';

var express = require('express');
var path = require('path');
var RuleEngine = require('./engine');
var getPolicySet = require('./getPolicySet');

var app = express();

app.get('/', function (request, response) {
    console.log(request.url);
    response.sendFile(path.join(__dirname, '../index.html'));
});

app.use('/css', express.static(path.join(__dirname, './css')));
app.use('/js', express.static(path.join(__dirname, './js')));
app.use('/vendor', express.static(path.join(__dirname, './vendor')));
app.use('/fonts', express.static(path.join(__dirname, './fonts')));

app.listen(3000, function () {
    return console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map