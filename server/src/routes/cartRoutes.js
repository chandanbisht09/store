const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController')
const {auth,allowRoles} = require('../middleware/auth')

router.post("/",auth,allowRoles('ADMIN'),cartController.createCart);
router.get("/",auth,allowRoles('ADMIN'),cartController.getCart);
router.delete("/",auth,allowRoles('ADMIN'),cartController.clearCart);
router.patch("/:id",auth,allowRoles('ADMIN'),cartController.updateItem);

router.delete("/:id",auth,allowRoles('ADMIN'),cartController.deleteItem);



module.exports = router;