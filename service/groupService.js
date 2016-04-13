var express = require('express');
var config = getmodule('config');
var groupDao = getmodule('database/groupDao');

var groupService = {
    addGroup: function(req, res, next) {
        var group = req.body;
        var user = req.user;
        group.creationDate = new Date().getTime();
        groupDao.addGroup(group, user, function(err, response) {
            if(err) res.status(err.statusCode).json(err);
            else res.status(200).json(response);
        });
    },
    findAll: function(req, res, next) {
        groupDao.findAll(req.user.username, function(err, groups) {
            if(err) res.status(err.statusCode).json(err);
            else res.status(200).json(groups);
        });
    },
    findGroup: function(req, res, next) {
        var groupId = req.params.groupId;
        groupDao.findGroup(groupId, function(err, response) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(response) {
                    if(response.group.privacy) {
                        var isMember = false;
                        response.members.forEach(function(rel) {
                            if(rel.start == req.user.id) isMember = true;
                        })
                        if(isMember) {
                            res.status(200).json(response.group);
                        } else {
                            res.status(403).json({status: false, message: 'Group is private.'})
                        }
                    } else {
                        res.status(200).json(response.group);
                    }
                } else {
                    res.status(400).json({status: false, message: 'Invalid group ID.'})
                }
            }
        });
    },
    updateGroup: function(req, res, next) {
        var group = req.body;
        groupDao.findGroup(group.groupId, function(err, response) {
            if(err) res.status(res.statusCode).json(err);
            else {
                if(response) {
                    var isAdmin = false;
                    response.members.forEach(function(rel) {
                        if(rel.start == req.user.id && rel.properties.isAdmin) isAdmin = true;
                    });
                    if(isAdmin) {
                        var oldGroup = response.group;
                        var array = Object.keys(oldGroup);
                        array.forEach(function(key) {
                            if(group[key] == undefined) group[key] = oldGroup[key];
                        });
                        delete group.groupId;
                        groupDao.updateGroup(group, function(err, result) {
                            if(err) res.status(err.statusCode).json(err);
                            else res.status(200).json(result);
                        })
                    } else {
                        res.status(403).json({status: false, message: 'Only administrators can edit groups.'});
                    }
                } else {
                    res.status(400).json({status: false, message: 'Invalid group ID.'})
                }
            }
        });
    }
};

module.exports = groupService;
