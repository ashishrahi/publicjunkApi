const Order = require('../../models/orderModel/order.model');
const User = require('../../models/userModel/User.model')
const Category = require('../../models/categoryModel/category.model')
const Driver = require('../../models/driverModel/driver.model')
const generateCode = require('../../utilities/GenerateCode')

///////////////////////////////Create a new order ///////////////////////////////////////////////////////////

exports.createOrder = async (req, res) => {
    const{status,user,category} = req.body;
    console.log(req.body)
    if(status == 'New' || status == 'Accepted' || status == null){
    const generatecode = generateCode(8)
    try {
        const newOrder = new Order({ ...req.body,orderno:generatecode});
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
        } 
    catch (error) {
        res.status(500).json({ error: error.message });
        }}
    else{
        return res.status(400).json({ message: 'Invalid order status' });
    }};

/////////////////////////////// Get all orders ///////////////////////////////////////////////////////////

exports.getAllOrders = async (req, res) => {
    try { 
        const data = await Order.find({}).populate('user').populate('category').populate('Driver')
        const OrderDetails = data.map(
        order => ({
            _id: order._id,
            orderno: order.orderno,
            user: order.user.username,
            category: order.category.categoryname,
            Driver:order.Driver?order.Driver.name: 'Choose Drivers',
            orderDate: order.orderdate,
            status: order.status,
            }))
        res.status(200).json(OrderDetails);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};

/////////////////////////////// Get order by ID///////////////////////////////////////////////////////////


exports.getOrderById = async (req, res) => {
    try {
        const orderId = await Order.findById(req.params.id)
        if (!orderId) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(orderId);
        }
     catch (error) {
        res.status(500).json({ error: error.message });
        }};

/////////////////////////////// Update an order ///////////////////////////////////////////////////////////

exports.updateOrderStatus = async (req, res) => {
    
    const {status} = req.body;
    if (!['New', 'Accepted', 'Rejected',].includes(status)) {
        return res.status(400).json({ message: 'Invalid order status' });
         }
    try {
        const updateStatusOrder = await Order.findByIdAndUpdate(req.params.id,{$set:{status:status}},
         )
         if(!updateStatusOrder) return res.status(404).json({message: 'Order not found'})
          res.status(200).json(updateStatusOrder)
        } 
    catch (error) {
        res.status(500).json({ error: error.message });
        }};

/////////////////////////////// Delete an order ///////////////////////////////////////////////////////////

exports.deleteOrder = async (req, res) => {
   
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
        } 
    catch (error) {
        res.status(500).json({ error: error.message });
        }};

/////////////////////////////// Count Orders ///////////////////////////////////////////////////////////


exports.countOrders = async(req,res)=>{
    try {
        const countOrderData = await Order.countDocuments({});
        res.status(200).json(countOrderData);
        } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }}

/////////////////////////////// Update Order ///////////////////////////////////////////////////////////

    exports.UpdateOrder = async (req, res) => {
        const{orderData} = req.body
        console.log(req.body)
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
       
/////////////////////////////// AssignOrder ///////////////////////////////////////////////////////////


    exports.assignOrder= async(req,res)=>{
        const{Drivername} = req.body
        console.log(req.body)
        console.log(req.params)
        const Driverdetails = await Driver.findOne({name:Drivername})
        const DriverId = Driverdetails._id
        console.log(DriverId)

        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set:{Driver:DriverId}}, {new: true});
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

/////////////////////////////// orderDriverUpdate ///////////////////////////////////////////////////////////


    exports.orderDriverUpdate = async(req,res)=>{
        const{statusDriver}= req.body;
        console.log(req.body);
        try{
        const DriverOrderUpdate = await Order.findByIdAndUpdate(req.params.id,{$set:{statusDriver:statusDriver}})
        if(!DriverOrderUpdate) return res.status(404).json({message: 'Order not found'})
            res.status(200).json(DriverOrderUpdate)
           } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }}
    