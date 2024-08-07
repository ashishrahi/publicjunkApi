const express = require('express')
const router = express.Router()

const {newPayment,allPayments} = require('../../controller/paymentController/payment.controller')

router.post('/payment',newPayment)
router.get('/',allPayments)

module.exports = router;