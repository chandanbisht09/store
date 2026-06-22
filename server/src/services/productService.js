const prisma = require("../config/prisma.mjs");

const getProducts = async () => {
    return prisma.default.product.findMany();
};
const createProduct = async(data) => {
     console.log(Object.keys(prisma.default));
    return prisma.default.product.create({
        data
    })
};
const getProduct = async(id) => {
    return prisma.default.product.findFirstOrThrow({ where : {
        id : parseInt(id)
    }        
    })
};
const deleteProduct = async (id ,data) => {
  return prisma.default.product.delete(
    {
      where: { id: parseInt(id) },
    }
  )
};
const updateProduct = async (id ,data) => {
  return prisma.default.product.update(
    {
      where: { id: parseInt(id) },
      data: data,
    }
  )
};
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
};