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
    },
    find: function(predicates, callback) {
        var query = 'MATCH(user:user{username:{username}})-[r:IS_CONTACT]-(users:user) RETURN users SKIP {skip} LIMIT {limit}';
        db.query(query, predicates, function(err, results) {
            if(err) return callback(err);
            var response = {
                contacts: results
            }
            query = 'MATCH(user:user{username:{username}})-[r:IS_CONTACT]-(users:user) RETURN count(users) as count';
            db.query(query, predicates, function(err, result) {
                if(err) return callback(err);
                response.totalContacts = result[0].count;
                response.contacts.forEach(function(contact) {
                    delete contact.password;
                });
                callback(err, response);
            })
        });
    },
    removeContact: function(request, callback) {
        var query = 'MATCH (firstUser:user)-[r:IS_CONTACT]-(secondUser:user), ' + 
                    '(firstUser:user)-[r2:REQUESTED_CONTACT]-(secondUser:user) ' +
                    'WHERE ID(firstUser) = 48 AND ID(secondUser) = 53 DELETE r, r2';
        db.query(query, request, function(err, results) {
           callback(err, results); 
        });
    }
}

module.exports = contactDao;
