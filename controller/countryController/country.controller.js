
const Country = require('../../models/countryModel/country.model')


////////////////////////////////// Create Country  //////////////////////////////////////////////

exports.createCountry = async (req, res) => {
    const { countryname } = req.body;
    console.log(req.body);
  
    try {
  
      const existingCountry = await Country.findOne({ countryname });
      console.log(existingCountry);
      if (existingCountry) {
        return res.status(400).json({ message: "Country already exists in database" });
      }
  
      const newCountry = new Country({ countryname });
      await newCountry.save();
  
      res.status(201).json(newCountry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
////////////////////////////////// getCountrybyId  //////////////////////////////////////////////

  exports.getByIdCountry = async(req,res)=>{
    try{
        const detailcountry = await Country.findById(req.params.id)
        if(!detailcountry) return res.status(404).json({ message: "Country not found" });
        res.json(detailcountry)
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
  
  }



////////////////////////////////// Read All Country  //////////////////////////////////////////////

exports.getCountry = async (req, res) => {
    try {
  
      const countriesList = await Country.find({}).sort({ createdAt: -1 });
      res.status(200).json(countriesList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

////////////////////////////////// Update  Country  //////////////////////////////////////////////


        exports.updateCountry= async(req,res)=>{
            const { countryname } = req.body;
            console.log(req.body)
            try {
                const updatedCountry = await Country.findByIdAndUpdate(req.params.id,{$set:{ countryname: countryname }}, { new: true });
                res.json(updatedCountry);
            } catch (error) {
                res.status(404).json({ message: "Country not found" });
            }
        }

////////////////////////////////// update Status Country  //////////////////////////////////////////////
       
exports.updateStatusCountry = async(req,res)=>{
  try {
      const statusCountry = await Country.findByIdAndUpdate(req.params.id)
      if(!statusCountry) return res.status(404).send('Country not found')
        statusCountry.status = !statusCountry.status
      await statusCountry.save()
      res.status(200).json(statusCountry)
  } catch (error) {
      res.status(500).json(error)
  }}