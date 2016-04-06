var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var db = getmodule('database/connection');

var users = {
    getAll: function(req, res, next) {
        db.get(function(err, connection) {
            if(err) res.end();
            else {
                connection.query('SELECT * FROM users', function(err, rows) {
                    connection.release();
                    if(err) res.status(500).json(err);
                    else res.status(200).json(rows);
                });
            }
        });
    },
    signup: function(req, res, next) {
        db.get(function(err, connection) {
            if(err) res.end();
            else {
                req.body.password = bcrypt.hashSync(req.body.password);
                connection.query('INSERT INTO users SET ?', req.body, function(err, rows) {
                    connection.release();
                    if(err) res.status(500).json(err);
                    else res.status(200).json(rows);
                });
            }
        })
    }
};

module.exports = users;
