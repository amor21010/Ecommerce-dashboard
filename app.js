var http = require("http");
var mongodb = require("mongodb");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan=require('morgan');
var path = require('path');

const product = require("./routes/product.rout");
const user = require("./routes/user.rout");
const category = require('./routes/category.router');
const order = require("./routes/order.rout");
const emp=require('./routes/emp.rout');
const methodoverride=require('method-override')
const page = require("./routes/pages.rout");

const app = express();

global.appRoot = path.resolve(__dirname);

let port = 8088;
let dbUrl = 'mongodb://localhost:27017/e-pharm';
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//db connection

mongoose.connect(dbUrl, { useNewUrlParser: true, useFindAndModify: false ,useUnifiedTopology: true});
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use((req,res,next)=>{
  
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Authorization");
    if(req.method==='OPTIONS'){
       
    res.header("Access-Control-Allow-Methods","patch,POST,delete,get");
    return res.status(200).json({});
    }
    next();
    })

//base folders And urls routers

app.use(methodoverride('_method'))
app.use("/product/", product);
app.use("/user", user);
app.use("/order", order)
app.use("/emp", emp)
app.use("/category", category)
app.use(page)

app.use("/product/public/", express.static('./public'))
app.use("/category/public/", express.static('./public'))
app.use("/user/public/", express.static('./public'))
app.use("/product/", express.static('./public'))
app.use("/order/",express.static('./public'))
app.use("/user/",express.static('./public'))
app.use("/emp/",express.static('./public'))
app.use("/",express.static('./public'))


app.listen(port, () => {
    console.log("srvr is running " + port);
});

