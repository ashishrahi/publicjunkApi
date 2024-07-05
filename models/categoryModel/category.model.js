const {mongoose} = require('mongoose');
const Gender = require('../../models/otherdetailsModel/Gender.model')
const Purity = require('../../models/otherdetailsModel/Purity.model')
const Dandi = require('../../models/otherdetailsModel/Dandi.model')
const Color = require('../../models/otherdetailsModel/Color.model')
const Kunda = require('../../models/otherdetailsModel/Kunda.model')
const Size = require('../../models/otherdetailsModel/Size.model')
const Weight = require('../../models/otherdetailsModel/Weight.model')
const GaugeSize = require('../../models/otherdetailsModel/Gaugesize.model')



 const categorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
    },
    karigar:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Karigar',
    },
    karigarId:{
        type:String,
    },
  
    gender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Gender',
    },
    genderId:{
        type:String,
    },
    
    
    purity:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purity',
    },
    purityId:{
        type:String,
    },
    
    dandi:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dandi',
    },
    dandiId:{
        type:String,
    },
  
    color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Color',
    },
    colorId:{
        type:String,
    },
    
    kunda:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Kunda',
    },
    kundaId:{
        type:String,
    },
    
    size:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Size',
    },
    sizeId:{
        type:String,
    },
   

    gaugesize:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GaugeSize',
    },
    gaugesizeId:{
        type:String,
    },
   
    weight:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Weight',
    },
    weightId:{
        type:String,
    },
     
},
    {timestamps:true})


const Category = mongoose.model('Category', categorySchema);


 module.exports = Category;
