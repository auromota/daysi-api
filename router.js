var express = require('express');
var router = express.Router();
var userController = getmodule('controller/userController');

router.route('/signup').post(userController.signUp);
router.route('/signin').post(userController.signIn);
router.route('/users').get(userController.getAll);
router.route('/users/:userId').get(userController.getUser);

module.exports = router;
