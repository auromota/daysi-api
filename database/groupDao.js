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
    findAll: function(username, callback) {
        db.nodesWithLabel('group', function(err, nodes) {
            if(err) callback(err);
            else {
                db.query('match(user{username:{username}})-[r:IS_MEMBER]->(group) return r', {username: username}, function(err, rels) {
                    var groups = [];
                    var isMember = false;
                    nodes.forEach(function(node) {
                        isMember = false;
                        if(node.privacy) {
                            rels.forEach(function(rel) {
                                if(rel.end == node.id) isMember = true;
                            })
                            if(isMember) groups.push(node);
                        } else {
                            groups.push(node);
                        }
                    })
                    callback(err, groups);
                });
            }
        });
    },
    findGroup: function(groupId, callback) {
        db.find({groupId: groupId}, 'group', function(err, results) {
            if(err) callback(err);
            else {
                if(results && results.length) {
                    db.relationships(results[0].id, 'in', 'IS_MEMBER', function(err, relationships) {
                        if(err) callback(err);
                        else {
                            if(relationships && relationships.length) {
                                callback(err, {group: results[0], members: relationships})
                            } else {
                                callback(err, {group: results[0], members: []});
                            }
                        }
                    });
                } else {
                    callback(err, undefined);
                }
            }
        });
    },
    updateGroup: function(group, callback) {
        db.save(group, function(err, result) {
            callback(err, result);
        });
    }
}

module.exports = groupDao;
