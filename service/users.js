var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var db = getmodule('database/connection');

var users = {
    getAll: function(req, res, next) {
        db.get(function(err, connection) {
            if(err) res.status(500).json(err);
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
            if(err) res.status(500).json(err);
            else {
                req.body.password = bcrypt.hashSync(req.body.password);
                connection.query('INSERT INTO users SET ?', req.body, function(err, rows) {
                    connection.release();
                    if(err) res.status(500).json(err);
                    else res.status(200).json(rows);
                });
            }
        })
    },
    getUser: function(req, res, next) {
        db.get(function(err, connection) {
            if(err) res.status(500).json(err);
            else {
                connection.query('SELECT * FROM users WHERE user_id = ?', [req.params.userId], function(err, rows) {
                    connection.release();
                    if(err) res.status(500).json(err);
                    else res.status(200).json(rows[0]);
                });
            }
        })
    }
};

module.exports = users;
