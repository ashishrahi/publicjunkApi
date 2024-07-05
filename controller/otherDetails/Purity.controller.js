const Purity = require('../../models/otherdetailsModel/Purity.model')

// create a new parity
const createPurities = async(req,res)=>{
const {purity}= req.body;
try {
    const newPurity = new Purity({purity:purity,})
    const savedPurity = await newPurity.save()
    res.status(200).json(savedPurity)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Purity')
   }}

//Get parity
 const getPurities = async(req,res)=>{
    try {
        const purity = await Purity.find()
        res.status(200).json(purity)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {createPurities,getPurities};

