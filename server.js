require('getmodule');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = getmodule('router');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.listen(8080);
