const express = require('express');
const router = express.Router();
const {assignOrder,createOrder,getAllOrders,getOrderById,updateOrderStatus,deleteOrder,countOrders,UpdateOrder,orderDriverUpdate} = require('../../controller/orderController/order.controller');

// Create a new Order
router.post('/order', createOrder);

// Get all Orders
router.get('/', getAllOrders);

// Get an Order by ID
router.get('/:id', getOrderById);

// Update an Order
router.put('/:id/status', updateOrderStatus);

// Delete an Order
router.delete('/:id', deleteOrder);

//Count Orders 
router.get('/count-orders',countOrders)

// Update Router
router.put('/:id',UpdateOrder)

// assign Order
router.put('/:id/assign-Driver', assignOrder)

//Update DriverStatus
router.put('/:id/Driverorder',orderDriverUpdate)



module.exports = router;
