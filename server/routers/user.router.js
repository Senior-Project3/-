const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth');

router.get('/getall', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);
router.get('/profile', auth, userController.getProfile);
router.patch('/:id/ban', userController.banUser);
router.get("/get",userController.getProfile)
router.put('/update',userController.updateProfile);



module.exports = router; 