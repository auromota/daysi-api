var config = {
	server: process.env.NEO4J_URL,
	endpoint: process.env.NEO4J_ENDPOINT,
	user: process.env.NEO4J_USER,
	pass: process.env.NEO4J_PASS
};

var db = require('seraph')(config);

module.exports = db;
