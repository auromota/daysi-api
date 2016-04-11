var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var config = getmodule('config');
var dao = getmodule('database/userDao');

var users = {
    signUp: function(req, res, next) {
        var user = req.body;
        user.sign_date = new Date();
        user.password = bcrypt.hashSync(user.password);
        dao.addUser(user, function(err, rows) {
            if(err) res.status(500).json(err);
            else res.status(200).json(rows);
        });
    },
    signIn: function(req, res, next) {
        var credentials = req.body;
        dao.findUserByUsername(credentials.username, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                if(rows && bcrypt.compareSync(credentials.password, rows[0].password)) {
                    var user = rows[0];
                    delete user.password;
                    var token = jwt.sign(user, config.jwt_secret, {
                        expiresIn: 86400
                    });
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
    findAll: function(req, res, next) {
        dao.findAll(function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                rows.forEach(function(user) {
                    if(req.user.user_id != user.user_id) {
                        if(user.name_privacy) delete user.name;
                        if(user.email_privacy) delete user.email;
                        if(user.photo_privacy) delete user.photo;
                    }
                });
                res.status(200).json(rows);
            }
        });
    },
    findUser: function(req, res, next) {
        var user_id = req.params.user_id;
        dao.findUser(user_id, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                var user = rows[0];
                if(user) {
                    if(req.user.user_id != req.params.user_id) {
                        if(user.name_privacy) delete user.name;
                        if(user.email_privacy) delete user.email;
                        if(user.photo_privacy) delete user.photo;
                    }
                    res.status(200).json(rows[0]);
                } else {
                    res.status(200).json();
                }
            }
        });
    },
    updateUser: function(req, res, next) {
        var user = req.body;
        dao.findUser(user.user_id, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                var oldUser = rows[0];
                if(user.password) {
                    if(user.oldPassword) {
                        if(bcrypt.compareSync(user.oldPassword, oldUser.password)) {
                            user.password = bcrypt.hashSync(user.password);
                            dao.updateUser(user, function(err, rows) {
                                if(err) res.status(500).json(err);
                                else res.status(200).json(rows);
                            })
                        } else {
                            res.status(403).json({message: 'Invalid password.'});
                        }
                    } else {
                        res.status(500).json({message: 'Old password is required.'});
                    }
                }
            }
        });
    }
};

module.exports = users;
