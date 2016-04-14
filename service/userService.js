var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var dao = getmodule('database/userDao');

var users = {
    signUp: function(req, res, next) {
        var user = req.body;
        user.signDate = new Date().getTime();
        user.password = bcrypt.hashSync(user.password);
        dao.saveUser(user, function(err, user) {
            if(err) res.status(err.statusCode).json(err);
            else {
                delete user.password;
                res.status(200).json(user);
            }
        });
    },
    signIn: function(req, res, next) {
        var credentials = req.body;
        dao.findByUsername(credentials.username, function(err, response) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(response && response.length) {
                    if(bcrypt.compareSync(credentials.password, response[0].password)) {
                        var user = response[0];
                        delete user.password;
                        delete user.photo;
                        var token = jwt.sign(user, process.env.JWT_PASS, {
                            expiresIn: 86400
                        });
                        res.status(200).json({
                            status: true,
                            data: user,
                            token: token
                        });
                    } else {
                        res.status(403).json({
                            status: false,
                            message: 'Password is wrong.'
                        });
                    }
                } else {
                    res.status(400).json({
                        status: false,
                        message: 'Username not found'
                    })
                }
            }
        });
    },
    findAll: function(req, res, next) {
        dao.findAll(function(err, nodes) {
            if(err) res.status(err.statusCode).json(err);
            else {
                nodes.forEach(function(user) {
                    if(req.user.id != user.id) {
                        if(user.namePrivacy) delete user.name;
                        if(user.emailPrivacy) delete user.email;
                        if(user.photoPrivacy) delete user.photo;
                    }
                    delete user.password;
                });
                res.status(200).json(nodes);
            }
        });
    },
    findUser: function(req, res, next) {
        var username = req.params.username;
        dao.findByUsername(username, function(err, response) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(response && response.length) {
                    var user = response[0];
                    if(req.user.id != user.id) {
                        if(user.namePrivacy) delete user.name;
                        if(user.emailPrivacy) delete user.email;
                        if(user.photoPrivacy) delete user.photo;
                    }
                    delete user.password;
                    res.status(200).json(user);
                } else {
                    res.status(200).json();
                }
            }
        });
    },
    updateUser: function(req, res, next) {
        var user = req.body;
        var userWhoSent = req.user;
        dao.findByUsername(userWhoSent.username, function(err, response) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(response && response.length) {
                    var oldUser = response[0];
                    user.id = oldUser.id;
                    var array = Object.keys(oldUser);
                    if(user.password) {
                        if(user.oldPassword) {
                            if(bcrypt.compareSync(user.oldPassword, oldUser.password)) {
                                user.password = bcrypt.hashSync(user.password);
                                delete user.oldPassword;
                                array.forEach(function(key) {
                                    if(user[key] == undefined) user[key] = oldUser[key];
                                });
                                dao.updateUser(user, function(err, response) {
                                    if(err) res.status(err.statusCode).json(err);
                                    else res.status(200).json(response);
                                })
                            } else {
                                res.status(403).json({status: false, message: 'Invalid password.'});
                            }
                        } else {
                            res.status(500).json({status: false, message: 'Old password is required.'});
                        }
                    } else {
                        array.forEach(function(key) {
                            if(!user[key]) user[key] = oldUser[key];
                        });
                        dao.updateUser(user, function(err, response) {
                            if(err) res.status(err.statusCode).json(err);
                            else res.status(200).json(response);
                        });
                    }
                } else {
                    res.status(400).json({status: false, message: 'Username not found.'});
                }
            }
        });
    }
};

module.exports = users;
