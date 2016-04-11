var db = getmodule('database/connection');

var userDao = {
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
    },
    updateUser: function(user, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query(userDao.getUpdateQueryString(user), function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        })
    },
    getUpdateQueryString: function(user) {
        var query = 'UPDATE `users` SET ';
        if(user.email) query += '`email` = \'' + user.email + '\', ';
        if(user.password) query += '`password` = \'' + user.password + '\', ';
        if(user.name) query += '`name` = \'' + user.name + '\', ';
        if(user.gender) query += '`gender` = ' + user.gender + ', ';
        if(user.photo) query += '`photo` = \'' + user.photo + '\', ';
        if(user.username) query += '`username` = \'' + user.username + '\', ';
        if(user.photo_privacy) query += '`photo_privacy` = ' + user.photo_privacy + ', ';
        if(user.email_privacy) query += '`email_privacy` = ' + user.email_privacy + ', ';
        if(user.name_privacy) query += '`name_privacy` = ' + user.name_privacy + ', ';
        if(query.charAt(query.length-2) == ',') {
            query = query.substr(0, query.length-2);
        }
        query += ' WHERE `user_id` = ' + user.user_id;
        return query;
    }
}

module.exports = userDao;
