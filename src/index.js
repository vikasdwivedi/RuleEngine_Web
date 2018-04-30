const express = require('express');
const path = require('path');
const RuleEngine = require('./engine');
const PolicySet = require('./PolicySet');


const app = express();

/*Response ---as it needs handler, coz of hoisting put it up there*/
var sendResponse = function (request, response) {
    response.sendFile(path.join(__dirname, '../index.html'));
    console.log(RuleEngine.RunEngine(PolicySet.PolicySet(), PolicySet.PolicySet().policy.ruleset));
}

app.get('/', sendResponse);

/*MAKE ME LOOK GOOD*/
app.use('/css', express.static(path.join(__dirname, './css')));
app.use('/js', express.static(path.join(__dirname, './js')));
app.use('/vendor', express.static(path.join(__dirname, './vendor')));
app.use('/fonts', express.static(path.join(__dirname, './fonts')));

/*BOOT IT UP !!! */
app.listen(3000, () => console.log('Example app listening on port 3000!'))