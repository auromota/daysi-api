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
        var query = 'match(u:user{username:{username}})-[r]-(g:group{groupId:{groupId}}) return r';
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
    }
}

module.exports = groupUserDao;
