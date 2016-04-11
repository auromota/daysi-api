var contactDao = getmodule('database/contactDao');

var contactUtil = {
    addContacts : function(first_user_id, second_user_id, callback) {
        var contact = {
            first_user_id : first_user_id,
            second_user_id : second_user_id,
            date : new Date()
        };
        contactDao.addContact(contact, function(err, rows) {
            if(err) callback(err);
            else {
                var secondContact = {
                    first_user_id : second_user_id,
                    second_user_id : first_user_id,
                    date : contact.date
                };
                contactDao.addContact(secondContact, function(err, rows) {
                    callback(err, rows);
                })
            }
        })
    }
};

module.exports = contactUtil;
