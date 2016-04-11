var db = getmodule('database/connection');

var contactDao = {
    addContact: function(contact, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('INSERT INTO contacts SET ?', contact, function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    }
}

module.exports = contactDao;
