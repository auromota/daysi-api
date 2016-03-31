var mysql = require('mysql');
var db = mysql.createPool({
    host : 'us-cdbr-azure-southcentral-e.cloudapp.net',
    user : 'bcfb76bea6c9e1',
    password : '2c6cc8e8',
    database : 'daysi',
    connectionLimit : 50,
    queueLimit : 0,
    waitForConnection : true
});

var Connection = {
    get: function(callback) {
        return db.getConnection(callback);
    }
};

module.exports = Connection;
