const express = require('express')
const router = express.Router();
const createError = require('../../utilitiesFunctions/error')
const { createSubscription,getSubscriptions,} = require('../../controller/subscriptionController/Subscription.controller');


//Create a Subscription
router.post('/subscription', createSubscription);

//Get a Subscription

//Get all Subscription
router.get('/', getSubscriptions);

//Update a Subscription

//update Subscription status


//Delete a Subscription


module.exports = router;
