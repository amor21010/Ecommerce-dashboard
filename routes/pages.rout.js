const express=require("express");
const router =express.Router();
const token=require("../controllers/Token.controller")

router.get("/product/",token.tokenGen,(req,res)=>{
    console.log(req.userData);
    
    res.sendFile(appRoot+'/public/product.html')
});
router.get("/product/:id",token.tokenGen,(req,res)=>{
    console.log(req.header.authorization);
    res.sendFile(appRoot+'/public/product_info.html')
});

router.get("/user/:id",token.tokenGen,(req,res)=>{
    console.log(req.header.authorization);
    res.sendFile(appRoot+'/public/castumer_info.html')
});
router.get("/user/",token.tokenGen,(req,res)=>{
    console.log(req.header.authorization);
    res.sendFile(appRoot+'/public/castumer.html')
});

router.get("/order/",token.tokenGen,(req,res)=>{
    console.log(req.header.authorization);
    res.sendFile(appRoot+'/public/order.html')
});
router.get("/order/:id",token.tokenGen,(req,res)=>{
    console.log(req.header.authorization);
    res.sendFile(appRoot+'/public/order_info.html')
});
router.get("/home/",token.tokenGen,(req,res)=>{
    console.log(req.headers);
    res.sendFile(appRoot+'/public/home.html')
});
router.get("/",(req,res)=>{
    res.sendFile(appRoot+'/public/loggin.html')
});
router.get("/emp",token.tokenGen,(req,res)=>{
    res.sendFile(appRoot+'/public/profile.html')
});
router.get("/emp/:id",token.tokenGen,(req,res)=>{
    res.sendFile(appRoot+'/public/profile.html')
});




module.exports=router;
