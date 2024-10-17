const express = require('express')
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const {checkHealthStatus} = require('./services/healthService')

//--------------Imported components 
const adminRoute = require('./routes/adminRoute/admin.route')
const usersRoute = require('./routes/usersRoute/users.route')
const driverRoute = require('./routes/driverRoute/Driver.route')
const venderRoute = require('./routes/venderRoute/vender.route')
const categoryRoute =require('./routes/categoryRoute/category.route')
const subcategoryRoute =require('./routes/subcategoryRoute/subcategory.route')
const productRoute =require('./routes/productRoute/product.route')
const orderRoute = require('./routes/orderRoute/order.route')
const aboutRoute = require('./routes/aboutRoute/about.route')
const policyRoute = require('./routes/policyRoute/policy.route')
const bannerRoute = require('./routes/bannerRoute/banner.route')
const countryRoute = require('./routes/countryRoute/country.route')
const stateRoute = require('./routes/stateRoute/state.route')
const cityRoute = require('./routes/cityRoute/city.route')
const pincodeRoute = require('./routes/pincodeRoute/pincode.route')
const warehouseRoute = require('./routes/warehouseRoute/warehouse.route')
const financeDepartRoute = require('./routes/financeDepartRoute/financeDepart.route')

// Kafka routes
const { connectProducer: connectOrderProducer } = require('./services/producer/orderProducer');
const { connectProducer: connectInventoryProducer } = require('./services/producer/inventoryProducer');
const { connectConsumer: connectOrderConsumer } = require('./services/consumer/orderConsumer');
const { connectConsumer: connectInventoryConsumer } = require('./services/consumer/inventoryConsumer');

// Start producers and consumers
// connectOrderProducer();
// connectInventoryProducer();
// connectOrderConsumer();
// connectInventoryConsumer();

//rate limitter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});



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
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/healthCheck',checkHealthStatus)

// RabbitMq


//------------------------ middleware utilities -----------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(limiter);
app.use(helmet());
//------------------------------- Routes  ----------------------------------------------

app.use('/api/admin',adminRoute);
app.use('/api/countries',countryRoute);
app.use('/api/states',stateRoute);
app.use('/api/cities',cityRoute);
app.use('/api/pincodes',pincodeRoute);
 app.use('/api/users',usersRoute);
 app.use('/api/categories',categoryRoute)
 app.use('/api/subcategories',subcategoryRoute)
 app.use('/api/products',productRoute)  
 app.use('/api/orders',orderRoute)
 app.use('/api/venders',venderRoute)
 app.use('/api/warehouses',warehouseRoute)
 app.use('/api/financedeparts', financeDepartRoute)
 app.use('/api/drivers',driverRoute)
 app.use('/api/abouts',aboutRoute)
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
