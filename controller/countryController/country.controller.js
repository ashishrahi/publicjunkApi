
const Country = require('../../models/countryModel/country.model')


////////////////////////////////// Create Country  //////////////////////////////////////////////

exports.createCountry= async(req,res)=>{
    const { countryname } = req.body;
    console.log(req.body)
    
    // Check if the country already exists
  
    try {   
        const newname = new Country({countryname:countryname});
        await newname.save();
        res.status(201).json(newname);
        } 
    catch (error) {
        res.status(500).json({ message: error.message });
        }}

////////////////////////////////// Read All Country  //////////////////////////////////////////////

        exports.getCountry=async(req,res)=>{
        try {
            const countrieslist = await Country.find({}).sort({ createdAt:-1 });
            res.status(200).json(countrieslist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }}