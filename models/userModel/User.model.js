const {mongoose} = require('mongoose');

 const UserSchema = new mongoose.Schema({
  
username:{
        type:String,
          },
email:{
        type:String,
      },

password:{
          type:String,
         },

phone:{
       type:String,
      },
house:{
    type:String,
},
city:{
    type:String,
},
country:{
    type:String,
},
resetPasswordToken:{
        type:String,
      },
    
resetPasswordExpires:{
    type:Date,
    },

token:{
    type:String,
    },

tokenExpiresAt:{
        type:Date,
    },
    
},
    {timestamps:true})





const User = mongoose.model('User', UserSchema);
 module.exports = User;
