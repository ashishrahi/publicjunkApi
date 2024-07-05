const Size = require('../../models/otherdetailsModel/Size.model')

// create a new parity
const createSizes = async(req,res)=>{
const {size}= req.body;
try {
    const newSize = new Size({size:size,})
    const savedSize = await newSize.save()
    res.status(200).json(savedSize)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Size')
   }}

//Get parity
 const getSizes = async(req,res)=>{
    try {
        const size = await Size.find()
        res.status(200).json(size)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {createSizes,getSizes};

