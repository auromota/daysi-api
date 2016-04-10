var db = getmodule('database/connection');

var groupDao = {
    addGroup: function(group, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('INSERT INTO groups SET ?', group, function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    findAll: function(callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT * FROM groups WHERE privacy = 0', function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    findGroup: function(group_id, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT * FROM groups WHERE group_id = ?', [group_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    }
}

module.exports = groupDao;
