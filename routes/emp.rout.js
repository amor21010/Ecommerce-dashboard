const express=require("express");
const router =express.Router();

const empController=require('../controllers/emp.conroller');
const token=require("../controllers/Token.controller")


router.get("/:id/all/api",empController.allEmp);
router.get("/admins/api",empController.admins);
router.get("/dlvry/api",empController.delivery);
router.get("/:id/api",empController.details);
router.get("/api",empController.details);
router.post("/create/api",empController.create);
router.post("/loggin/api",empController.loggin);
router.get  ("/logout",empController.logout);
router.patch("/create/api",empController.patch);
router.delete("/:id/remove/api",empController.remove);

module.exports=router;

