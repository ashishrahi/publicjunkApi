
const Country = require('../../models/countryModel/country.model')
const State = require('../../models/stateModel/state.model')
const City = require('../../models/cityModel/city.model')



////////////////////////////////// Create City  //////////////////////////////////////////////

    exports.createCity= async(req,res)=>{
    const {countryname ,statename,cityname } = req.body;
    try{
   
   // Country Id
    const findCountry = await Country.findOne({countryname: countryname})
    const countryId = findCountry._id;
  // State Validation
    const findState = await State.findOne({statename: statename})
    const stateId = findState._id;

    // Create Id
        const newcity = new City({cityname:cityname, country:countryId,state:stateId });
        await newcity.save();
        res.status(201).json(newcity);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
        }}

    
   ////////////////////////////////// Read All Cities  //////////////////////////////////////////////

    exports.getCity= async(req,res)=>{
        try{
            const citylist = await City.find().populate('state')
             res.json(citylist)
            }
        catch (error)
           {
            res.status(500).json({ message: error.message });
           }}