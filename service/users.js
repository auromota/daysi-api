var express = require('express');
var users = express.Router();
var dao = getmodule('./database/users');

users.get('/users', function(req, res) {
    dao.findAll(res);
});

module.exports = users;
