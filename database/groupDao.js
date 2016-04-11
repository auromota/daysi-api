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
            var query = 'SELECT u.user_id, u.email, u.password, u.name as creator, u.gender, u.push_id, ' +
                        'u.platform, u.photo, u.username, u.photo_privacy, u.name_privacy, u.email_privacy, ' +
                        'g.group_id, g.name, g.description, g.creation_date ' +
                        'FROM groups g JOIN users u ON u.user_id = g.group_creator WHERE g.privacy = 0';
            connection.query(query, function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    findGroup: function(group_id, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            var query = 'SELECT u.user_id, u.email, u.password, u.name as creator, u.gender, u.push_id, ' +
                        'u.platform, u.photo, u.username, u.photo_privacy, u.name_privacy, u.email_privacy, ' +
                        'g.group_id, g.name, g.description, g.creation_date ' +
                        'FROM groups g JOIN users u ON u.user_id = g.group_creator ' +
                        'WHERE g.group_id = ?';
            connection.query(query, [group_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    updateGroup: function(group, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            var group_id = group.group_id;
            delete group.group_id;
            connection.query('UPDATE groups SET ? WHERE group_id = ?', [group, group_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    }
}

module.exports = groupDao;
