var db = getmodule('database/connection');

var groupDao = {
    addGroup: function(group, user, callback) {
        var tx = db.batch();
        var g = tx.save(group);
        tx.label([g], 'group');
        tx.relate(user, 'IS_CREATOR', g);
        tx.relate(user, 'IS_MEMBER', g, {since: new Date().getTime(), isAdmin: true});
        tx.commit(function(err, results){
            callback(err, results[g]);
        });
    },
    findGroupsByUser: function(username, callback) {
        db.query('MATCH(user{username:{username}})-[:IS_MEMBER]->(group:group) return group', {username: username}, function(err, groups) {
            callback(err, groups);
        });
    },
    find: function(predicates, callback) {
        var query = 'MATCH(group:group) WHERE group.name =~ \'(?i).*'+predicates.query
                    +'.*\' RETURN group SKIP {skip} LIMIT {limit}';
        db.query(query, predicates, function(err, results) {
            callback(err, results);
        });
    },
    findGroup: function(groupId, callback) {
        db.find({groupId: groupId}, 'group', function(err, results) {
            callback(err, results);
        });
    },
    updateGroup: function(group, callback) {
        db.save(group, function(err, result) {
            callback(err, result);
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
        var query = 'MATCH(u:user{username:{username}})-[r:IS_MEMBER]-(g:group{groupId:{groupId}}) RETURN r';
        db.query(query, {
            username: username,
            groupId: groupId
        }, function(err, relationship) {
            callback(err, relationship);
        });
    },
    removeGroup: function(groupId, callback) {
        db.query('MATCH(g:group{groupId:{groupId}}) DETACH DELETE g', {groupId: groupId}, function(err, response) {
            callback(err, response);
        });
    }
}

module.exports = groupDao;
