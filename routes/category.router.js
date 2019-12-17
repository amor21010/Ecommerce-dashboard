
const express=require("express");
const router =express.Router();
const multer=require('multer');
const storge=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./public/image/category/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});

const upload =multer({storage:storge});
const categoryController=require ('../controllers/category.controler');

router.get("/api/",categoryController.allcategory);
router.post("/create/api/",upload.single("icon"),categoryController.create);
router.delete("/:id/remove/api/",categoryController.remove);


module.exports=router;