const express = require('express')

//parsing incoming request
const bodyParser = require('body-parser');

//import routing
const authRoute = require('./routes/authRoute/auth.route')
const usersRoute = require('./routes/usersRoute/users.route')
const subscriptionRoute = require('./routes/subscriptionRoute/subscription.route')
const colorRoute = require('./routes/otherdetailsRoute/color.route')
const dandiRoute = require('./routes/otherdetailsRoute/Dandi.route')
const gaugesizeRoute = require('./routes/otherdetailsRoute/Gaugesize.route')
const gendersRoute = require('./routes/otherdetailsRoute/Gender.route')
const kundaRoute = require('./routes/otherdetailsRoute/Kunda.route')
const purityRoute = require('./routes/otherdetailsRoute/Purity.route')
const sizenRoute = require('./routes/otherdetailsRoute/Size.route')
const weightRoute = require('./routes/otherdetailsRoute/Weight.route')
const karigarRoute = require('./routes/karigarRoute/Karigar.route')
const categoryRoute = require('./routes/categoryRoute/category.route')

// crypt the data
const bcrypt = require('bcryptjs');

// handling cookies
const cookieParser = require('cookie-parser');

//uploading images using multer library
const multer = require('multer')

//configuration
const app = express();
const port = process.env.PORT||5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//frontend connect with backend
var cors = require('cors') 
const path = require('path');
//for enviornment file
require('dotenv').config();


//middleware utilities
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//middleware of routes
 app.use('/api/auth',authRoute);
 app.use('/api/users',usersRoute);
 app.use('/api/categories',categoryRoute)
 app.use('/api/colors',colorRoute)
 app.use('/api/subscriptions',subscriptionRoute)
 app.use('/api/dandis',dandiRoute)
 app.use('/api/gaugesizes',gaugesizeRoute)
 app.use('/api/genders',gendersRoute)
 app.use('/api/kundas',kundaRoute)
 app.use('/api/purities',purityRoute)
 app.use('/api/sizes',sizenRoute)
 app.use('/api/weights',weightRoute)
 app.use('/api/karigars',karigarRoute)


 app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(500).json({
        success:false,
        message:errorMessage,
        status:errorStatus,
        stack:err.stack,

    });
})
