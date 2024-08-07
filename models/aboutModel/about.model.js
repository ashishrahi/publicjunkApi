const {mongoose} = require('mongoose');

 const aboutSchema = new mongoose.Schema({
  
    title:{
        type:String,
    },
    description:{
        type:String,
    }, 
    
},
    {timestamps:true})





const About = mongoose.model('about', aboutSchema);
 module.exports = About;
