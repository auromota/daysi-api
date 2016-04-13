var config = {
	server: 'http://daysi.me:7474',
	endpoint: '/db/data',
	user: 'neo4j',
	pass: 'daysidaysi'
};

var db = require('seraph')(config);

module.exports = db;
