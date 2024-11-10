const express = require('express')
const router = express.Router();
const User = require('../../models/userModel/User.model')

const{countUsers,loginUser,signupUser,allUsers,profileUser,deletedUser,activeUsers,inactiveUsers,updateStatus,checkUser} =

require('../../controller/userController/User.controller')



//Signup a new User
router.post('/signup',signupUser)

// //Login a User
router.post('/signin',loginUser)

// //Get a User
router.get('/:id',profileUser)

// //Get Users
router.get('/',allUsers)

// //Update a User
// router.put('/:id',updateUser)

//User Status

// //Delete a User
router.delete('/:id',deletedUser)

// //Forget Password User
// router.post('/forget_password',forgetPassword)

// //Reset Password User
// router.post('/reset_password/:token',resetPassword)

//Update Status
router.put('/:id/status',updateStatus)

// //Active Users
router.get('/status/true',activeUsers)

// //Inactive Users
router.get('/status/false',inactiveUsers)

// //check User
router.post('/check_user',checkUser)

// Count Users
router.post('/count', countUsers)


module.exports = router;
