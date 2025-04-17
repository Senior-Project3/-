const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', cartController.getCart); // Get cart for authenticated user
router.get('/:id', cartController.getCartByUserId); // Get cart by user ID
router.post('/add', cartController.addToCart); // Add item to cart
router.put('/update/:productId', cartController.updateCartItem); // Update cart item quantity
router.delete('/remove/:productId', cartController.removeFromCart); // Remove item from cart
router.delete('/clear', cartController.clearCart); // Clear cart

module.exports = router;
