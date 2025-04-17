const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCartItem);
router.delete('/remove/:productId', cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

module.exports = router; 

