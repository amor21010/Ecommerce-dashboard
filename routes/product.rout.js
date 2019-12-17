const express=require("express");
const router =express.Router();
const multer=require('multer');
const storge=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./public/image/products')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
const upload =multer({storage:storge});


const productController=require ("../controllers/product.controller");

router.get("/test",productController.test);

router.get("/:id/api",productController.product_details);
router.get("/:id/api/dash",productController.product_details_dash);
router.get("/api/dash",productController.allproducts_dash);
router.get("/api/",productController.allproducts);
router.get("/api/home",productController.allproductsHome);
router.post("/create/api",upload.single("photo"),productController.product_creat);
router.patch("/:id/patch/api",productController.product_update);
router.patch("/:id/patch/api/dash",productController.product_update_dash);
router.put("/:id/update/api",productController.product_update);
router.delete("/:id/delete/api",productController.product_delete);

router.get("/category/api/:category",productController.category);



//router.get("/",productController.sendpage);




module.exports=router;