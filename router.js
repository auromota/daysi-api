var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');
var groupController = getmodule('controller/groupController');
var contactController = getmodule('controller/contactController');
var groupUserController = getmodule('controller/groupUserController');
var groupUserDao = getmodule('database/groupUserDao');
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

router.route('/contacts').get(auth.isAuthorized, contactController.findContacts);
router.route('/contacts/request').post(auth.isAuthorized, contactController.contactRequest);
router.route('/contacts/request').put(auth.isAuthorized, contactController.acceptRequest);
router.route('/contacts').delete(auth.isAuthorized, contactController.removeContact);

router.route('/groups/join').post(auth.isAuthorized, groupUserController.requestGroup);
router.route('/groups/add').post(auth.isAuthorized, groupUserController.addUserToGroup);
router.route('/groups/remove').post(auth.isAuthorized, groupUserController.removeUserFromGroup);
router.route('/groups/admin').post(auth.isAuthorized, groupUserController.makeUserAdmin);

module.exports = router;
