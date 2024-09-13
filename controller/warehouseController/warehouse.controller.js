const Warehouse = require('../../models/warehouseModel/warehouse.modal')

//////////////////////// Create WareHouse ///////////////////////////////////////

exports.createWarehouse = async(req,res)=>{
    try {
        const newWarehouse = new Warehouse({...warehouseData})
        await newWarehouse.save()
        res.status(201).json(newWarehouse)
        } 
    catch (error) {
        res.status(400).json({error: error.message})
    }}

////////////////////////////// Read Warehouse ////////////////////////////////////

exports.getWarehouse = async(req,res)=>{
    try {
        const readWarehouse = await Warehouse.find({})
        if (!readWarehouse) return res.status(404).json({ message: 'WareHouse not found' })
        res.json(readWarehouse)
        } 
    catch (error)
     {
        res.status(500).json({ message: error.message })
     }}