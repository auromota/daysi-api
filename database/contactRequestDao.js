var db = getmodule('database/connection');

var contactRequestDao = {
    addRequest: function(request, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('INSERT INTO contact_requests SET ?', request, function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    deleteRequest: function(request, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('DELETE FROM contact_requests WHERE user_id = ? AND requested_user_id = ?', [request.user_id, request.requested_user_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    },
    selectRequests: function(user_id, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT * FROM contact_requests WHERE user_id = ? OR requested_user_id = ?', [user_id, user_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        })
    }
}

module.exports = contactRequestDao;
