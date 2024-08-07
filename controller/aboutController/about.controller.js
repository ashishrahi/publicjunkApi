const About = require('../../models/aboutModel/about.model')

//createAbout

//--------------- Create About

exports.createAbout=async(req,res)=>{
    const {title,description}=req.body;
    try {
        const newAbout = new About({
            title:title,
            description:description,
        })
        const savedAbout = await newAbout.save()
        res.status(200).json(savedAbout)
    } catch (error) {
        res.status(500).json({message:error.message})
    }}

//-----------------------Get About

    exports.getAbout = async(req,res)=>{
        try {
            const about = await About.find().sort({createdAt:-1})
            res.status(200).json(about)
        } catch (error) {
            res.status(500).json({message:error.message})
        }}

//---------------- get By Id About

exports.getbyIdAbout = async(req,res)=>{
    try {
        const about = await About.findById(req.params.id)
        if(!about) return res.status(404).json({message: 'About not found'})
        res.status(200).json(about)
       } catch (error) {
        res.status(500).json({message:error.message})
       }
       }

//-----------------------Update About

        exports.updateAbout = async(req,res)=>{
            const {title, description} = req.body;
            console.log(req.body)
            try {
                const updatedabout = await About.findByIdAndUpdate(req.params.id, {title:title, description:description}, {new: true})
                if(!updatedabout) return res.status(404).json({message: 'About not found'})
                res.status(200).json(updatedabout)
            } catch (error) {
                res.status(500).json({message: error.message})
            }}



//---------------------- Delete About

        exports.deleteAbout = async(req,res)=>{
            try {
                const about = await About.findByIdAndDelete(req.params.id)
                if(!about) return res.status(404).json({message: 'About not found'})
                    res.status(200).json({message: 'About deleted'})
               } catch (error) {
                res.status(500).json({message: error.message})
                }}