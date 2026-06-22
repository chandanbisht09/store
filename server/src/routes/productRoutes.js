const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);

router.post("/", productController.createProduct); 

router.get("/:id", productController.getProduct); 
router.post("/:id", productController.updateProduct); 

router.delete("/:id", productController.deleteProduct); 

module.exports = router;