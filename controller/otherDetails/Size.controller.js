const Size = require('../../models/variantModel/Size.model')

//--------------------create a new Size
exports.createSizes = async(req,res)=>{
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

//-------------------Get Size
 exports.getSizes = async(req,res)=>{
    try {
        const size = await Size.find().sort({createdAt:-1})
        res.status(200).json(size)
    } catch (error) {
        res.status(500).json(error)
    }}


// getbyId Size
 exports.getbyIdSize = async(req,res)=>{
    try {
        const size = await Size.findById(req.params.id)
        if(!size) return res.status(404).send('Size not found')
        res.status(200).json(size)
    } catch (error) {
        res.status(500).json(error)
    }}


//--------------- SizeStatus
exports.getSizeStatus= async(req,res)=>{
    try {
        const updatedSize= await Size.findByIdAndUpdate(req.params.id)
        if(!updatedSize) return res.status(404).send('Size not found')
            updatedSize.status = !updatedSize.status
        await updatedSize.save()
        res.status(200).json(updatedSize)
        } catch (error) {
        res.status(500).json(error)
        }}

        exports.updateSizes = async(req,res)=>{
        const{size}= req.body
            try {
                const updatedSize= await Size.findByIdAndUpdate(req.params.id,{$set:{size:size}}, {new: true})
                if(!updatedSize) return res.status(404).send('Size not found')
                res.status(200).json(updatedSize)
            } catch (error) {
                res.status(500).json(error)
            }}
        

