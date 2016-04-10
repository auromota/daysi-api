var jwt = require('jsonwebtoken');
var config = getmodule('config');

var auth = {
    isAuthorized : function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token) {
            jwt.verify(token, config.jwt_secret, function(err, decoded) {
                if(err) {
                    res.status(403).json({type: false, message: 'Failed to authenticate token.'});
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(403).json({type: false, message: 'No token provided.'});
        }
    }
}

module.exports = auth;
