var express = require('express');
var groupDao = getmodule('database/groupDao');
var intFormat = require('biguint-format');
var flakeIdgen = require('flake-idgen');
var flakeGen = new flakeIdgen();

var groupService = {
    addGroup: function(req, res, next) {
        var group = req.body;
        var user = req.user;
        group.creationDate = new Date().getTime();
        group.groupId = intFormat(flakeGen.next(), 'dec');
        groupDao.addGroup(group, user, function(err, response) {
            if(err) res.status(err.statusCode).json(err);
            else res.status(200).json(response);
        });
    },
    findAll: function(req, res, next) {
        var query = {
            query: req.query.query,
            skip: parseInt(req.query.page)*parseInt(req.query.size),
            limit: parseInt(req.query.size)
        };
        groupDao.find(query, function(err, groups) {
            if(err) res.status(err.statusCode).json(err);
            else res.status(200).json(groups);
        });
    },
    findGroup: function(req, res, next) {
        var groupId = req.params.groupId;
        groupDao.findGroup(groupId, function(err, results) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(results && results.length) {
                    var group = results[0];
                    groupDao.findMembersForGroup(5, 'IS_MEMBER', group, function(err, results) {
                        if(err) res.status(500).json(err);
                        else {
                            results.forEach(function(member) {
                                if(member.photoPrivacy) delete member.photo;
                                if(member.namePrivacy) delete member.name;
                            });
                            res.status(200).json({
                                group: group,
                                members: results
                            });
                        }
                    });
                } else {
                    res.status(200).json({status: false, message: 'Group ID not found.'});
                }
            }
        });
    },
    updateGroup: function(req, res, next) {
        var group = req.body;
        groupDao.findGroup(group.groupId, function(err, response) {
            if(err) res.status(err.statusCode).json(err);
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
                        groupDao.updateGroup(group, function(err, result) {
                            if(err) res.status(err.statusCode).json(err);
                            else res.status(200).json(result);
                        })
                    } else {
                        res.status(403).json({status: false, message: 'Only administrators can edit groups.'});
                    }
                } else {
                    res.status(400).json({status: false, message: 'Group can\'t be found.'})
                }
            }
        });
    }
};

module.exports = groupService;
