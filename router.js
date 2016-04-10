var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');
var auth = getmodule('auth');

router.route('/signin').post(userController.signIn);
router.route('/users').post(userController.addUser);
router.route('/users').get(auth.isAuthorized, userController.findAll);
router.route('/users/:user_id').get(auth.isAuthorized, userController.findUser);

module.exports = router;
