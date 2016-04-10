var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');
var groupController = getmodule('controller/groupController');
var auth = getmodule('auth');

router.route('/signin').post(userController.signIn);
router.route('/users').post(userController.addUser);
router.route('/users').get(auth.isAuthorized, userController.findAll);
router.route('/users/:user_id').get(auth.isAuthorized, userController.findUser);
router.route('/groups').post(auth.isAuthorized, groupController.addGroup);
router.route('/groups').get(auth.isAuthorized, groupController.findAll);
router.route('/groups/:group_id').get(auth.isAuthorized, groupController.findGroup);

module.exports = router;
