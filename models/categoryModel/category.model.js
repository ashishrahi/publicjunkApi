const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
  color:{
    type:String,
  },
  dandi:{
        type: String,
       },

  gaugesize:{
    type: String,
},
  gender:{
    type: String,
  },
  kunda:{
    type: String,
  },
  purity:{
    type: String,
},
  size:{
    type: String,
},
  weight:{
    type: String,

  },
  status:{
        type: Boolean,
        default: true,
      },
 
})

const categorySchema = new mongoose.Schema({
    
categoryname:{
        type:String,
             },
image:{
        type:String,
      },
status:{
        type: Boolean,
        default: true,
      },
      variantdetails:{
  type: detailSchema,

 }

})

const Category = mongoose.model('Category', categorySchema);


 module.exports = Category;