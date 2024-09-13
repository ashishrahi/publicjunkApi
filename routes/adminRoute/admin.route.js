const express = require('express');
const router = express.Router();
const {signupAdmin,signinAdmin,signoutAdmin}= require('../../controller/adminController/admin.controller')
    

//signup
router.post('/signup',signupAdmin)

router.post('/signin',signinAdmin)

router.post('/signout',signoutAdmin)






module.exports = router;
