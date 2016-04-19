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
    removeGroup: function(groupId, callback) {
        db.query('MATCH(g:group{groupId:{groupId}}) DETACH DELETE g', {groupId: groupId}, function(err, response) {
            callback(err, response);
        });
    }
}

module.exports = groupDao;
