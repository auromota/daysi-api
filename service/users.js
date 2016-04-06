var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var db = getmodule('database/connection');
var config = getmodule('config');

var users = {
    signUp: function(req, res, next) {
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
    signIn: function(req, res, next) {
        db.get(function(err, connection) {
            if(err) res.status(500).json(err);
            else {
                connection.query('SELECT * FROM users WHERE username = ?', [req.body.username], function(err, rows) {
                    if(err) {
                        connection.release();
                        res.status(500).json(err);
                    } else {
                        if(rows && bcrypt.compareSync(req.body.password, rows[0].password)) {
                            var user = rows[0];
                            var token = jwt.sign(user, config.jwt_secret, {
                                expiresIn: 86400
                            });
                            delete user.password;
                            res.status(200).json({
                                type: true,
                                data: user,
                                token: token
                            });
                        } else {
                            res.status(403).json({
                                type: false
                            });
                        }
                    }
                });
            }
        });
    },
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
