require('getmodule');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var users = getmodule('service/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(users);

app.listen(process.env.PORT || 8080);
