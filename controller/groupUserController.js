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
            var schema = getmodule('schema/addUserToGroup');
            if (schema) {
                schema.validate(req.body);
            }
            service.addUserToGroup(req, res, next);
        } catch(err) {
            res.status(400).json(err+'');
        }
    }
};

module.exports = groupUserController;
