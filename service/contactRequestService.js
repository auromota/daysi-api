var express = require('express');
var contactRequestDao = getmodule('database/contactRequestDao');
var contactUtil = getmodule('util/contactUtil');

var contactRequestService = {
    contactRequest: function(req, res, next) {
        var request = {
            user_id : req.user.user_id,
            requested_user_id : req.body.requested_user_id,
            date : new Date()
        }
        contactUtil.canRequest(req.user.user_id, req.body.requested_user_id, function(err, canRequest) {
            if(err) res.status(500).json(err);
            else {
                if(canRequest) {
                    contactRequestDao.addRequest(request, function(err, rows) {
                        if(err) res.status(500).json(err);
                        else res.status(200).json(rows);
                    });
                } else {
                    res.status(400).json({message: 'There is already an existing request or you are already contacts.'});
                }
            }
        });
    },
    acceptRequest: function(req, res, next) {
        var request = {
            user_id : req.body.user_id,
            requested_user_id : req.user.user_id
        };
        contactRequestDao.deleteRequest(request, function(err, rows) {
            if(err) res.status(500).json(err);
            else {
                contactUtil.addContacts(req.body.user_id, req.user.user_id, function(err, rows) {
                    if(err) res.status(500).json(err);
                    else res.status(200).json(rows);
                });
            }
        });
    }
};

module.exports = contactRequestService;
