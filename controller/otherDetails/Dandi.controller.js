const Dandi = require('../../models/variantModel/Dandi.model')

//------------- create a new Dandi

exports.createDandis = async(req,res)=>{
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

//----------------------Get Dandis 

 exports.getDandis = async(req,res)=>{
    try {
        const dandis = await Dandi.find().sort({createdAt:-1})
        res.status(200).json(dandis)
    } catch (error) {
        res.status(500).json(error)
    }}

//---------------- Get by Dandiid

exports.getByIdDandis=async(req,res)=>{
    try {
        const dandi = await Dandi.findById(req.params.id)
        if(!dandi) return res.status(404).send('Dandi not found')
        res.status(200).json(dandi)
    } catch (error) {
        res.status(500).json(error)
    }
}

 //-----------------change DandiStatus
 exports.getDandisStatus = async(req,res)=>{
    try {
        const dandiStatus = await Dandi.findByIdAndUpdate(req.params.id)
        if(!dandiStatus) return res.status(404).send('Dandi not found')
            dandiStatus.status = !dandiStatus.status
        await dandiStatus.save()
        res.status(200).json(dandiStatus)
        } 
    catch (error) {
        res.status(500).json(error)
    }}

//---------------------- update Dandi
    exports.updateDandis = async(req,res)=>{
        const {updatedandi}= req.body;
        try {
            const updatedDandi = await Dandi.findByIdAndUpdate(req.params.id,{$set:{dandi:updatedandi}},{new:true})
            if(!updatedDandi) return res.status(404).send('Dandi not found')
            res.status(200).json(updatedDandi)
            }
        catch (error) {
            res.status(500).json(error)
        }
    }


    