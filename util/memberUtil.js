var memberDao = getmodule('database/memberDao');

var memberUtil = {
    addAdmin : function(user_id, group_id, callback) {
        var member = {
            user_id : user_id,
            group_id : insertId,
            joining_date : new Date(),
            is_admin : true,
            was_admin : true
        }
        memberDao.insertMember(member, function(err, rows) {
            callback(err, rows);
        });
    },
    findMembers : function(group_id, callback) {
        memberDao.findGroupMembers(group_id, function(err, rows) {
            if(err) return callback(err);
            var members = [], admins = [];
            rows.forEach(function(member) {
                delete member.password;
                if(member.photo_privacy) delete member.photo;
                if(member.email_privacy) delete member.email;
                if(member.name_privacy) delete member.name;
                delete member.photo_privacy;
                delete member.email_privacy;
                delete member.name_privacy;
                delete member.push_id;
                if(member.is_admin) admins.push(member);
                else members.push(member);
            });
            rows = {
                members : members,
                admins : admins
            }
            callback(err, rows);
        });
    },
    isAdmin : function(user_id, group_id, callback) {
        memberDao.isAdmin(user_id, group_id, function(err, rows) {
            if(err) callback(err);
            else {
                if(rows && rows.length && rows[0].is_admin) {
                    callback(err, true);
                } else {
                    callback(err, false);
                }
            }
        });
    }
}

module.exports = memberUtil;
