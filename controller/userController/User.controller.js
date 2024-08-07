const User = require('../../models/userModel/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = require('../../middleware/multer.middleware')
const cloudinary = require('../../config/cloudinary.config')

       //-------------------- signUp User

    exports.signupUser = async(req,res)=>{
    console.log(req.body)
    const {username, email, password, phone, house, city,country}= req.body;
    try {
        //--------- existing User
        
        
        //----------- image Validation
        const image1 = cloudinary.uploader.upload(req.file.path)
        
        //-------------- Password hashing
         
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
          
        //................... User Created
         
        const user = new User({
           ...req.body,password:hashedPassword,avatar:image1.secure_url
        })
        const result = await user.save()
        res.status(201).json(result)}
    
        catch (error) {
        res.status(500).json({error:error.message})
        }}

//---------------- login User
exports.loginUser=async(req,res)=>{
    const {email, password}= req.body;
    try {
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
    
    catch (error) {
        res.status(500).json({error:error.message})
    }
    
}



//----------------------------All Users 


    exports.allUsers = async(req,res)=>{
        try {
            const users = await User.find().select('-password').sort({createdAt:-1})
            res.status(200).json(users)
        }
        catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    ///////////// User_Details //////////////////
    
    exports.profileUser= async(req,res)=>{
        try {
            const profile = await User.findById(req.params.id).select('-password')
            res.status(200).json(profile)
        } catch (error) {
            res.status(500).json(error)
       }}

  //--------------------- Delete User
  exports.deletedUser=async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }}

    //--------------------- activeUsers
   
    exports.activeUsers=async(req,res)=>{
        try {
            const activeusers = await User.find({status:true})
            res.status(200).json(activeusers)
        } catch (error) {
            res.status(500).json(error)
        }}

 //-------------------- InactiveUsers--------------------

        exports.inactiveUsers=async(req,res)=>{
            try {
                const inactiveusers = await User.find({status:false})
                res.status(200).json(inactiveusers)
            } catch (error) {
                res.status(500).json(error)
            }}

//---------------- Update Status
    exports.updateStatus = async(req,res)=>{
    try {
        const userStatus = await User.findByIdAndUpdate(req.params.id, {new: true})
        userStatus.status =!userStatus.status
        await userStatus.save()
        res.status(200).json(userStatus)
    } catch (error) {
        res.status(500).json(error)
    }}

    //---------------- Check User
    exports.checkUser = async(req,res)=>{
        try {
            const user = await User.findOne({phone: req.body.phone})
            res.status(200).json({message:"User already exists"})
        } catch (error) {
            res.status(500).json(error)
        }}

//----------------------- Counter Users
exports.countUsers = async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      res.status(200).json(userCount);
         } 
    catch (error) {
      console.error("Error counting users:", error);
      res.status(500).json({ error: "An error occurred while counting users" });
     }};
  
        
