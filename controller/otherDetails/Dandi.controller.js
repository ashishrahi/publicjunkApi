const Dandi = require('../../models/otherdetailsModel/Dandi.model')

// create a new color
const createDandis = async(req,res)=>{
const {dandi}= req.body;
try {
    const newDandi = new Dandi({dandi:dandi,})
    const savedDandi = await newDandi.save()
    res.status(200).json(savedDandi)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Dandi')
   }}

//Get Colors
 const getDandis = async(req,res)=>{
    try {
        const dandis = await Dandi.find()
        res.status(200).json(dandis)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {createDandis,getDandis};

