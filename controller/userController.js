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
    getAll: function(req, res, next) {
        service.getAll(req, res, next);
    },
    getUser: function(req, res, next) {
        service.getUser(req, res, next);
    }
};

module.exports = userController;
