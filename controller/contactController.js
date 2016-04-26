var service = getmodule('service/contactService');

var contactRequestController = {
    findContacts: function(req, res, next) {
        try {
            var schema = getmodule('schema/query/findContacts');
            if (schema) {
                schema.validate(req.query);
            }
            service.findContacts(req, res, next);
        } catch(err) {
            res.status(400).json(err+'');
        }
    },
    contactRequest: function (req, res, next) {
        try {
            var schema = getmodule('schema/contact');
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
            var schema = getmodule('schema/acceptRequest');
            if (schema) {
                schema.validate(req.body);
            }
            if (req.user.id == req.body.userId) {
                res.status(400).json({message: 'You can not accept or a deny a contact request from yourself.'});
            } else {
                service.acceptRequest(req, res, next);
            }
        } catch(err) {
            res.status(400).json(err+'');
        }
    },
    removeContact: function(req, res, next) {
        try {
            var schema = getmodule('schema/query/removeContact');
            if (schema) {
               schema.validate(req.query); 
            }
            if (req.user.id == req.query.userId) {
                res.status(400).json({message: 'You can not remove yourself.'});
            } else {
                service.removeContact(req, res, next);
            }
        } catch(err) {
            res.status(400).json(err+'');
        }
    }
};

module.exports = contactRequestController;
