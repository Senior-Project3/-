const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payment.controller');

// Create payment
// router.post('/payment', paymentController.createPayment);
router.post('/payment', paymentController.Add); 
// Verify payment status
router.post('/payment/:paymentId', paymentController.verify);


module.exports = router; 
