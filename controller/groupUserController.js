var service = getmodule('service/groupUserService');

var groupUserController = {
    requestGroup: function (req, res, next) {
        try {
            var schema = getmodule('schema/requestGroup');
            if (schema) {
                schema.validate(req.body);
            }
            service.requestGroup(req, res, next);
        } catch(err) {
            res.status(400).json(err+'');
        }
    },
    addUserToGroup: function(req, res, next) {
        try {
            var schema = getmodule('schema/userGroup');
            if (schema) {
                schema.validate(req.body);
            }
            if(req.body.username == req.user.username) {
                res.status(400).json('You can not add yourself to a group.');
            } else {
                service.addUserToGroup(req, res, next);
            }
        } catch(err) {
            res.status(400).json(err+'');
        }
    },
    removeUserFromGroup: function(req, res, next) {
        try {
            var schema = getmodule('schema/userGroup');
            if (schema) {
                schema.validate(req.body);
            }
            if(req.body.username == req.user.username) {
                res.status(400).json('You can not remove yourself from a group.');
            } else {
                service.removeUserFromGroup(req, res, next);
            }
        } catch(err) {
            res.status(400).json(err+'');
        }
    }
};

module.exports = groupUserController;
