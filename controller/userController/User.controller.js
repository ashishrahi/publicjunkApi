const User = require('../../models/userModel/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const redis = require('../../config/redis.config')
const {redisOperations,redisClient} = require('../../utilities/redisHelper')
const REDIS_KEY = 'users';
const REDIS_CACHE = 3600;


//////////////////////////// signUp User ////////////////////////////////////////////////////

    exports.signupUser = async(req,res)=>{
    const {username, email, password, phone, house, city,country}= req.body;
    console.log(req.body)
    try {
 // Password hashing   
         
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
          
// User Created
         
        const alluser = new User({
           ...req.body,password:hashedPassword
        })
        const result = await alluser.save()
        res.status(201).json(result)}
    
        catch (error) {
        res.status(500).json({error:error.message})
        }}

//////////////////////////////////  login User  //////////////////////////////////////////////////////////////////

exports.loginUser = async(req,res)=>{
    const {email, password,status}= req.body;
    
    try {
        if(status == 'true'){
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({message:"User not found"})
        
        const isMatch = bcrypt.compareSync(password,user.password)
        if(!isMatch) return res.status(401).json({message:"Invalid credentials"})
        
            const tokenValue = jwt.sign({email:user.email},process.env.JWT_KEY,{expiresIn:'1h'});
            user.token = tokenValue;
            user.tokenExpiresAt = new Date(Date.now()+3600000) 
            await user.save();
            res.status(200).json({user:{
                username:user.username,
                email:user.email,
                token:user.token,
                }})}
                else{
                    return res.status(403).json({message:"Access denied"})
                }}
    
    catch (error) {
        res.status(500).json({error:error.message})
    }
    
}



////////////////////////////////// All Users //////////////////////////////////////////////////


exports.allUsers = async (req, res) => {
    try {
        // Health check for Redis connection
        const redisPing = await redisClient.ping();
        if (redisPing !== 'PONG') {
            console.error('Redis is not reachable.');
            return res.status(500).json({ error: 'Redis is not reachable.' });
        }

        // Attempt to get data from Redis
        const resultFromRedis = await redisOperations.getData(REDIS_KEY);

        if (resultFromRedis) {
            // If data is found in Redis, return it
            return res.json(resultFromRedis);
        }

        // If no data in Redis, fetch from the database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        // Set the fetched data into Redis for future requests
        await redisOperations.setData(REDIS_KEY, users, REDIS_CACHE);

        // Return the users from the database
        res.status(200).json(users);
    } catch (error) {
        // Handle any errors
        console.error('Error in allUsers controller:', error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};

    /////////////     User_Details //////////////////
    
    exports.profileUser = async (req, res) => {
        const userId = req.params.id;
        const cacheKey = `${REDIS_KEY}:${userId}`;
    
        try {
            // Check if the user data is available in Redis cache
            const cachedUser = await redisClient.get(cacheKey);
            if (cachedUser) {
                // If cached data exists, parse it and return the response
                return res.status(200).json(JSON.parse(cachedUser));
            }
    
            // If not in cache, retrieve the user data from MongoDB
            const profile = await User.findById(userId).select('-password');
            if (!profile) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Store the retrieved user data in Redis cache
            await redisClient.setex(cacheKey, REDIS_CACHE, JSON.stringify(profile));
    
            // Send the response with the user profile
            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    };
    

  ///////////////////////////  Delete User  ////////////////////////////////////////////////
  exports.deletedUser=async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }}

/////////////////////////////////// activeUsers /////////////////////////////////////////////////
   
    exports.activeUsers=async(req,res)=>{
        try {
            const activeusers = await User.find({status:true})
            res.status(200).json(activeusers)
        } catch (error) {
            res.status(500).json(error)
        }}

 ////////////////////////////// InactiveUsers ////////////////////////////////////////////////////

        exports.inactiveUsers=async(req,res)=>{
            try {
                const inactiveusers = await User.find({status:false})
                res.status(200).json(inactiveusers)
            } catch (error) {
                res.status(500).json(error)
            }}

///////////////////////////////  Update Status  /////////////////////////////////////////////
    exports.updateStatus = async(req,res)=>{
    try {
        const userStatus = await User.findByIdAndUpdate(req.params.id, {new: true})
        userStatus.status =!userStatus.status
        await userStatus.save()
        res.status(200).json(userStatus)
    } catch (error) {
        res.status(500).json(error)
    }}

///////////////////////////// Check User ////////////////////////////////////////////////////////////////
    exports.checkUser = async(req,res)=>{
        try {
            const user = await User.findOne({phone: req.body.phone})
            res.status(200).json({message:"User already exists"})
        } catch (error) {
            res.status(500).json(error)
        }}

//////////////////////////////////  Counter Users  //////////////////////////////////////////////////////////////////
exports.countUsers = async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      res.status(200).json(userCount);
         } 
    catch (error) {
      console.error("Error counting users:", error);
      res.status(500).json({ error: "An error occurred while counting users" });
     }};
  
        
