const User = require('../../models/userModel/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const redis = require('../../config/redis.config')
const {redisOperations,redisClient} = require('../../utilities/redisHelper')
const {hashPassword} = require('../../utilities/hashPassoword')
const {emailValidator} = require('../../utilities/emailValidation')
const {comparePasswords} = require('../../utilities/comparePassword')

const REDIS_KEY = 'users';
const REDIS_CACHE = 3600;


//////////////////////////// signUp User ////////////////////////////////////////////////////

/* The `exports.signupUser` function is responsible for handling the signup process for a new user.
Here's a breakdown of what it does: */
exports.signupUser = async (req, res) => {

    try{
   const { username,phone,pincode,email, password,city,country}= req.body;
    //username already exists
    const user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).json({ message: "User already exists" }); 
        const newUser =  new User({...req.body});
        const result = await newUser.save();
         return res.status(201).json({
            message: 'User Created successfully',
            data:result});
       } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    try{
        const newUser =  new User({...req.body});
        const result = await newUser.save();
         return res.status(201).json(result);
       } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }};

 //////////////////////////////////  login User  //////////////////////////////////////////////////////////////////

exports.loginUser = async(req,res)=>{
        try {
            const {email, password}= req.body;
            const auser = await User.findOne({email})
        if(!auser) return res.status(404).json({message:"User not found"})
        
        const isMatch = comparePasswords(password,auser.password)
        if(!isMatch) return res.status(401).json({message:"Invalid credentials"})
        
            const tokenValue = jwt.sign({email:auser.email},process.env.JWT_KEY,{expiresIn:'1h'});
            auser.token = tokenValue;
            auser.tokenExpiresAt = new Date(Date.now()+3600000) 
            await auser.save();
            res.status(200).json({
                message:'Login has been successfully !',
                user:{
                username:auser.username,
                email:auser.email,
                token:auser.token,
                }})}
              catch (error) {
             res.status(500).json({error:error.message})
    }}

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
            return res.json({
                data: resultFromRedis
            });
        }

        // If no data in Redis, fetch from the database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        // Set the fetched data into Redis for future requests
        await redisOperations.setData(REDIS_KEY, users, REDIS_CACHE);

        // Return the users from the database
        return res.status(200).json({
            message: 'List of Users!',
            data: users
        });
    } catch (error) {
        // Handle any errors
        console.error('Error in allUsers controller:', error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Create the new user in the database
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Fetch the updated user list from the database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        // Update Redis cache with the new user list
        await redisOperations.setData(REDIS_KEY, users, REDIS_CACHE);

        // Return the newly created user along with the updated list
        return res.status(201).json({
            message: 'User created successfully!',
            newUser,
            data: users
        });
    } catch (error) {
        // Handle any errors
        console.error('Error in createUser controller:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
};

    /////////////     User_Details //////////////////
    
    exports.profileUser = async (req, res) => {
        try {
        const userId = req.params.id;
        const cacheKey = `${REDIS_KEY}:${userId}`;    
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
            res.status(200).json({
                message:'Details of User !',
                data:profile});
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    };
    

  ///////////////////////////  Delete User  ////////////////////////////////////////////////
  exports.deletedUser=async(req,res)=>{
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }}

/////////////////////////////////// activeUsers /////////////////////////////////////////////////
   
    exports.activeUsers=async(req,res)=>{
        try {
            const activeusers = await User.find({status:true})
            res.status(200).json({
                message:'List of Active Users',
                data:activeusers})
        } catch (error) {
            res.status(500).json(error)
        }}

 ////////////////////////////// InactiveUsers ////////////////////////////////////////////////////

        exports.inactiveUsers=async(req,res)=>{
            try {
                const inactiveusers = await User.find({status:false})
                res.status(200).json({
                    message:'List of Inactive Users',
                    data:inactiveusers})
            } catch (error) {
                res.status(500).json(error)
            }}

///////////////////////////////  Update Status  /////////////////////////////////////////////
    exports.updateStatus = async(req,res)=>{
    try {
        const userStatus = await User.findByIdAndUpdate(req.params.id, {new: true})
        userStatus.status =!userStatus.status
        await userStatus.save()
        res.status(200).json({
            message:'Status has been updated successfully',
            data:userStatus})
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
      res.status(200).json({
        message:'User has been counted successfully', 
        data:userCount});
         } 
    catch (error) {
      console.error("Error counting users:", error);
      res.status(500).json({ error: "An error occurred while counting users" });
     }
    };
  
        
////////////////////////////////  UpdateUser     ///////////////////////////////////////////////////////////////////

exports.updateUser = async (req, res) => {
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            message:'User has been updated successfully',
            data:updatedUser})
    } catch (error) {
        res.status(500).json(error)
    }}