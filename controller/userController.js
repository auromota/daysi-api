var service = getmodule('service/userService');

var userController = {
    addUser: function (req, res, next) {
        try {
            var schema = getmodule('schemas/user');
            if (schema) {
                schema.validate(req.body);
            }
            service.signUp(req, res, next);
        } catch(err) {
            res.status(400).json(err+'');
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
            res.status(400).json(err+'');
        }
    },
    findAll: function(req, res, next) {
        service.findAll(req, res, next);
    },
    findUser: function(req, res, next) {
        service.findUser(req, res, next);
    },
    updateUser: function(req, res, next) {
        try {
            var schema = getmodule('schemas/editUser');
            if (schema) {
                schema.validate(req.body);
            }
            if(req.body.user_id != req.user.user_id) {
                res.status(403).json({message: "You can only edit your user."});
            } else {
                service.updateUser(req, res, next);
            }
        } catch(err) {
            res.status(400).json(err+'');
        }
    }
};

module.exports = userController;
