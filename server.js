require('getmodule');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var users = getmodule('service/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(users);

app.listen(8080);
