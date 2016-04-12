var contactDao = getmodule('database/contactDao');
var contactRequestUtil = getmodule('util/contactRequestUtil');

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
    },
    canRequest: function(first_user_id, second_user_id, callback) {
        contactRequestUtil.canRequest(first_user_id, second_user_id, function(err, canRequest) {
            if(err) callback(err);
            else {
                if(!canRequest) callback(err, false);
                else {
                    contactDao.selectContacts(first_user_id, function(err, rows) {
                        if(err) callback(err);
                        else {
                            if(rows && rows.length) {
                                var isContact = false;
                                rows.forEach(function(row) {
                                    if(row.first_user_id == second_user_id || row.second_user_id == first_user_id) {
                                        isContact = true;
                                    }
                                });
                                if(isContact) callback(err, false);
                                else callback(err, true);
                            } else {
                                callback(err, true);
                            }
                        }
                    })
                }
            }
        })
    }
};

module.exports = contactUtil;
