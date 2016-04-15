var express = require('express');
var contactRequestDao = getmodule('database/contactRequestDao');

var contactRequestService = {
    contactRequest: function(req, res, next) {
        var request = {
            userId : req.user.id,
            requestedUserId : req.body.userId,
            date : new Date().getTime()
        }
        contactRequestDao.getRelationships(request.userId, request.requestedUserId, function(err, relationship) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(!relationship.length) {
                    contactRequestDao.addRequest(request, function(err, relationship) {
                        if(err) res.status(err.statusCode).json(err);
                        else res.status(200).json(relationship);
                    });
                } else {
                    res.status(400).json({status: false, message: 'There is already an existing request or you are already contacts.'});
                }
            }
        });
    },
    acceptRequest: function(req, res, next) {
        var request = {
            userId : req.body.userId,
            requestedUserId : req.user.id,
            type: req.body.accept
        };
        contactRequestDao.getRelationships(request.userId, request.requestedUserId, function(err, relationships) {
            if(err) res.status(err.statusCode).json(err);
            else {
                if(relationships.length) {
                    var isContact = false;
                    var canAccept = false;
                    var requestedContactRel;
                    relationships.forEach(function(rel) {
                        if(rel.type == 'IS_CONTACT') isContact = true;
                        else if(rel.type == 'REQUESTED_CONTACT' && rel.start == request.userId) {
                            canAccept = true;
                            requestedContactRel = rel.id;
                        }
                    });
                    if(!isContact && canAccept) {
                        if(request.type) {
                            contactRequestDao.acceptRequest(request, function(err, response) {
                                if(err) res.status(err.statusCode).json(err);
                                else res.status(200).json(response);
                            });
                        } else {
                            contactRequestDao.denyRequest(requestedContactRel, function(err, response) {
                                if(err) res.status(err.statusCode).json(err);
                                else res.status(200).json(response);
                            });
                        }
                    } else {
                        if(isContact) res.status(400).json({status: false, message: 'You are already contacts.'});
                        else res.status(400).json({status: false, message: 'You can not accept or deny a request you have sent.'});
                    }
                } else {
                    res.status(400).json({status: false, message: 'There is no request from this user.'})
                }
            }
        });
    }
};

module.exports = contactRequestService;
