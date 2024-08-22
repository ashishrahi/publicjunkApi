const KarigarOrder = require('../../controller/karigarController/karigar.controller')

exports.updateStatus = async(req,res)=>{
    try {
        const statusKarigar = await KarigarOrder.findByIdAndUpdate(req.params.id,{$set:{statuskarigar:req.body}})
        await statusKarigar.save()
        res.status(200).json(statusKarigar)
        }
    catch (error) {
        res.status(500).json(error)
        }}