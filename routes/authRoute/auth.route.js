const express = require('express');
const router = express.Router();
const {registerAdmin,loginAdmin,logoutAdmin}= require('../../controller/authController/Auth.controller')
    
//Register
router.post('/register',registerAdmin)

//Login
router.post('/login',loginAdmin)

//Logout
router.post('/logout',logoutAdmin)






module.exports = router;
