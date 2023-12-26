const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');
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

router.get('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitations);
router.post('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.registerInvitation);
router.put('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.updateInvitation);
router.delete('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.deleteInvitation);
router.get('/invitation/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitation);

module.exports=router