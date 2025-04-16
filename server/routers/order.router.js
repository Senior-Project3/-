const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');

router.get('/', orderController.getallorders);
router.post('/add', orderController.addorder);
router.put('/:id', orderController.updateorder);
router.delete('/remove/:id', orderController.deletorder);



module.exports = router; 
// http://localhost:4000/api/orders/ 
