const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth');

router.get('/getall', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);
router.put('/ban/:id', userController.banUser);
router.put('/unban/:id', userController.unbanUser);
router.delete('/:id', userController.deleteUser);



module.exports = router; 