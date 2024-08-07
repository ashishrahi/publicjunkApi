const Color = require('../../models/variantModel/Color.model')

//////////////////// create a new color //////////////////////

exports.createColors = async(req,res)=>{
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

//-------------------------- getColor


exports.getColor= async(req,res)=>{
    const{id}= req.params;
    try {
        const singlecolor = await Color.findById(id)
        res.status(200).json(singlecolor)
    } catch (error) {
        res.status(500).send('Error finding color')

        
    }
}

///////////////// Get Colors ////////////////////////////////////////////////

 exports.getColors = async(req,res)=>{
    try {
        const colors = await Color.find().sort({createdAt:-1})
        res.status(200).json(colors)
    } catch (error) {
        res.status(500).json(error)
    }
}

///////////////////////// delete Color //////////////////////////////////////////
 
exports.deleteColors = async(req,res)=>{
    console.log(req.params);
    try {
        const color = await Color.findByIdAndDelete(req.params.id)
        if(!color) return res.status(404).send('Color not found')
        res.status(200).send('Color deleted')
    } catch (error) {
        res.status(500).json(error)
    }
}

////////////////////////////// Update Color//////////////////////////////

exports.updateColor = async (req, res) => {
   const{color}= req.body
    
try {
        const updatedcolor = await Color.findByIdAndUpdate(req.params.id,{ $set:{color:color} },);
        console.log(updatedcolor)

        if (!updatedcolor) {
            return res.status(404).send('Color not found');
        }
        res.status(200).json(updatedcolor);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


//------------ Update Category Status

exports.updateColorStatus= async(req,res)=>{
    try {
        const updatedColor= await Color.findByIdAndUpdate(req.params.id)
        if(!updatedColor) return res.status(404).send('Color not found')
            updatedColor.status = !updatedColor.status
        await updatedColor.save()
        res.status(200).json(updatedColor)
        } catch (error) {
        res.status(500).json(error)
        }}




