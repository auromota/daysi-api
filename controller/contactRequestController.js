var service = getmodule('service/contactRequestService');

var contactRequestController = {
    contactRequest: function (req, res, next) {
        try {
            var schema = getmodule('schemas/contactRequest');
            if (schema) {
                schema.validate(req.body);
            }
            if (req.user.id == req.body.userId) {
                res.status(400).json({message: 'You can not make a contact request to yourself.'});
            } else {
                service.contactRequest(req, res, next);
            }
        } catch(err) {
            res.status(400).json(err+'');
        }
    },
    acceptRequest: function(req, res, next) {
        try {
            var schema = getmodule('schemas/contactRequest');
            if (schema) {
                schema.validate(req.body);
            }
            if (req.user.id == req.body.userId) {
                res.status(400).json({message: 'You can not accept a contact request from yourself.'});
            } else {
                service.acceptRequest(req, res, next);
            }
        } catch(err) {
            res.status(400).json(err+'');
        }
    }
};

module.exports = contactRequestController;
