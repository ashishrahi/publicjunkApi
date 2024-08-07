const Gaugesize = require('../../models/variantModel/Gaugesize.model')

//-------------------------- create a new Gaugesize 

exports.createGaugesize = async(req,res)=>{
 const {gaugesize}= req.body;
try {
    const newGaugesize = new Gaugesize({gaugesize:gaugesize,})
    const savedGaugesize = await newGaugesize.save()
    res.status(200).json(savedGaugesize)
    } 
catch (error) 
    {
    res.status(500).send('Error saving Gaugesize')
   }}


//----------------------------Get Gaugesize 

exports.getGaugesize = async(req,res)=>{
    try {
        const gaugesize = await Gaugesize.find().sort({createdAt:-1})
        res.status(200).json(gaugesize)
    } catch (error) {
        res.status(500).json(error)
    }}

    exports.getbyIdGaugesize = async(req,res)=>{
        const gaugesize = await Gaugesize.findById(req.params.id)
        if(!gaugesize) return res.status(404).json({message: 'Gaugesize not found'})
        res.status(200).json(gaugesize)
    }




 //------------------- GaugesSizeStatus      

exports.getGaugesizeStatus=async(req,res)=>{
    try {
        const gaugesizeStatus = await Gaugesize.findByIdAndUpdate(req.params.id)
        gaugesizeStatus.status = !gaugesizeStatus.status
        await gaugesizeStatus.save()
        res.status(200).json(gaugesizeStatus)
        } 
    catch (error) {
        res.status(500).json(error)
        }}


      // ................... update Gaugesize  
        exports.updateGaugesize = async(req,res)=>{
            const{gaugesize} = req.body
            console.log(req.body)
            console.log(req.params)
            try {
                const updatedgaugesize = await Gaugesize.findByIdAndUpdate(req.params.id,{$set:{gaugesize:gaugesize}}, {new: true})
                res.status(200).json(updatedgaugesize)
            } catch (error) {
                res.status(500).json(error)
            }
        }

