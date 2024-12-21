const Vender = require('../../models/venderModel/vender.model')
    
//------------------Registration of Vender ------------------

exports.registerVender = async(req,res)=>{
    try {
        const registerVender = await new Vender({...req.body})
        const savedVender = await registerVender.save()
        res.status(200).send({
            message:'List of Vender has been Created successfully!',
            data:savedVender})} 
    catch (error) 
        {
        res.status(500).json(error)
        }
        
}
    
// --------------------- All Venders ----------------------------------------------------

exports.getVenders = async(req,res)=>{
    try {
        const allVenders = await Vender.find({}).sort({createdAt: -1})
        res.status(200).json({
            message:'List of Venders',
            data:allVenders})
        } 
    catch (error) {
        res.status(500).json(error)
    }}
   
      //--------------- update Vender Status
      
      exports.updateVenderStatus = async(req,res)=>{
            try {
                const statusVender = await Vender.findByIdAndUpdate(req.params.id)
                if(!statusVender) return res.status(404).send('Vender not found')
                    statusVender.status = !statusVender.status
                await statusVender.save()
                res.status(200).json({
                    message:'Status of Vender has been updated successfully',
                    data:statusVender})
            } catch (error) {
                res.status(500).json(error)
            }}

//------------------------------ Active Vender Status 
            
            // exports.activeKarigarStatus=async(req,res)=>{
            //     try {
            //         const activeKarigar = await Karigar.find({status:true})
            //         if(!activeKarigar) return res.status(404).send('Karigar not found')
            //         res.status(200).json({
            //          message:'List of Active Venders', 
            //          data:activeKarigar})
            //     } catch (error) {
            //         res.status(500).json(error)
            //     }
            // }


//------------------------------ In Active Vender Status 



        //    exports.inactiveKarigarStatus=async(req,res)=>{
        //     try {
        //         const inactiveKarigar = await Karigar.find({status:false})
        //         res.status(200).json({
        //          message:'list of Inactive Venders',
        //         data:inactiveKarigar})
        //     } catch (error) {
        //         res.status(500).json(error)
        //     }
        //    }
    






