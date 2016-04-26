var db = getmodule('database/connection');

var groupUserDao = {
    findGroupsByUser: function(username, callback) {
        db.query('MATCH(user{username:{username}})-[:IS_MEMBER]->(group:group) return group', {username: username}, function(err, groups) {
            callback(err, groups);
        });
    },
    findMembersForGroup: function(count, type, group, callback) {
        var query = 'START g = node({id}) MATCH(g)-[:'+type+']-(u:user) '+
                    'RETURN DISTINCT u.username as username, u.photo as photo, '+
                    'u.photoPrivacy as photoPrivacy, u.name as name, u.namePrivacy as namePrivacy '+
                    'LIMIT {count}';
        db.query(query, {
            id: group.id, count: count
        }, function(err, members) {
            callback(err, members);
        });
    },
    findMemberRelationship: function(username, groupId, callback) {
        var query = 'MATCH(u:user{username:{username}})-[r]-(g:group{groupId:{groupId}}) RETURN r';
        db.query(query, {
            username: username,
            groupId: groupId
        }, function(err, relationships) {
            callback(err, relationships);
        });
    },
    requestGroup: function(request, callback) {
        var query = 'MATCH(u:user{username:{username}}), (group:group{groupId:{groupId}}) CREATE u-[relationship:REQUESTED_JOIN{date:{date}}]->group return relationship, group';
        db.query(query, request, function(err, response) {
            callback(err, response);
        });
    },
    isUserInGroup: function(username, groupId, callback) {
        var query = 'MATCH(u:user{username:{username}})-[r:IS_MEMBER]-(g:group{groupId:{groupId}}) RETURN r';
        db.query(query, {
            username: username,
            groupId: groupId
        }, function(err, rel) {
            var response = rel.length ? true : false;
            callback(err, response);
        });
    },
    isAdmin: function(username, groupId, callback) {
        var query = 'MATCH(u:user{username:{username}})-[r:IS_MEMBER{isAdmin:true}]-(g:group{groupId:{groupId}}) RETURN r';
        db.query(query, {
            username: username,
            groupId: groupId
        }, function(err, rel) {
            var response = rel.length ? true : false;
            callback(err, response);
        });
    },
    addUserToGroup: function(username, groupId, callback) {
        var date = new Date().getTime();
        var query = 'MATCH(u:user{username:{username}}), (g:group{groupId:{groupId}}) CREATE u-[r:IS_MEMBER{since:{date}, isAdmin: false}]->g RETURN r';
        db.query(query, {
            username: username,
            groupId: groupId,
            date: date
        }, function(err, rel) {
            callback(err, rel);
        });
    },
    removeUserFromGroup: function(username, groupId, callback) {
        var query = 'MATCH(u:user{username:{username}})-[r:IS_MEMBER]-(g:group{groupId:{groupId}}) DELETE r';
        db.query(query, {
            username: username,
            groupId: groupId
        }, function(err, rel) {
            callback(err, rel);
        });
    }
}

module.exports = groupUserDao;
