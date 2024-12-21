const About = require('../../models/aboutModel/about.model')


////////////////////////////////// Create About //////////////////////////////////////////////


    exports.createAbout=async(req,res)=>{
        try {
          const {title,description}=req.body;
    
      // Title Validation
      const findTitle = About.findOne({title:title})
      if(findTitle) return res.status(400).json({message: 'Title already exists'})
    
        // Description Validation
        const findDescription = About.findOne({description:description})
      if(findDescription) return res.status(400).json({message: 'Description already exists'})
       if(!description) return res.status(400).json({message: 'Description is required'})
       
      
        const newAbout = new About({
            title:title,
            description:description,
        })
        const savedAbout = await newAbout.save()
        res.status(200).json({
            message:'Abount Has been created!',
            data:savedAbout})
    } catch (error) {
        res.status(500).json({message:error.message})
    }}



///////////////////////////// getAbout ///////////////////////////



    exports.getAbout = async(req,res)=>{
        try {
            const about = await About.find().sort({createdAt:-1})
            res.status(200).json({
                message:'Details of About',
                data:about})
        } catch (error) {
            res.status(500).json({message:error.message})
        }}

///////////////////////////// get By Id About ///////////////////////////


exports.getbyIdAbout = async(req,res)=>{
    try {
        const about = await About.findById(req.params.id)
        if(!about) return res.status(404).json({message: 'About not found'})
        res.status(200).json({
            message:'Details of About',
            data:about})
       } catch (error) {
        res.status(500).json({message:error.message})
       }
       }

////////////////////////////////// Update About //////////////////////////////////////////////

        exports.updateAbout = async(req,res)=>{
            try {
            const {title, description} = req.body;
            console.log(req.body)
          
                const updatedabout = await About.findByIdAndUpdate(req.params.id, {title:title, description:description}, {new: true})
                if(!updatedabout) return res.status(404).json({message: 'About not found'})
                res.status(200).json({
                    message:'About Details has been updated successfully', 
                    data:updatedabout})
            } catch (error) {
                res.status(500).json({message: error.message})
            }}



////////////////////////////////// Delete About //////////////////////////////////////////////



        exports.deleteAbout = async(req,res)=>{
            try {
                const about = await About.findByIdAndDelete(req.params.id)
                if(!about) return res.status(404).json({message: 'About not found'})
                    res.status(200).json({message: 'About deleted'})
               } catch (error) {
                res.status(500).json({message: error.message})
                }}