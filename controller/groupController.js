var service = getmodule('service/groupService');

var groupController = {
    addGroup: function (req, res, next) {
        try {
            var schema = getmodule('schema/group');
            if (schema) {
                schema.validate(req.body);
            }
            service.addGroup(req, res, next);
        } catch(err) {
            res.status(400).json(err+'');
        }
    },
    findAll: function(req, res, next) {
        try {
            var schema = getmodule('schema/query/findGroups');
            if (schema) {
                schema.validate(req.query);
            }
            service.findAll(req, res, next);
        } catch(err) {
            res.status(400).json(err+'');
        }
    },
    findGroup: function(req, res, next) {
        service.findGroup(req, res, next);
    },
    updateGroup: function(req, res, next) {
        try {
            var schema = getmodule('schema/editGroup');
            if(schema) {
                schema.validate(req.body);
            }
            service.updateGroup(req, res, next);
        } catch(err) {
            res.status(400).json(err+'');
        }
    }
};

module.exports = groupController;
