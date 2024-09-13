const express = require('express');
const router = express.Router();
const {createState,getState} = require('../../controller/stateController/state.contoller');

// Create a new Order
router.post('/create', createState);

// Get all Orders
router.get('/', getState);





module.exports = router;
