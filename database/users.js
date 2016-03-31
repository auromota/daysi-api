var db = getmodule('database/connection');

var users = {
    findAll : function(res) {
        db.get(function(err, connection) {
            if(err) res.end();
            connection.query('SELECT * from users', function(err, rows) {
                connection.release();
                if(err) res.end();
                res.status(200).json(rows);
            });
        });
    }
}
module.exports = users;
