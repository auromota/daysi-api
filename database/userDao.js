var db = getmodule('database/connection');

var users = {
    signUp: function(req, res, next, callback) {
        db.get(req, res, next, function(connection) {
            connection.query('INSERT INTO users SET ?', req.body, function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    signIn: function(req, res, next, callback) {
        db.get(req, res, next, function(connection) {
            connection.query('SELECT * FROM users WHERE username = ?', [req.body.username], function(err, rows) {
                connection.release();
                callback(err, rows);
            })
        });
    },
    getAll: function(req, res, next, callback) {
        db.get(req, res, next, function(connection) {
            connection.query('SELECT * FROM users', function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    getUser: function(req, res, next, callback) {
        db.get(req, res, next, function(connection) {
            connection.query('SELECT * FROM users WHERE user_id = ?', [req.params.userId], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    }
}

module.exports = users;
