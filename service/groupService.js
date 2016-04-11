var express = require('express');
var config = getmodule('config');
var groupDao = getmodule('database/groupDao');
var userDao = getmodule('database/userDao');
var memberDao = getmodule('database/memberDao');

var groupService = {
    addGroup: function(req, res, next) {
        var group = req.body;
        var user = req.user;
        group.group_creator = user.user_id;
        group.creation_date = new Date();
        groupDao.addGroup(group, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                var member = {
                    user_id : user.user_id,
                    group_id : rows.insertId,
                    joining_date : new Date(),
                    is_admin : true,
                    was_admin : true
                };
                memberDao.insertMember(member, function(err, rows) {
                    if(err) res.status(500).json(err);
                    else res.status(200).json(rows);
                });
            }
        });
    },
    findAll: function(req, res, next) {
        groupDao.findAll(function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                var groups = [];
                rows.forEach(function(row, index) {
                    var user = {
                        user_id : row.user_id,
                        username : row.username,
                        gender : row.gender
                    };
                    if(!row.photo_privacy) user.photo = row.photo;
                    if(!row.email_privacy) user.email = row.email;
                    if(!row.name_privacy) user.name = row.creator;
                    var group = {
                        group_id : row.group_id,
                        name : row.name,
                        description : row.description,
                        creation_date : row.creation_date,
                        group_creator : user
                    }
                    groups[index] = group;
                });
                res.status(200).json(groups);
            }
        });
    },
    findGroup: function(req, res, next) {
        var group_id = req.params.group_id;
        groupDao.findGroup(group_id, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                var row = rows[0];
                var user = {
                    user_id : row.user_id,
                    username : row.username,
                    gender : row.gender
                };
                if(!row.photo_privacy) user.photo = row.photo;
                if(!row.email_privacy) user.email = row.email;
                if(!row.name_privacy) user.name = row.creator;
                memberDao.findGroupMembers(group_id, function(err, rows) {
                    if(err) res.status(500).json(err);
                    else {
                        var members = [], admins = [];
                        rows.forEach(function(member) {
                            delete member.password;
                            if(member.photo_privacy) delete member.photo;
                            if(member.email_privacy) delete member.email;
                            if(member.name_privacy) delete member.name;
                            delete member.photo_privacy;
                            delete member.email_privacy;
                            delete member.name_privacy;
                            delete member.push_id;
                            if(member.is_admin) admins.push(member);
                            else members.push(member);
                        });
                        res.status(200).json({
                            group_id : row.group_id,
                            name : row.name,
                            description : row.description,
                            creation_date : row.creation_date,
                            group_creator : user,
                            members: members,
                            admins: admins
                        });
                    }
                });
            }
        });
    },
    updateGroup: function(req, res, next) {
        var group = req.body;
        groupDao.findGroup(group.group_id, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                if(rows && rows.length) {
                    var oldGroup = rows[0];
                    memberDao.findGroupMembers(oldGroup.group_id, function(err, rows) {
                        if(err) res.status(500).json(err);
                        else {
                            var isAdmin = false;
                            rows.forEach(function(row) {
                                if(row.user_id && row.is_admin) {
                                    isAdmin = true;
                                }
                            });
                            if(isAdmin) {
                                groupDao.updateGroup(group, function(err, rows) {
                                    if(err) res.status(500).json(err);
                                    else res.status(200).json(rows);
                                });
                            } else {
                                res.status(403).json({message: "You can only edit groups of which you are administrator."});
                            }
                        }
                    })
                } else {
                    res.status(400).json({message: "Group ID not found."});
                }
            }
        });
    }
};

module.exports = groupService;
