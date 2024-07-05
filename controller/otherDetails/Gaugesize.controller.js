const Gaugesize = require('../../models/otherdetailsModel/Gaugesize.model')

// create a new color
const createGaugesize = async(req,res)=>{
const {gaugesize}= req.body;
try {
    const newGaugesize = new Gaugesize({gaugesize:gaugesize,})
    const savedGaugesize = await newGaugesize.save()
    res.status(200).json(savedGaugesize)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Gaugesize')
   }}

//Get Colors
 const getGaugesize = async(req,res)=>{
    try {
        const gaugesize = await Gaugesize.find()
        res.status(200).json(gaugesize)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {createGaugesize,getGaugesize};

