const Payment = require('../../models/paymentModel/payment.model')
const User = require('../../models/userModel/User.model')
const Order = require('../../models/orderModel/order.model')

//-------------- Create Payment
exports.newPayment = async(req,res)=>{
    try {
        const newPayment = new Payment({...req.body})
        await newPayment.save()
        res.status(201).json(newPayment)
         } 
    catch (error) {
        res.status(500).json(error)
        }}

//--------------------- All Payments

        exports.allPayments = async(req,res)=>{
           
            try {
                const paymentDetails = await Payment.find().populate('user').populate('order');
                
                if (!paymentDetails) {
                    return res.status(404).json({ message: 'No payment details found' });
                }
                const details = paymentDetails.map(
                    payment => ({
                        _id: payment._id,
                        user: payment.user.username,
                        createdAt: payment.createdAt,
                        amount: payment.order.totalAmount,
                        paymenttype: payment.order.paymentMethod,
                        provider: payment.order.provider,
                        status: payment.status
                    })
                )
                res.status(200).json(details);
            } catch (error) {
                console.error('Error fetching payment details:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            
            }
        