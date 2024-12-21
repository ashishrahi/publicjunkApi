
const Country = require('../../models/countryModel/country.model')
const redis = require('../../config/redis.config')


////////////////////////////////// Create Country  //////////////////////////////////////////////
exports.createCountry = async (req, res) => {
  try {
    const existingCountry = await Country.findOne({ countryname });
    if (existingCountry) {
      return res.status(400).json({ message: "Country already exists in database" });
    }
    const newCountry = new Country({ countryname });
    await newCountry.save();
    // Invalidate cache when a new country is added
    redis.del('countries');
    res.status(201).json({
      message: 'Country added successfully!!',
      data:newCountry
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////// List of countries  //////////////////////////////////////////////

exports.listCountries = async (req, res) => {
  try {
    // Log message indicating function execution
    console.log('Checking Redis connection and fetching countries...');

    // Try to fetch the countries list from Redis
    redis.get('countries', async (err, countries) => {
      if (err) {
        // If there's an error with Redis, log it
        console.error('Error fetching from Redis:', err);
      }

      if (countries) {
        // If found in Redis, log the data and return cached data
        console.log('Data found in Redis:', countries);
        return res.status(200).json(JSON.parse(countries));
      }

      // If not in Redis, fetch from MongoDB
      console.log('Data not found in Redis. Fetching from MongoDB...');
      const Listcountries = await Country.find({});
      const countryNames = Listcountries.map(country => country.countryname);

      // Cache the result in Redis
      redis.set('countries', JSON.stringify(countryNames), 'EX', 3600, (err) => {
        if (err) {
          console.error('Error setting data to Redis:', err);
        } else {
          console.log('Data cached in Redis for 1 hour.');
        }
      });

      // Respond with data from MongoDB
      res.status(200).json({ 
        message: 'Countries Fetched Successfully!',
        data: countryNames });
    });
  } catch (error) {
    // Log the error if something goes wrong
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};



////////////////////////////////// getCountrybyId  //////////////////////////////////////////////

exports.getByIdCountry = async (req, res) => {
  try {
    const countryId = req.params.id;

    // Check if the country is cached in Redis
    redis.get(`country:${countryId}`, async (err, cachedCountry) => {
      if (cachedCountry) {
        return res.status(200).json(JSON.parse(cachedCountry));
      }

      // If not cached, fetch from the database
      const detailcountry = await Country.findById(countryId);
      if (!detailcountry) return res.status(404).json({ message: "Country not found" });

      // Cache the fetched country
      redis.set(`country:${countryId}`, JSON.stringify(detailcountry), 'EX', 3600);

      res.json({
        message:'Details Of Country',
        data:detailcountry});
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




////////////////////////////////// Read All Country  //////////////////////////////////////////////

exports.getCountry = async (req, res) => {
    try {
  
      const countriesList = await Country.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        message:'List of Countries',
        data:countriesList});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

////////////////////////////////// Update  Country  //////////////////////////////////////////////


        exports.updateCountry= async(req,res)=>{
            try {
                const { countryname } = req.body;
                const updatedCountry = await Country.findByIdAndUpdate(req.params.id,{$set:{ countryname: countryname }}, { new: true });
                res.json({
                  message: 'Country Updated Successfully!',
                  data:updatedCountry});
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
      res.status(200).json({
        message:'Status Of Country Updated Successfully',
        data:statusCountry})
  } catch (error) {
      res.status(500).json(error)
  }}