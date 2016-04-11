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
        contactRequestDao.addRequest(request, function(err, rows) {
            // TODO: after user 10 adds user 8, user 8 can't add user 10
            if(err) res.status(500).json(err);
            else res.status(200).json(rows);
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
