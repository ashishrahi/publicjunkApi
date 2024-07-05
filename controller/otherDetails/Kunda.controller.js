const Kunda = require('../../models/otherdetailsModel/Kunda.model')

// create a new color
const createKundas = async(req,res)=>{
const {kunda}= req.body;
try {
    const newKunda = new Kunda({kunda:kunda,})
    const savedKunda = await newKunda.save()
    res.status(200).json(savedKunda)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Kunda')
   }}

//Get Colors
 const getKundas = async(req,res)=>{
    try {
        const kunda = await Kunda.find()
        res.status(200).json(kunda)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {createKundas,getKundas};

