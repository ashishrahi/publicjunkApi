

////////////////////////////////// Create Baoking  //////////////////////////////////////////////

exports.createbookings=async(req,res)=>{
    try {
        const newBooking = new Booking({...req.body})
        await newBooking.save()
        res.status(201).json(newBooking)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}