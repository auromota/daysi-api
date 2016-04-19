var express = require('express');
var groupUserDao = getmodule('database/groupUserDao');
var groupDao = getmodule('database/groupDao');

var groupUserService = {
    requestGroup: function(req, res, next) {
        groupUserDao.findMemberRelationship(req.user.username, req.body.groupId, function(err, relationship) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(relationship && relationship.length) {
                    res.status(400).json({status: false, message: 'You are already member of this group.'});
                } else {
                    var request = {
                        username: req.user.username,
                        groupId: req.body.groupId,
                        date: new Date().getTime()
                    }
                    groupUserDao.requestGroup(request, function(err, response) {
                        if(err) res.status(err.statusCode).json(err);
                        else res.status(200).json(response[0]);
                    });
                }
            }
        });
    }
};

module.exports = groupUserService;
