
const State = require('../../models/stateModel/state.model')
const Country = require('../../models/countryModel/country.model')


//  Create a new State
    exports.createState= async(req,res)=>{
    
    const { statename,countryname } = req.body;
    try{
   
   // Country Validation
    const findCountry = await Country.findOne({countryname: countryname})
    
        const countryId = findCountry._id;
        const newstate = new State({ statename, country:countryId });
        await newstate.save();
        res.status(201).json(newstate);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
        }}

      
    exports.getState= async(req,res)=>{
        try{
        const state = await State.find({}).populate('country')
        res.json(state)
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
      
    }