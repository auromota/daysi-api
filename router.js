var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');

router.route('/signup').post(userController.signup);
router.route('/users').get(userController.users);

module.exports = router;
