
const Country = require('../../models/countryModel/country.model')
const State = require('../../models/stateModel/state.model')
const City = require('../../models/cityModel/city.model')
const Pincode = require('../../models/pincodeModel/pincode.model')


//////////////////////////  Create a new Pincode ////////////////////////////////////
    exports.createPincode= async(req,res)=>{
    
    const {countryname ,statename,cityname,pincode } = req.body;
    console.log(req.body)

    try{
    const findCountry = await Country.findOne({countryname: countryname})
    const countryId = findCountry._id;

    // StateId
    const findState = await State.findOne({statename: statename})
    const stateId = findState._id;
    // CityId
    const findCity = await City.findOne({cityname: cityname})
    const cityId = findCity._id;
    
    // New New Pincode
    const newpincode = new Pincode({ pincode:pincode,city:cityId, country:countryId,state:stateId });
    await newpincode.save();
    res.status(201).json(newpincode);
     } 
    catch (error) {
        res.status(500).json({ message: error.message });
        }}


        
////////////////////////// Get Pincode ////////////////////////////////////

    exports.getPincode= async(req,res)=>{
    
    try{
         const pincodelist = await Pincode.find({}).populate('country').populate('state').populate('city')
        res.json(pincodelist)
        }
    catch (error) 
       {
        res.status(500).json({ message: error.message });
        }}