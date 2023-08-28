const userController = require('../../controllers/userController');
const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController')
const authController = require('../../controllers/authController')
const verifyJWT = require('../../middleware/jwtVerify')

router.post('/auth', authController.handleLogin);
router.post('/register', registerController.handleRegistration);

router.get('/', verifyJWT, userController.getAllUsers);
router.post('/', userController.postUser);
router.delete('/', userController.deleteUser);
router.put('/', userController.updateUser);


router.get('/:id', userController.getUser);

module.exports = router;