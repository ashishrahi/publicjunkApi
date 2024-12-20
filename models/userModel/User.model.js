const {mongoose} = require('mongoose');

//--------- Address Schema

// const addressSchema = new mongoose.Schema({
//     house:{ 
//       type:String},
//     city: {
//       type:String},
//     country:{
//       type:String
//     },
//   });

//----------- User Schema

 const UserSchema = new mongoose.Schema({
 
  username:{
        type:String,
        uppercase:true,
          },
email:{
        type:String,
      },

// password:{
//           type:String,

//          },

phone:{
       type:String,
      },
house:{ 
         type:String
      },
pincode:{
  type:String,
      
},
city: {
        type:String
      },
country:{
        type:String
        },


// address:{
//     type:[addressSchema],
//         },

// resetPasswordToken:{
//         type:String,
//       },
    
// resetPasswordExpires:{
//     type:Date,
//     },

// token:{
//     type:String,
//     },

// tokenExpiresAt:{
//         type:Date,
//     },
status:{
    type:Boolean,
    default:'true',
}
    
},
    {timestamps:true})



 

const User = mongoose.model('User', UserSchema);
 module.exports = User;
