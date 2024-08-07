const Purity = require('../../models/variantModel/Purity.model')

//---------------------create a new parity
exports.createPurities = async(req,res)=>{
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

//---------------Get parity

 exports.getPurities = async(req,res)=>{
    try {
        const getpurity = await Purity.find({}).sort({createdAt: -1})
        res.status(200).json(getpurity)
    } catch (error) {
        res.status(500).json(error)
    }}


 exports.getbyIdPurities=async(req,res)=>{
    try {
        const getpurityById = await Purity.findById(req.params.id)
        if(!getpurityById) return res.status(404).send('Purity not found')
        res.status(200).json(getpurityById)
    } catch (error) {
        res.status(500).json(error)
    }
 }





//-------------------- getPurityStatus
exports.getPurityStatus= async(req,res)=>{
    try {
        const updatedPurity= await Purity.findByIdAndUpdate(req.params.id)
        if(!updatedPurity) return res.status(404).send('Purity not found')
            updatedPurity.status = !updatedPurity.status
        await updatedPurity.save()
        res.status(200).json(updatedPurity)
        } catch (error) {
        res.status(500).json(error)
        }}


exports.updatePurity = async(req,res)=>{
    const{purity} = req.body;
    try {
        const updatedPurity= await Purity.findByIdAndUpdate(req.params.id,{$set:{purity:purity}},{new:true})
        if(!updatedPurity) return res.status(404).send('Purity not found')
        res.status(200).json(updatedPurity)
    } catch (error) {
        res.status(500).json(error)
    }
}
