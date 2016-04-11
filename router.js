var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');
var groupController = getmodule('controller/groupController');
var contactRequestController = getmodule('controller/contactRequestController');
var auth = getmodule('auth');

router.route('/signin').post(userController.signIn);
router.route('/users').post(userController.addUser);
router.route('/users').get(auth.isAuthorized, userController.findAll);
router.route('/users/:user_id').get(auth.isAuthorized, userController.findUser);
router.route('/users').put(auth.isAuthorized, userController.updateUser)

router.route('/groups').post(auth.isAuthorized, groupController.addGroup);
router.route('/groups').get(auth.isAuthorized, groupController.findAll);
router.route('/groups/:group_id').get(auth.isAuthorized, groupController.findGroup);
router.route('/groups').put(auth.isAuthorized, groupController.updateGroup);

router.route('/contact-requests').post(auth.isAuthorized, contactRequestController.contactRequest);
router.route('/contact-requests/accept').post(auth.isAuthorized, contactRequestController.acceptRequest);

module.exports = router;
