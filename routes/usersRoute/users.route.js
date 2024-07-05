const express = require('express')
const router = express.Router();
const User = require('../../models/userModel/User.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const multer = require('multer');
// const upload = require('../../middleware/multer.middleware')


const{loginUser,profileUser,getUsers,updateUser,deletedUser,signupUser,forgetPassword,resetPassword,checkUser} = require('../../controller/userController/User.controller')

//Signup a new User
router.post('/signup',signupUser)

//Login a User
router.post('/login',loginUser)

//Get a User
router.get('/:id',profileUser)

//Get Users
router.get('/',getUsers)

//Update a User
router.put('/:id',updateUser)

//Delete a User
router.delete('/:id',deletedUser)

//Forget Password User
router.post('/forget_password',forgetPassword)

//Reset Password User
router.post('/reset_password/:token',resetPassword)

//check User
router.post('/check_user',checkUser)

module.exports = router;
