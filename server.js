const express = require('express')
const bodyParser = require('body-parser');

//--------------Imported components 

const authRoute = require('./routes/authRoute/auth.route')
const usersRoute = require('./routes/usersRoute/users.route')
const karigarRoute = require('./routes/karigarRoute/Karigar.route')
const venderRoute = require('./routes/venderRoute/vender.route')
const colorRoute = require('./routes/otherdetailsRoute/color.route')
const dandiRoute = require('./routes/otherdetailsRoute/Dandi.route')
const gaugesizeRoute = require('./routes/otherdetailsRoute/Gaugesize.route')
const gendersRoute = require('./routes/otherdetailsRoute/Gender.route')
const kundaRoute = require('./routes/otherdetailsRoute/Kunda.route')
const purityRoute = require('./routes/otherdetailsRoute/Purity.route')
const sizeRoute = require('./routes/otherdetailsRoute/Size.route')
const weightRoute = require('./routes/otherdetailsRoute/Weight.route')
const categoryRoute = require('./routes/categoryRoute/category.route')
const orderRoute = require('./routes/orderRoute/order.route')
const aboutRoute = require('./routes/aboutRoute/about.route')
const policyRoute = require('./routes/policyRoute/policy.route')
const bannerRoute = require('./routes/bannerRoute/banner.route')



//------------------Imported middleware

const connectDB = require('./config/mongodb.config')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const multer = require('multer')
var cors = require('cors') 
const path = require('path');
require('dotenv').config();


//----------------------- Database Config -------------------------------------


connectDB(); 
//configuration
const app = express();
const port = process.env.PORT||5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//------------------------ middleware utilities -----------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//------------------------------- Routes  ----------------------------------------------

 app.use('/api/auth',authRoute);
 app.use('/api/users',usersRoute);
 app.use('/api/venders',venderRoute)
 app.use('/api/karigars',karigarRoute)
 app.use('/api/categories',categoryRoute)
 app.use('/api/colors',colorRoute)
 app.use('/api/dandis',dandiRoute)
 app.use('/api/gaugesizes',gaugesizeRoute)
 app.use('/api/genders',gendersRoute)
 app.use('/api/kundas',kundaRoute)
 app.use('/api/purities',purityRoute)
 app.use('/api/sizes',sizeRoute)
 app.use('/api/weights',weightRoute)
 app.use('/api/abouts',aboutRoute)
 app.use('/api/orders',orderRoute)
 app.use('/api/policies',policyRoute)
 app.use('/api/banners',bannerRoute)



//---------------------------- Error  ---------------------------------

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(500).json({
        success:false,
        message:errorMessage,
        status:errorStatus,
        stack:err.stack,
       });})
