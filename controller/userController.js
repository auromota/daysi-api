var createSchema = require('json-gate').createSchema;
var service = getmodule('service/users');

var userController = {
    signup: function (req, res, next) {
        try {
            var schema = getmodule('schemas/signup');
            if (schema) {
                schema.validate(req.body);
            }
            service.signup(req, res, next);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    users: function(req, res, next) {
        service.getAll(req, res, next);
    }
};

module.exports = userController;
