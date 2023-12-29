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


//n ta otimizado mas funciona :)
router.get('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitations);
router.post('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.registerInvitation);
router.put('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.updateInvitation);
router.delete('/invitation',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.deleteInvitation);
router.get('/invitation/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitation);
router.get('/invitationowner/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationOwner);
router.get('/invitationowneraccepted/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationOwnerAccepted);
router.get('/invitationownerdeclined/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationOwnerDeclined);
router.get('/invitationownerpending/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationOwnerPending);
router.get('/invitationdestiny/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationDestiny);
router.get('/invitationdestinyaccepted/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationDestinyAccepted);
router.get('/invitationdestinydeclined/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationDestinyDeclined);
router.get('/invitationdestinypending/:id',jwtVerify,handleRolesVerify(authorizedRoles.user), invitationController.getInvitationDestinyPending);

module.exports=router