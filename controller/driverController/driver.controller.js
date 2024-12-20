    const Driver = require('../../models/driverModel/driver.model')
    const Warehouse  = require('../../models/warehouseModel/warehouse.modal')
    const FinanceDepart = require('../../models/financeDepartModel/financeDepart.model')
    const multer = require('multer')
    const upload = require('../../middleware/multer.middleware')
    const cloudinary = require('../../config/cloudinary.config')

/////////////////////////////// Registration of Driver///////////////////////////////////////////////////////


exports.registerDriver = async (req, res) => {
    try {
      // Extract data from the request body and files
      const { name, email, mobile, password, address, aadhaarno, warehouse, financedepart, bankname, accountholdername, bankaccountnumber, ifsccode } = req.body;
      const avatar = req.files?.avatar ? req.files.avatar[0].path : null; // If avatar exists
      const aadhaarimage = req.files?.aadhaarimage ? req.files.aadhaarimage[0].path : null; // If aadhaar image exists
  
      // Validate the incoming data
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
  
      // Create a new user document
      const newDriver = new Driver({
        name,
        email,
        mobile,
        password,  // Make sure to hash this before storing
        address: {
          house: address.house,
          pincode: address.pincode,
          city: address.city,
          state: address.state,
          country: address.country
        },
        aadhaarno,
        warehouse,
        financedepart,
        bankname,
        accountholdername,
        bankaccountnumber,
        ifsccode,
        avatar,
        aadhaarimage
      });
  
      // Save the user to the database
      await newDriver.save();
  
      res.status(201).json({ message: 'Driver created successfully', driver: newDriver });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

    
/////////////////////////////// All Driver ///////////////////////////////////////////////////////

exports.getDrivers = async(req,res)=>{
    try {
        const allDrivers = await Driver.find({}).populate('financedepart').populate('warehouse').sort({createdAt: -1})
        
        const driverlist = allDrivers.map((item) => ({
            _id: item._id,
            name: item.name,
            email: item.email,
            mobile: item.mobile,
            address: item.address,
            aadhaarno: item.aadhaarno,
            warehouse: item.warehouse.name,
            financedepart: item.financedepart.name,
            bankname: item.bankname,
            accountholdername: item.accountholdername,
            bankaccountnumber: item.bankaccountnumber,
            ifsccode: item.ifsccode,
            avatar: item.avatar ? cloudinary.url(item.avatar) : null,
            aadhaarimage: item.aadhaarimage ? cloudinary.url(item.aadhaarimage) : null,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }));
        
        
        
        res.status(200).json({
            message:'List Of Drivers',
            data:driverlist})
        } 
    catch (error) {
        res.status(500).json(error)
    }}
   




/////////////////////////////// Driver_Details ///////////////////////////////////////////////////////


    exports.getbyIdDriver = async(req,res)=>{
        try {
            const DriverbyId = await Driver.findById(req.params.id)
        if(!DriverbyId) return res.status(404).send('Driver not found')
        res.status(200).json({
            message:'Details Of Driver',
            data:DriverbyId
            })
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
                res.status(200).json({
                    message:'Status Of Driver has been updated successfully',
                    data:statusDriver})
            } catch (error) {
                res.status(500).json(error)
            }}

/////////////////////////////// Active Driver Status ///////////////////////////////////////////////////////



                exports.activeDriverStatus=async(req,res)=>{
                try {
                    const activeDriver = await Driver.find({status:true})
                    if(!activeDriver) return res.status(404).send('Driver not found')
                    res.status(200).json({
                        message:'List Of Active Drivers',
                        data:activeDriver})
                } catch (error) {
                    res.status(500).json(error)
                }
            }

/////////////////////////////// InActive Driver Status ///////////////////////////////////////////////////////



           exports.inactiveDriverStatus=async(req,res)=>{
            try {
                const inactiveDriver = await Driver.find({status:false})
                res.status(200).json({
                    message:'List of Inactive Drivers',
                    data:inactiveDriver})
            } catch (error) {
                res.status(500).json(error)
            }}

/////////////////////////////// Update DriverDetails ///////////////////////////////////////////////////////

    
        exports.updateDriverDetails = async (req, res) => {
            
            const updatedData = JSON.parse(req.body.values)
              try {
                const result = await cloudinary.uploader.upload(req.file.path);
                const updatedDriver = await Driver.findByIdAndUpdate(req.params.id,{$set:{...updatedData,avatar:result.secure_url}})
                res.status(200).json({
                    message:'Details of Driver has been updated successfully',
                    data:updatedDriver})
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
        res.status(200).json({
           message:'Driver has been assigned',
            data:assignedDriver})
    } catch (error) {
        res.status(500).json(error)
    }
}


    






