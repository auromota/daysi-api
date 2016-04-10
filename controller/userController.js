var service = getmodule('service/userService');

var userController = {
    addUser: function (req, res, next) {
        try {
            var schema = getmodule('schemas/signup');
            if (schema) {
                schema.validate(req.body);
            }
            service.signUp(req, res, next);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    signIn: function (req, res, next) {
        try {
            var schema = getmodule('schemas/signin');
            if (schema) {
                schema.validate(req.body);
            }
            service.signIn(req, res, next);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    findAll: function(req, res, next) {
        service.findAll(req, res, next);
    },
    findUser: function(req, res, next) {
        service.findUser(req, res, next);
    }
};

module.exports = userController;
