const Admin = require('../../models/adminModel/Admin.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const tokenStore = new Set();
const generateToken = require('../../middleware/jwtrouteauth.middleware')


////////////////////////////////// Register  ////////////////////////////////////////////// exports.signupUser = async(req,res)=>{
  exports.signupAdmin = async(req,res)=>{
    const { username,email, password}= req.body;
    try {
        
        //-------------- Password hashing
         
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
          
        //................... User Created
         
        const newAdmin = new Admin({
           ...req.body,password:hashedPassword
        })
        const result = await newAdmin.save()
        res.status(201).json(result)}
    
        catch (error) {
        res.status(500).json({error:error.message})
        }}





////////////////////////////////// Login Admin //////////////////////////////////////////////

exports.signinAdmin=async(req,res)=>{
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const findAdmin = await Admin.findOne({ email });
    
    if (!findAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, findAdmin.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const tokenValue = jwt.sign(
      { id: findAdmin._id, email: findAdmin.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );


    // Save the token and expiration time in the database
    findAdmin.token = tokenValue;
    findAdmin.tokenExpiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour
    await findAdmin.save();

    // Return the admin details along with the token
    return res.status(200).json({
      admin: {
        email: findAdmin.email,
        token: tokenValue,
      },
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

////////////////////////////////// signout //////////////////////////////////////////////

    exports.signoutAdmin = async(req,res)=>{


      const token = req.headers['authorization'];
      if (token) {
          tokenStore.delete(token); // Remove token from store
          res.status(200).send('Logged out successfully');
      } else {
          res.status(400).send('No token provided');
      }
    }
     