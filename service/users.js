var express = require('express');
var users = express.Router();
var dao = getmodule('./database/users');

users.get('/users', function(req, res) {
    db.get(function(err, connection) {
        if(err) res.end();
        connection.query('SELECT * from users', function(err, rows) {
            connection.release();
            if(err) res.end();
            res.status(200).json(rows);
        });
    });
});

module.exports = users;
