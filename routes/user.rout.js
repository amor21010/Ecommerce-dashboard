const express = require("express");
const router = express.Router();
const multer = require('multer');
const storge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storge });

const usercontroller = require("../controllers/user.controller");

router.get("/api/test", usercontroller.test);
router.get("/api/", usercontroller.allusers);
router.get("/api/home", usercontroller.allusersHome);

router.get("/api/:id", usercontroller.user_details_android);
router.get("/:id/api/", usercontroller.user_details);

router.post("/api/create", upload.single("photo"), usercontroller.create);

router.post("/api/login", usercontroller.login)
router.patch("/api/:id/patch", upload.single("photo"), usercontroller.user_update);
router.patch("/api/:id/forget", usercontroller.forgetPass);
router.patch("/api/:id/patchImage", upload.single("photo"), usercontroller.user_update_Photo);
//router.put("/api/:id/update",upload.single("photo"),usercontroller.user_update);
router.delete("/api/:id/delete", usercontroller.deleteUser)



module.exports = router;