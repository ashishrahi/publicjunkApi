const Kunda = require('../../models/variantModel/Kunda.model')

//------------------create a new Kunda

exports.createKundas = async(req,res)=>{
const {kunda}= req.body;
try {
    const newKunda = new Kunda({kunda:kunda})
    const savedKunda = await newKunda.save()
    res.status(200).json(savedKunda)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Kunda')
   }}

//---------------- get Kundas

 exports.getKundas = async(req,res)=>{
    try {
        const kunda = await Kunda.find().sort({createdAt:-1})
        res.status(200).json(kunda)
    } catch (error) {
        res.status(500).json(error)
    }}


   exports.getIdbyKundas = async(req,res)=>{
    try {
        const kunda = await Kunda.findById(req.params.id)
        if(!kunda) return res.status(404).send('Kunda not found')
        res.status(200).json(kunda)
        } 
    catch (error) {
        res.status(500).json(error)
        }}
   






//------------------------- KundaStatus

exports.getKundasStatus = async(req,res)=>{
        try {
            const kundaStatus = await Kunda.findByIdAndUpdate(req.params.id)
            kundaStatus.status = !kundaStatus.status
            await kundaStatus.save()
            res.status(200).json(kundaStatus)
            } 
        catch (error)
           {
            res.status(500).json(error)
           }}


//-------------------Update Kundas

exports.updateKundas = async(req,res)=>{
    const {kunda}= req.body;
    try {
        const updatedKunda = await Kunda.findByIdAndUpdate(req.params.id, {kunda:kunda}, {new: true})
        if(!updatedKunda) return res.status(404).send('Kunda not found')
        res.status(200).json(updatedKunda)
        } 
    catch (error) {
        res.status(500).json(error)
        }}
