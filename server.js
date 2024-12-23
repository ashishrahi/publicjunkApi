const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// const { checkHealthStatus } = require('./services/healthService');
// const {connectRabbitMQ} = require('./config/rabbit.config');
const uid  = require('tiny-uid');
const protect = require('./middleware/route.protect')

//--------------Imported components
const sidebarRoute = require('./routes/sidebarRoute/sidebar.route')
const adminRoute = require('./routes/adminRoute/admin.route');
const usersRoute = require('./routes/usersRoute/users.route');
const driverRoute = require('./routes/driverRoute/Driver.route');
const venderRoute = require('./routes/venderRoute/vender.route');
const categoryRoute = require('./routes/categoryRoute/category.route');
const subcategoryRoute = require('./routes/subcategoryRoute/subcategory.route');
const productRoute = require('./routes/productRoute/product.route');
const orderRoute = require('./routes/orderRoute/order.route');
const aboutRoute = require('./routes/aboutRoute/about.route');
const policyRoute = require('./routes/policyRoute/policy.route');
const bannerRoute = require('./routes/bannerRoute/banner.route');
const countryRoute = require('./routes/countryRoute/country.route');
const stateRoute = require('./routes/stateRoute/state.route');
const cityRoute = require('./routes/cityRoute/city.route');
const pincodeRoute = require('./routes/pincodeRoute/pincode.route');
const warehouseRoute = require('./routes/warehouseRoute/warehouse.route');
const financeDepartRoute = require('./routes/financeDepartRoute/financeDepart.route');
const contactusRoute = require('./routes/contactusRoute/contactus.route')
const dashboardRoute = require('./routes/dashboardRoute/dashboard.route')
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

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // Limit each IP to 1000 requests per windowMs
});

//------------------Imported middleware
const connectDB = require('./config/mongodb.config');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//----------------------- Database Config -------------------------------------
connectDB(); 

// Configuration
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get('/healthCheck', checkHealthStatus);

// RabbitMQ connection
// connectRabbitMQ().then(() => {
//   console.log('Connected to RabbitMQ');
// }).catch(err => {
//   console.error('Error connecting to RabbitMQ:', err);
// });

//------------------------ Middleware Utilities -----------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use((req,res,next)=>{
  req.logId = uid(7);
  next()
})

//------------------------------- Routes  ----------------------------------------------
// app.use(protect)
app.use('/api/admin',adminRoute); 
app.use('/api/sidebars',sidebarRoute);
app.use('/api/countries',countryRoute);
app.use('/api/states',stateRoute);
app.use('/api/cities', cityRoute);
app.use('/api/pincodes',pincodeRoute);
app.use('/api/users',usersRoute);
app.use('/api/categories',categoryRoute);
app.use('/api/subcategories',subcategoryRoute);
app.use('/api/products',productRoute);  
app.use('/api/orders',orderRoute);
app.use('/api/venders',venderRoute);
app.use('/api/warehouses',warehouseRoute);
app.use('/api/financedeparts',financeDepartRoute);
app.use('/api/drivers',protect, driverRoute);
app.use('/api/abouts', aboutRoute);
app.use('/api/policies', policyRoute);
app.use('/api/banners',bannerRoute);
app.use('/api/contacts',contactusRoute)
app.use('/api/dashboard',dashboardRoute);

//---------------------------- Error Handling  ---------------------------------
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack: err.stack,
    });
});
