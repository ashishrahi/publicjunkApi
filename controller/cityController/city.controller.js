const Country = require("../../models/countryModel/country.model");
const State = require("../../models/stateModel/state.model");
const City = require("../../models/cityModel/city.model");

////////////////////////////////// Create City  //////////////////////////////////////////////

exports.createCity = async (req, res) => {
  const { countryname, statename, cityname } = req.body;
  try {
    // Country Id
    const findCountry = await Country.findOne({ countryname: countryname });
    const countryId = findCountry._id;
    // State Validation
    const findState = await State.findOne({ statename: statename });
    const stateId = findState._id;

    // Create Id
    const newcity = new City({
      cityname: cityname,
      country: countryId,
      state: stateId,
    });
    await newcity.save();
    res.status(201).json(newcity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////// Read All Cities  //////////////////////////////////////////////

exports.getCityById = async (req, res) => {
  try {
    const detailcity = await City.findById(req.params.id);
    if (!detailcity) return res.status(404).json({ message: "City not found" });
    res.json(detailcity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////// Read All Cities  //////////////////////////////////////////////

exports.getCities = async (req, res) => {
    try{
        const allcity = await City.find({}).populate('state').populate('country')
        const formattedStates = allcity.map(city => ({
             _id: city._id,
             countryname: city.country?.countryname,
             statename: city.state.statename,
                cityname:city.cityname,
             status: city.status, 
             createAt:city.createdAt

         }));
        
        res.json(formattedStates)
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
};

////////////////////////////////// Status Cities  //////////////////////////////////////////////

exports.getstatusCity = async (req, res) => {
    console.log(req.params.id)
  try {
    const statusCity = await City.findByIdAndUpdate(req.params.id);
    if (!statusCity) return res.status(404).send("City not found");
    statusCity.status = !statusCity.status;
    await statusCity.save();
    res.status(200).json(statusCity);
  } catch (error) {
    res.status(500).json(error);
  }
};

////////////////////////////////// Update Cities  //////////////////////////////////////////////

exports.updateCity = async(req,res)=>{
    const { statename, countryname, cityname } = req.body;
    console.log(req.body)
    try{
    // countryId
    const findCountry = await Country.findOne({countryname})
    const countryId = findCountry._id;
    console.log(countryId)

    
    // stateId
    const findState = await State.findOne({statename})
    const stateId = findState._id;
    console.log(stateId)


    const updatedcity = await City.findByIdAndUpdate(req.params.id, {$set:{country:countryId,state:stateId,cityname:cityname}}, { new: true })
    res.json(updatedcity)
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}