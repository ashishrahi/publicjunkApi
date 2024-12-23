
const State = require('../../models/stateModel/state.model')
const Country = require('../../models/countryModel/country.model')


/////////////////////////  Create a new State  ////////////////////////////////////////////
    exports.createState= async(req,res)=>{
        try{
            const { statename,countryname } = req.body;
         // Country Validation
        const findCountry = await Country.findOne({countryname: countryname})
        console.log(findCountry)
        const countryId = findCountry._id;
        const newstate = new State({ statename, country:countryId });
        await newstate.save();
        res.status(201).json({
            message:'New State has been Created successfully',
            data:newstate});
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
        }}


   ////////////////////////////  Get By Id States  ////////////////////////////////////////////   

exports.getStateById = async(req,res)=>{
            try{
            const state = await State.findById(req.params.id).populate('country')
            res.json({
                message:'Details of State',
                data:state})
            }catch (error) {
                res.status(500).json({ message: error.message });
            }}
        


   ////////////////////////////  Get All States  ////////////////////////////////////////////   
    
   exports.getState= async(req,res)=>{
        try{
        const allstate = await State.find({}).populate('country')
        const formattedStates = allstate.map(state => ({
            _id: state._id,
            statename: state.statename,
            countryname: state.country?.countryname,
            status: state.status, 
            createAt:state.createdAt
            }));
        res.json(formattedStates)
        }catch (error) {
            res.status(500).json({ message: error.message });
        }}


   ////////////////////////////  Status of States  ////////////////////////////////////////////   

   exports.getStatusState = async(req,res)=>{
    try {
        const statusState = await State.findByIdAndUpdate(req.params.id)
        if(!statusState) return res.status(404).send('State not found')
            statusState.status = !statusState.status
        await statusState.save()
        res.status(200).json({
            message:'Status of State has been updated successfully',
            data:statusState})
    } catch (error) {
        res.status(500).json(error)
    }}

   ////////////////////////////  update of States  ////////////////////////////////////////////   

    exports.updateState = async(req,res)=>{
        try{
            const { statename, countryname } = req.body;
            const findCountry = await Country.findOne({countryname})

        const countryId = findCountry._id;
        const state = await State.findByIdAndUpdate(req.params.id, {$set:{country:countryId,statename:statename}}, { new: true })
        res.json({
            message:'State has been updated successfully',
            data:state})
        }catch (error) {
            res.status(500).json({ message: error.message });
        }}
    