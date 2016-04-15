var db = getmodule('database/connection');

var contactDao = {
    addRequest: function(request, callback) {
        db.relate(request.userId, 'REQUESTED_CONTACT', request.requestedUserId, {date: request.date}, function(err, relationship) {
                callback(err, relationship);
            }
        );
    },
    acceptRequest: function(request, callback) {
        db.query('MATCH(u:user), (u2:user) WHERE ID(u)={requestedUserId} AND ID(u2)={userId} CREATE u-[r:IS_CONTACT{date:{date}}]->u2 RETURN r', {
            userId: request.userId,
            requestedUserId: request.requestedUserId,
            date: new Date().getTime()
        }, function(err, relationship) {
            callback(err, relationship);
        })
    },
    getRelationships: function(userId, requestedUserId, callback) {
        db.query('MATCH(user:user)-[r]-(requestedUser:user) WHERE ID(user) = {userId} AND ID(requestedUser) = {requestedUserId} RETURN r', {
            userId: userId,
            requestedUserId: requestedUserId
        }, function(err, relationships) {
            callback(err, relationships);
        });
    },
    denyRequest: function(id, callback) {
        db.rel.delete(id, function(err) {
            callback(err, {status: true});
        })
    }
}

module.exports = contactDao;
