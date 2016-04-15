var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');
var groupController = getmodule('controller/groupController');
var contactController = getmodule('controller/contactController');
var auth = getmodule('auth');

router.route('/signin').post(userController.signIn);
router.route('/users').post(userController.addUser);
router.route('/users').get(auth.isAuthorized, userController.findAll);
router.route('/users/:username').get(auth.isAuthorized, userController.findUser);
router.route('/users').put(auth.isAuthorized, userController.updateUser)

router.route('/groups').post(auth.isAuthorized, groupController.addGroup);
router.route('/groups').get(auth.isAuthorized, groupController.findAll);
router.route('/groups/:groupId').get(auth.isAuthorized, groupController.findGroup);
router.route('/groups').put(auth.isAuthorized, groupController.updateGroup);
router.route('/groups/:groupId').delete(auth.isAuthorized, groupController.removeGroup);

router.route('/contact-requests').post(auth.isAuthorized, contactController.contactRequest);
router.route('/contact-requests').put(auth.isAuthorized, contactController.acceptRequest);

module.exports = router;
