const Gender = require('../../models/variantModel/Gender.model')

//--------------------- create a new Gender 
exports.createGenders = async(req,res)=>{
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

//--------------------- Get Genders 
 exports.getGenders = async(req,res)=>{
    try {
        const gender = await Gender.find().sort({createdAt:-1})
        res.status(200).json(gender)} 
    catch (error) {
        res.status(500).json(error)
    }}

// Getbyid Gender

exports.getbyIdGender= async(req,res)=>{
    try {
        const gender = await Gender.findById(req.params.id)
        if(!gender) return res.status(404).send('Gender not found')
        res.status(200).json(gender)
    } catch (error) {
        res.status(500).json(error)
    }}




//-------------------- GenderStatus
exports.getStatus= async(req,res)=>{
    try {
        const updatedstatus= await Gender.findByIdAndUpdate(req.params.id)
        if(!updatedstatus) return res.status(404).send('Gender not found')
            updatedstatus.status = !updatedstatus.status
        await updatedstatus.save()
        res.status(200).json(updatedstatus)
    } catch (error) {
        res.status(500).json(error)
    }}


//-------------------- update a Gender

exports.updateGenders=async(req,res)=>{
    const {gender}= req.body
    try {
        const updatedGender= await Gender.findByIdAndUpdate(req.params.id,{$set:{gender:gender}},{new:true})
        if(!updatedGender) return res.status(404).send('Gender not found')
        res.status(200).json(updatedGender)
    } catch (error) {
        res.status(500).json(error)
    }}
