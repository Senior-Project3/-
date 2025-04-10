const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payment.controller');

// Create payment
router.post('/payment', paymentController.createPayment);

// Verify payment status
router.get('/payment/:id', paymentController.verifyPayment);

module.exports = router; 