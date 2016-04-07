var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');
var auth = getmodule('auth');

router.route('/signup').post(userController.signUp);
router.route('/signin').post(userController.signIn);
router.route('/users').get(auth.isAuthorized, userController.getAll);
router.route('/users/:userId').get(auth.isAuthorized, userController.getUser);

module.exports = router;
