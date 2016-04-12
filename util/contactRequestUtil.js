var contactRequestDao = getmodule('database/contactRequestDao');

var contactRequestUtil = {
    canRequest : function(first_user_id, second_user_id, callback) {
        contactRequestDao.selectRequests(first_user_id, function(err, rows) {
            if(err) callback(err);
            else {
                var canRequest = true;
                rows.forEach(function(row) {
                    if(row.user_id == second_user_id || row.requested_user_id == second_user_id) {
                        canRequest = false;
                    }
                });
                return callback(err, canRequest);
            }
        })
    }
};

module.exports = contactRequestUtil;
