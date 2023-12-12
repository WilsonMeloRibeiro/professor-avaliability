const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtVerify = require('../middleware/jwtVerify');
const handleLogin = require('../controllers/authController');
const handleRefresh = require('../controllers/refreshController');
const handleRolesVerify = require('../middleware/rolesVerify')
const authorizedRoles = require('../config/authorizedRoles.js')
const handleLogout = require('../controllers/logoutController')

router.post('/auth', handleLogin);
router.get('/auth', handleRefresh);

router.get('/logout', handleLogout);

router.get('/', userController.getUsers);
router.post('/', userController.registerUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.get('/:id', userController.getUser);

module.exports=router