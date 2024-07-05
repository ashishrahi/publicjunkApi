const Color = require('../../models/otherdetailsModel/Color.model')

// create a new color
const createColors = async(req,res)=>{
    console.log(req.body)
try {
    const newColor = new Color(req.body)
    const savedColor = await newColor.save()
    res.status(200).json(savedColor)
    } 
catch (error) 
    {
    res.status(500).send('Error saving color')
   }}

//Get Colors
 const getColors = async(req,res)=>{
    try {
        const colors = await Color.find()
        res.status(200).json(colors)
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete Color
 const deleteColors = async(req,res)=>{
    try {
        const color = await Color.findByIdAndDelete(req.params.id)
        if(!color) return res.status(404).send('Color not found')
        res.status(200).send('Color deleted')
    } catch (error) {
        res.status(500).json(error)
    }
}

//Update Color
 const updateColor = async(req,res)=>{
    console.log(req.params)
    try {
        const color = await Color.findByIdAndUpdate(req.params.id, req.body,{new: true})
        if(!color) return res.status(404).send('Color not found')
        res.status(200).json(color)
    } catch (error) {
        res.status(500).json(error)
    }}



 module.exports = {createColors,getColors,deleteColors,updateColor};

