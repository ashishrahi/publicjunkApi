    const Karigar = require('../../models/karigarModel/karigar.model')
    const multer = require('multer')
    const upload = require('../../middleware/multer.middleware')
    const cloudinary = require('../../config/cloudinary.config')

//------------------Registration of Karigar ------------------

exports.registerKarigar = async(req,res)=>{
    try {
        if (!req.body.values) {
            return res.status(400).json({ message: "No values provided in the request body" });
        }
        
        const data = JSON.parse(req.body.values);

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log(req.file);
        console.log(data);

        const result = await cloudinary.uploader.upload(req.file.path);

        const newKarigar = new Karigar({ ...data, avatar: result.secure_url });
        await newKarigar.save();

        res.status(200).send(newKarigar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }}

    
    
// --------------------- All Karigar ----------------------------------------------------

exports.getKarigars = async(req,res)=>{
    try {
        const allKarigars = await Karigar.find({}).sort({createdAt: -1})
        res.status(200).json(allKarigars)
        } 
    catch (error) {
        res.status(500).json(error)
    }}
   

//-------------------------- Karigar with product 



//--------------------------- Karigar_Details

    exports.getbyIdKarigar = async(req,res)=>{
        try {
            const KarigarbyId = await Karigar.findById(req.params.id)
        if(!KarigarbyId) return res.status(404).send('Karigar not found')
        res.status(200).json(KarigarbyId)
        } catch (error) {
            res.status(500).json(error)
        }}


//--------------- update Karigar Status

        exports.updateKarigarStatus = async(req,res)=>{
            try {
                const statusKarigar = await Karigar.findByIdAndUpdate(req.params.id)
                if(!statusKarigar) return res.status(404).send('Karigar not found')
                    statusKarigar.status = !statusKarigar.status
                await statusKarigar.save()
                res.status(200).json(statusKarigar)
            } catch (error) {
                res.status(500).json(error)
            }}

//-------------- Active Karigar Status

                exports.activeKarigarStatus=async(req,res)=>{
                try {
                    const activeKarigar = await Karigar.find({status:true})
                    if(!activeKarigar) return res.status(404).send('Karigar not found')
                    res.status(200).json(activeKarigar)
                } catch (error) {
                    res.status(500).json(error)
                }
            }

//-------------- Active Karigar Status


           exports.inactiveKarigarStatus=async(req,res)=>{
            try {
                const inactiveKarigar = await Karigar.find({status:false})
                res.status(200).json(inactiveKarigar)
            } catch (error) {
                res.status(500).json(error)
            }}

//--------------------------Update KarigarDetails
    
        exports.updateKarigarDetails = async (req, res) => {
            
            const updatedData = JSON.parse(req.body.values)
              try {
                const result = await cloudinary.uploader.upload(req.file.path);
                const updatedKarigar = await Karigar.findByIdAndUpdate(req.params.id,{$set:{...updatedData,avatar:result.secure_url}})
                res.status(200).json(updatedKarigar)
                 } 
              catch (error) {
                res.status(500).json(error)
                }
               };

//Assigned Karigar
exports.getAssignedKarigar = async (req, res) => {
    try {
        const assignedKarigar = await Karigar.findByIdAndUpdate(req.params.id, {$set:{assignedTo: req.body.assignedTo}}, {new: true})
        if(!assignedKarigar) return res.status(404).send('Karigar not found')
        res.status(200).json(assignedKarigar)
    } catch (error) {
        res.status(500).json(error)
    }
}


    






