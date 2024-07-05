const Gender = require('../../models/otherdetailsModel/Gender.model')

// create a new color
const createGenders = async(req,res)=>{
const {gender}= req.body;
try {
    const newGender = new Gender({gender:gender,})
    const savedGender = await newGender.save()
    res.status(200).json(savedGender)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Gender')
   }}

//Get Colors
 const getGenders = async(req,res)=>{
    try {
        const gender = await Gender.find()
        res.status(200).json(gender)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {createGenders,getGenders};

