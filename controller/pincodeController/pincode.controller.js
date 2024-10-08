const Country = require("../../models/countryModel/country.model");
const State = require("../../models/stateModel/state.model");
const City = require("../../models/cityModel/city.model");
const Pincode = require('../../models/pincodeModel/pincode.model')

////////////////////////////////// Create Pincode  //////////////////////////////////////////////

exports.createPincode = async (req, res) => {
  const { countryname, statename, cityname,pincode } = req.body;
  try {
    // Country Id
    const findCountry = await Country.findOne({ countryname: countryname });
    const countryId = findCountry._id;

    // State Id
    const findState = await State.findOne({ statename: statename });
    const stateId = findState._id;
    // City Id
    const findCity = await City.findOne({ cityname: cityname });
    const cityId = findCity._id;

    // Create Id
    const newpincode= new Pincode({
      country: countryId,
      state: stateId,
      cityname: cityId,
      pincode:pincode

    });
    console.log(newpincode);
    await newpincode.save();
    res.status(201).json(newpincode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////// Read All pincodes  //////////////////////////////////////////////

exports.getPincodeById = async (req, res) => {
  try {
    const detailpincode = await Pincode.findById(req.params.id);
    if (!detailpincode) return res.status(404).json({ message: "Pincode not found" });
    res.json(detailpincode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////// Read All Cities  //////////////////////////////////////////////

exports.getPincodes = async (req, res) => {
    try{
        const allpincode = await Pincode.find({}).populate('state').populate('country')
        const formattedPincodes = allpincode.map(pincode => ({
             _id: pincode._id,
             countryname: pincode.country?.countryname,
             statename: pincode.state.statename,
                cityname:pincode.cityname,
             status: pincode.status, 
             createAt:pincode.createdAt

         }));
        
        res.json(formattedPincodes)
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
};

////////////////////////////////// Status Pincodes  //////////////////////////////////////////////

exports.getstatusPincode = async (req, res) => {
    console.log(req.params.id)
  try {
    const statusPincode = await Pincode.findByIdAndUpdate(req.params.id);
    if (!statusPincode) return res.status(404).send("Pincode not found");
    statusPincode.status = !statusPincode.status;
    await statusPincode.save();
    res.status(200).json(statusPincode);
  } catch (error) {
    res.status(500).json(error);
  }
};

////////////////////////////////// Update Pincodes  //////////////////////////////////////////////

exports.updatePincode = async(req,res)=>{
    const { statename, countryname, cityname,pincode } = req.body;
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

    // cityId
const findCity = await City.findOne({cityname})
const cityId = findCity._id;

    const updatedpincode = await Pincode.findByIdAndUpdate(req.params.id, {$set:{country:countryId,state:stateId,cityname:cityId,pincode:pincode}}, { new: true })
    res.json(updatedpincode)
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}