const express=require("express");
const router =express.Router();


const OrderController=require ("../controllers/Order.controller");

router.get("/test",OrderController.test);

router.get("/:id/api/",OrderController.order_details_android);
router.get("/history/:username/",OrderController.user_orders);
router.get("/:id/dash/api/",OrderController.order_details_dash);
router.get("/api/",OrderController.allorders);
router.get("/api/home",OrderController.allordersHome);
//router.get("/",OrderController.renderorders);
router.post("/api/create",OrderController.create);
//router.patch("/:id/patch",OrderController.order_update);
router.put("/:id/api/add",OrderController.addProduct);
router.patch("/:id/update/api/",OrderController.update);
router.patch("/:id/updateQ/api/",OrderController.updateQ);
router.patch("/:id/updateQ/and",OrderController.updateQ_and);
router.patch("/:id/api/remove/",OrderController.removeProduct);
//router.delete("/:id/delete",OrderController.order_delete);


module.exports=router;