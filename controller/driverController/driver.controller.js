    const Driver = require('../../models/driverModel/driver.model')
    const multer = require('multer')
    const upload = require('../../middleware/multer.middleware')
    const cloudinary = require('../../config/cloudinary.config')

/////////////////////////////// Registration of Driver///////////////////////////////////////////////////////
exports.registerDriver = async(req,res)=>{
    try {
        if (!req.body.values) {
            return res.status(400).json({ message: "No values provided in the request body" });
        }
        
        const data = JSON.parse(req.body.values);

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log(req.file);
        console.log(data);

        const result = await cloudinary.uploader.upload(req.file.path);

        const newDriver = new Driver({ ...data, avatar: result.secure_url });
        await newDriver.save();

        res.status(200).send(newDriver);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }}

    
/////////////////////////////// All Driver ///////////////////////////////////////////////////////

exports.getDrivers = async(req,res)=>{
    try {
        const allDrivers = await Driver.find({}).sort({createdAt: -1})
        res.status(200).json(allDrivers)
        } 
    catch (error) {
        res.status(500).json(error)
    }}
   




/////////////////////////////// Driver_Details ///////////////////////////////////////////////////////


    exports.getbyIdDriver = async(req,res)=>{
        try {
            const DriverbyId = await Driver.findById(req.params.id)
        if(!DriverbyId) return res.status(404).send('Driver not found')
        res.status(200).json(DriverbyId)
        } catch (error) {
            res.status(500).json(error)
        }}


/////////////////////////////// update Driver Status ///////////////////////////////////////////////////////


        exports.updateDriverStatus = async(req,res)=>{
            try {
                const statusDriver = await Driver.findByIdAndUpdate(req.params.id)
                if(!statusDriver) return res.status(404).send('Driver not found')
                    statusDriver.status = !statusDriver.status
                await statusDriver.save()
                res.status(200).json(statusDriver)
            } catch (error) {
                res.status(500).json(error)
            }}

/////////////////////////////// Active Driver Status ///////////////////////////////////////////////////////



                exports.activeDriverStatus=async(req,res)=>{
                try {
                    const activeDriver = await Driver.find({status:true})
                    if(!activeDriver) return res.status(404).send('Driver not found')
                    res.status(200).json(activeDriver)
                } catch (error) {
                    res.status(500).json(error)
                }
            }

/////////////////////////////// InActive Driver Status ///////////////////////////////////////////////////////



           exports.inactiveDriverStatus=async(req,res)=>{
            try {
                const inactiveDriver = await Driver.find({status:false})
                res.status(200).json(inactiveDriver)
            } catch (error) {
                res.status(500).json(error)
            }}

/////////////////////////////// Update DriverDetails ///////////////////////////////////////////////////////

    
        exports.updateDriverDetails = async (req, res) => {
            
            const updatedData = JSON.parse(req.body.values)
              try {
                const result = await cloudinary.uploader.upload(req.file.path);
                const updatedDriver = await Driver.findByIdAndUpdate(req.params.id,{$set:{...updatedData,avatar:result.secure_url}})
                res.status(200).json(updatedDriver)
                 } 
              catch (error) {
                res.status(500).json(error)
                }
               };

/////////////////////////////// Assigned Driver ///////////////////////////////////////////////////////


exports.getAssignedDriver = async (req, res) => {
    try {
        const assignedDriver = await Driver.findByIdAndUpdate(req.params.id, {$set:{assignedTo: req.body.assignedTo}}, {new: true})
        if(!assignedDriver) return res.status(404).send('Driver not found')
        res.status(200).json(assignedDriver)
    } catch (error) {
        res.status(500).json(error)
    }
}


    






