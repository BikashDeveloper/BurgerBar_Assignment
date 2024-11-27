const express = require('express');
const {
  addOrUpdateOrder,
  getNextOrderNumber,
  increaseSliceQuantity,
  decreaseSliceQuantity
} = require('../controllers/orderController');

const router = express.Router();

// Route to add or update an order
router.post('/orders', addOrUpdateOrder);

// Route to get the next order number
router.get('/orders/next', getNextOrderNumber);

// Route to increase slice quantity
router.post('/orders/increase-slice', increaseSliceQuantity);

// Route to decrease slice quantity
router.post('/orders/decrease-slice', decreaseSliceQuantity);

module.exports = router;
