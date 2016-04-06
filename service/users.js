var express = require('express');
var db = getmodule('database/connection');

var users = {
    getAll: function(req, res, next) {
        db.get(function(err, connection) {
            if(err) res.end();
            else {
                connection.query('SELECT * FROM users', function(err, rows) {
                    connection.release();
                    if(err) res.end();
                    else res.status(200).json(rows);
                });
            }
        });
    },
    signup: function(req, res, next) {
        db.get(function(err, connection) {
            if(err) res.end();
            else {
                //connection.query(   'INSERT INTO users(email, password, name, gender, ' +
                                    'photo, username, photo_privacy, name_privacy) VALUES ()');
                //TODO
                res.end();
            }
        })
        res.status(200).json({name:'auro'});
    }
};

module.exports = users;
