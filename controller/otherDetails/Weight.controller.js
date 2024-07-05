const Weight = require('../../models/otherdetailsModel/Weight.model')

// create a new Weight
const createWeights = async(req,res)=>{
const {weight}= req.body;
try {
    const newWeight = new Weight({weight:weight,})
    const savedWeight = await newWeight.save()
    res.status(200).json(savedWeight)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Weight')
   }}

//Get Weight
 const getWeights = async(req,res)=>{
    try {
        const weight = await Weight.find()
        res.status(200).json(weight)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {createWeights,getWeights};

