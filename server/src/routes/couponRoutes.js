const express = require("express");
const router = express.Router();

const {auth,allowRoles} = require("../middleware/auth")
const couponController =  require('../controllers/couponController');

//admin endpoints
router.post("/",auth,allowRoles("ADMIN"), couponController.addCoupon);
router.post("/:couponId/users",auth,allowRoles("CUSTOMER"), couponController.assignCouponToUsers);



module.exports = router;