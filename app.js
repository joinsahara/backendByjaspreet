const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const productRoutes = require('./api/routes/product')
const historyRoutes = require('./api/routes/history')
const vendorRoutes = require('./api/routes/vendor')
const userRoutes = require('./api/routes/user')
const searchRoutes = require('./axios')



mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox-s5rkh.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we are connected")
});

app.use(morgan('dev')); // middleware to connect with database
app.use(bodyParser.urlencoded({extended: false}));// body parser is used to parse the requests from body
app.use(bodyParser.json());

app.use(('/product',productRoutes));
app.use(('/history',historyRoutes));
app.use(('/vendor',vendorRoutes));
app.use(('/user',userRoutes));
app.use(('/search',searchRoutes));





app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404  ;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})



module.exports = app;
