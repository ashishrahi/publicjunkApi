const Weight = require('../../models/variantModel/Weight.model')

//--------------- create a new Weight

exports.createWeights = async(req,res)=>{
const {weight}= req.body;
console.log(weight)
try {
   
    const newWeight = new Weight({
        weight:weight,
     })
    const savedWeight = await newWeight.save()
    res.status(200).json(savedWeight)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Weight')
   }}

//------------------ Get Weight

 exports.getWeights = async(req,res)=>{
    try {
        const weight = await Weight.find().sort({createdAt:-1})
        res.status(200).json(weight)
    } catch (error) {
        res.status(500).json(error)
    }}


    exports.getbyIdWeights = async(req,res)=>{
        try {
            const weight = await Weight.findById(req.params.id)
            if(!weight) return res.status(404).send('Weight not found')
            res.status(200).json(weight)
        } catch (error) {
            res.status(500).json(error)
        }
    }





  //--------------- update Status

    exports.updateStatus= async(req,res)=>{
        try {
            const updatedWeight= await Weight.findByIdAndUpdate(req.params.id)
            if(!updatedWeight) return res.status(404).send('Weight not found')
                updatedWeight.status = !updatedWeight.status
            await updatedWeight.save()
            res.status(200).json(updatedWeight)
            } catch (error) {
            res.status(500).json(error)
            }}


// ----------- update Weight

  exports.updateWeight=async(req,res)=>{
    const {weight}= req.body;
    try {
        const updatedWeight= await Weight.findByIdAndUpdate(req.params.id,{$set:{weight:weight}},{new: true})
        if(!updatedWeight) return res.status(404).send('Weight not found')
        res.status(200).json(updatedWeight)
        } catch (error) {
        res.status(500).json(error)
        }}
  

