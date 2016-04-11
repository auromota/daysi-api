var db = getmodule('database/connection');

var memberDao = {
    insertMember: function(member, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('INSERT INTO members SET ?', member, function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    findGroupMembers: function(group_id, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT * FROM members m JOIN users u ON m.user_id = u.user_id WHERE m.group_id = ?', [group_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    isAdmin: function(user_id, group_id, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT is_admin FROM members WHERE user_id = ? AND group_id = ?', [user_id, group_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    }
}

module.exports = memberDao;
