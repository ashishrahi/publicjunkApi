const Policy = require('../../models/policyModel/policy.model')

//------------------create Policy

exports.createPolicy= async(req,res)=>{
    const{title,description}= req.body;
try {
    const createPolicy = new Policy({
        title:title,
        description:description,
    })
    await createPolicy.save()
    res.status(201).json(createPolicy)
    } 
catch (error) {
    res.status(400).json({error: error.message})
}}

//------------------get all Policies

exports.getPolicy = async(req,res)=>{
    try {
        const getPolicy = await Policy.find({}).sort({createdAt:-1})
        res.status(200).json(getPolicy)
        } 
    catch (error) {
        res.status(400).json({error: error.message})
        }}


//------------------get Policy by ID
exports.getbyIdPolicy = async(req,res,nex)=>{
    try {
        const policyId = await Policy.findById(req.params.id)
        if (!policyId) return res.status(404).json({message: 'Policy not found'})
            res.status(200).json(policyId)
        } catch (error) {
        res.status(500).json({error: error.message})
        }}

    
    //------------------update Policy by ID
    exports.updatePolicyByID = async(req,res,next)=>{
        try {
            const policyId = await Policy.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if (!policyId) return res.status(404).json({message: 'Policy not found'})
                res.status(200).json(policyId)
            } catch (error) {
            res.status(500).json({error: error.message})
        }}


    //------------------delete Policy by ID
    exports.deletePolicyByID = async(req,res,next)=>{
        try {
            const policyId = await Policy.findByIdAndDelete(req.params.id)
            if (!policyId) return res.status(404).json({message: 'Policy not found'})
                res.status(200).json({message: 'Policy deleted'})
            } catch (error) {
            res.status(500).json({error: error.message})
        }}
 
       exports.updatePolicy = async(req,res)=>{
        try {
            const policyId = await Policy.findByIdAndUpdate(req.params.id, {$set:{...req.body}}, {new: true})
            if (!policyId) return res.status(404).json({message: 'Policy not found'})
                res.status(200).json(policyId)
            } catch (error) {
            res.status(500).json({error: error.message})
        }}
       