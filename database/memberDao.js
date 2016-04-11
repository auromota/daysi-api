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
    }
}

module.exports = memberDao;
