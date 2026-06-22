const productService = require("../services/productService");

const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};

const createProduct = async (req, res) => {
   
    const product = await productService.createProduct(req.body)
    res.json(product);
};
const getProduct = async (req, res) => {
    const product = await productService.getProduct(req.params.id)
    res.json(product);
};

const deleteProduct = async(req, res) => {
  const response = await productService.deleteProduct(req.params.id);
  res.json(response)
};
const updateProduct = async(req, res) => {
  const response = await productService.updateProduct(req.params.id,req.body);
  res.json(response)
};
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
};