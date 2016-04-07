var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var db = getmodule('database/connection');
var config = getmodule('config');
var dao = getmodule('database/userDao');

var users = {
    signUp: function(req, res, next) {
        req.body.sign_date = new Date();
        req.body.password = bcrypt.hashSync(req.body.password);
        dao.signUp(req, res, next, function(err, rows) {
            if(err) res.status(500).json(err);
            else res.status(200).json(rows);
        });
    },
    signIn: function(req, res, next) {
        dao.signIn(req, res, next, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                if(rows && bcrypt.compareSync(req.body.password, rows[0].password)) {
                    var user = rows[0];
                    var token = jwt.sign(req.body, config.jwt_secret, {
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
    },
    getAll: function(req, res, next) {
        dao.getAll(req, res, next, function(err, rows) {
            if(err) res.status(500).json(err);
            else res.status(200).json(rows);
        });
    },
    getUser: function(req, res, next) {
        dao.getUser(req, res, next, function(err, rows) {
            if(err) res.status(500).json(err);
            else res.status(200).json(rows[0]);
        });
    }
};

module.exports = users;
