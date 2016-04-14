var db = getmodule('database/connection');

var userDao = {
    saveUser : function(user, callback) {
        db.save(user, 'user', function(err, node) {
            callback(err, node);
        });
    },
    findByUsername : function(username, callback) {
        db.find({username: username}, 'user', function(err, results) {
            callback(err, results);
        });
    },
    findByUsernameOrEmail : function(credential, callback) {
        db.find({username: credential, email: credential}, true, 'user', function(err, results) {
            callback(err, results);
        });
    },
    findAll : function(callback) {
        db.nodesWithLabel('user', function(err, nodes) {
            callback(err, nodes);
        });
    },
    updateUser : function(user, callback) {
        db.save(user, function(err, node) {
            callback(err, node);
        });
    }
};

module.exports = userDao;
