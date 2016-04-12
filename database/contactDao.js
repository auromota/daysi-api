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
    },
    selectContacts: function(user_id, callback) {
        db.get(function(err, connection) {
            if(err) return callback(err);
            connection.query('SELECT first_user_id, second_user_id FROM contacts WHERE first_user_id = ? OR second_user_id = ?', [user_id, user_id], function(err, rows) {
                connection.release();
                callback(err, rows);
            });
        });
    }
}

module.exports = contactDao;
