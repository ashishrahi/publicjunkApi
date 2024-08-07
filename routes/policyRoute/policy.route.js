const express = require('express')
const router = express.Router()

const { createPolicy, getPolicy,getbyIdPolicy,updatePolicy} = require('../../controller/policyController/policy.controller')

//---------------- Create Policy

router.post('/policy',createPolicy)

//-------------------Get Policies
router.get('/',getPolicy)

//------------------- Get Policy by Id
router.get('/:id', getbyIdPolicy)

//------------------- Update Policy
router.put('/:id',updatePolicy)


module.exports = router
