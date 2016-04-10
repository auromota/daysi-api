var db = getmodule('database/connection');

var users = {
    addUser: function(user, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('INSERT INTO users SET ?', user, function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    findUserByUsername: function(username, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT * FROM users WHERE username = ?', [username], function(err, rows) {
                connection.release();
                callback(err, rows);
            })
        });
    },
    findAll: function(callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT * FROM users', function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    findUser: function(user_id, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    }
}

module.exports = users;
