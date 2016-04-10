var express = require('express');
var sync = require('synchronize');
var config = getmodule('config');
var groupDao = getmodule('database/groupDao');
var userDao = getmodule('database/userDao');

var groupService = {
    addGroup: function(req, res, next) {
        var group = req.body;
        var user = req.user;
        group.group_creator = user.user_id;
        group.creation_date = new Date();
        groupDao.addGroup(group, function(err, rows) {
            if(err) res.status(500).json(err);
            else res.status(200).json(rows);
        });
    },
    findAll: function(req, res, next) {
        groupDao.findAll(function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                try {
                    sync.fiber(function() {
                        rows.forEach(function(group) {
                            group.group_creator = groupService.findGroupOwner(group.group_creator);
                        })
                        res.status(200).json(rows);
                    });
                } catch (err) {
                    res.status(500).json(rows);
                }
            }
        });
    },
    findGroup: function(req, res, next) {
        var group_id = req.params.group_id;
        groupDao.findGroup(group_id, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                var group = rows[0];
                try {
                    sync.fiber(function() {
                        group.group_creator = groupService.findGroupOwner(group.group_creator);
                        res.status(200).json(group);
                    })
                } catch (err) {
                    res.status(500).json(rows);
                }
            }
        });
    },
    findGroupOwner: function(group_creator, callback) {
        userDao.findUser(group_creator, function(err, rows) {
            if(err) callback(err);
            else {
                callback(null, rows[0]);
            }
        })
    }
};

sync(groupService, 'findGroupOwner');

module.exports = groupService;
