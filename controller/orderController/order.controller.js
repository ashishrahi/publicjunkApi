const Order = require('../../models/orderModel/order.model');
const User = require('../../models/userModel/User.model')
const Subcategory = require('../../models/subcategoryModel/subcategory.model')
const Driver = require('../../models/driverModel/driver.model')
const generateCode = require('../../utilities/GenerateCode')
const Warehouse = require('../../models/warehouseModel/warehouse.modal')

///////////////////////////////Create a new order ///////////////////////////////////////////////////////////

exports.createOrder = async (req, res) => {
    try {
        const createorder = new Order(req.body); // Assumes the order data is in the request body
        const savedOrder = await createorder.save();
        res.status(201).json({
            message:'Order created successfully',
            data:savedOrder});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/////////////////////////////// Get all orders ///////////////////////////////////////////////////////////

exports.getAllOrders = async (req, res) => {
    try { 
        const data = await Order.find({}).populate('user').populate('subcategory').populate('driver').populate('warehouse')
        const OrderDetails = data.map(
        order => ({
            _id: order._id,
            orderno: order.orderno,
            user: order.user.username,
            subcategory: order.subcategory.subcategoryname,
            subcategoryCount: order.subcategory.length,
            driver:order.driver.name?order.driver.name: 'Choose Drivers',
            warehouse:order.warehouse.name,
            orderDate: order.orderdate,
            status: order.status,
            }))
        res.status(200).json({
            message:'List Of Orders',
            data:OrderDetails});
        
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
        res.status(200).json({
            message:'Details Of Orders',
            data:orderId});
        }
     catch (error) {
        res.status(500).json({ error: error.message });
        }};

/////////////////////////////// Update an order ///////////////////////////////////////////////////////////

exports.updateOrderStatus = async (req, res) => {
    try {
     const {status} = req.body;
    if (!['New', 'Accepted', 'Rejected',].includes(status)) {
        return res.status(400).json({ message: 'Invalid order status' });
         }
        const updateStatusOrder = await Order.findByIdAndUpdate(req.params.id,{$set:{status:status}},
         )
         if(!updateStatusOrder) return res.status(404).json({message: 'Order not found'})
          res.status(200).json({
        message:'Order status updated successfully',
        data:updateStatusOrder})
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
        res.status(200).json({
            message:'Numbers Of Orders',
            data:countOrderData});
        } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }}

/////////////////////////////// Update Order ///////////////////////////////////////////////////////////

    exports.UpdateOrder = async (req, res) => {
        try {
            let{orderData} = req.body

            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json({
                message:'Order has been updated successfully!',
                data:updatedOrder});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
       
/////////////////////////////// AssignOrder ///////////////////////////////////////////////////////////


    exports.assignOrder= async(req,res)=>{
        try {
     const{Drivername} = req.body
        const Driverdetails = await Driver.findOne({name:Drivername})
        const DriverId = Driverdetails._id

            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set:{Driver:DriverId}}, {new: true});
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json({
                message: 'Order has beend assigned !',
                data:updatedOrder});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

/////////////////////////////// orderUpdate ///////////////////////////////////////////////////////////


    exports.orderDriverUpdate = async(req,res)=>{
        try{
        const{statusDriver}= req.body;

        const DriverOrderUpdate = await Order.findByIdAndUpdate(req.params.id,{$set:{statusDriver:statusDriver}})
        if(!DriverOrderUpdate) return res.status(404).json({message: 'Order not found'})
            res.status(200).json({
                message: 'Order updated successfully',
                data:DriverOrderUpdate})
           } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }}
    