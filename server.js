require('getmodule');
require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = getmodule('router');
var db = getmodule('database/connection');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

db.constraints.uniqueness.createIfNone('user', 'username', function(err, constraint) {
    if(err) console.log({message:'API could not be started.', err: err});
    else {
        db.constraints.uniqueness.createIfNone('user', 'email', function(err, constraint) {
            if(err) console.log({message:'API could not be started.', err: err});
            else {
                db.constraints.uniqueness.createIfNone('group', 'groupId', function(err, constraint) {
                    if(err) console.log({message:'API could not be started.', err: err});
                    else {
                        app.listen(process.env.PORT || 8080);
                        console.log('Server is running!');
                    }
                })
            }
        })
    }
});
