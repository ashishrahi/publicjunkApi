const Sidebar = require("../../models/sidebarModel/sidebar.model.js");

////////////////////////////////// Create Sidebars  //////////////////////////////////////////////


    exports.createSidebars = async(req,res)=>{
        try {
       
         // Create a new sidebar
            const newSidebar = new Sidebar({...req.body})
            await newSidebar.save()
            res.status(200).json({
                success:true,
                message:'Sidebar has been created successfully!',
                newSidebar:newSidebar
            })
            }
         catch (error) {
            res.status(500).json(error)
            }
        
        }
     
         
////////////////////////////////// Read Sidebar  //////////////////////////////////////////////

exports.getSidebarById = async (req, res) => {
    try {
        const eachsidebar = await Sidebar.findById(req.params.id)
        if(!eachsidebar) return res.status(404).send('Sidebar not found')
        res.status(200).json({
            message:'Details Of Sidebar !',
            data:eachcategory})
    } catch (error) {
        res.status(500).json(error)
    }
};

////////////////////////////////// Update Sidebar  //////////////////////////////////////////////


exports.updateSidebar = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set:{...req.body}}, {new: true})
        if(!updatedCategory) return res.status(404).send('Category not found')
        res.status(200).json({
            message:'Sidebar has been updated successfully',
            data:updatedCategory})
        } 
   catch (error) {
        res.status(500).json(error)
    }};


////////////////////////////////// All Sidebars  //////////////////////////////////////////////

        
        exports.getSidebars = async (req, res) => {
        try {
        const allSidebars = await Sidebar.find({}).sort({createdAt: -1})
        res.status(200).json({
            message:'List of Sidebars',
            data:allSidebars});
         } 
        catch (error) {
        console.error('Error fetching sidebars:', error);
        res.status(500).json({ error: error.message });
    }
};

////////////////////////////////// Sidebars Status  //////////////////////////////////////////////


exports.updateSidebarStatus = async(req,res)=>{
    try {
        const statusSidebar = await Sidebar.findByIdAndUpdate(req.params.id)
        if(!statusSidebar) return res.status(404).send('Sidebar not found')
            statusSidebar.status = !statusSidebar.status
        await statusSidebar.save()
        res.status(200).json({
            message:'Status has been updated successfully',
            data:statusCategory})
    } catch (error) {
        res.status(500).json(error)
    }}

////////////////////////////////// Active Sidebar Status  //////////////////////////////////////////////


exports.activeSidebarStatus = async(req,res)=>{
    try {
        const activeSidebar = await Sidebar.find({status:true})
        if(!activeSidebar) return res.status(404).send('Sidebar not found')
        res.status(200).json({
        message:'Status Of Sidebar has been updated',
        data:activeSidebar})
    } catch (error) {
        res.status(500).json(error)
    }
}

////////////////////////////////// InActive Sidebar Status  //////////////////////////////////////////////


exports.inactiveSidebarStatus = async(req,res)=>{
    try {
        const inactiveSidebars = await Sidebar.find({status:false})
        if(!inactiveSidebars) return res.status(404).send('Sidebar not found')
        res.status(200).json({
        message:'List Of Inactive Sidebars!',
        data:inactiveSidebars
     })
    } catch (error) {
        res.status(500).json(error)
    }
}
