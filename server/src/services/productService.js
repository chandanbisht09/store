const { equal } = require("joi");
const prisma = require("../config/prisma.js");

const getProducts = async (data) => {
    const where = {isEnabled: true};
    if (data.search) {
      where.OR = [
        {
          title: {
            contains: data.search
          }
        },
        {
          description: {
            contains: data.search
          }
        },
        {
          material: {
            contains: data.search
          }
        },
         {
          style: {
            contains: data.search
          }
        }
      ];
    }
    if (data.category) {
      where.AND = [
        {
          categoryId : parseInt(data.category)
        }
      ]
    }
   if (data.minPrice || data.maxPrice) {
    where.price = {};
    if (data.minPrice) {
      where.price.gte = parseInt(data.minPrice);
    }
    if (data.maxPrice) {
      where.price.lte = parseInt(data.maxPrice);
    }
  }
    let orderBy = {id: 'desc'};
    if(data.sort && (data.sort === 'price_asc' || data.sort === 'price_desc')){
      let order = (data.sort).split('_')
      orderBy = {price : order[1]}
    }
    console.log(orderBy)
    const page = Number(data.page || 1);
    const pageSize = Number(data.pageSize || 20);
    console.log(where)
    return prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy
    });
};
const createProduct = async(data) => {
    return prisma.product.create({
        data
    })
};
const getProductById = async(data) => {
    return prisma.product.findFirstOrThrow({ where : {
        id : data['id']
    }        
    })
};
const deleteProduct = async (id ,data) => {
  return prisma.product.delete(
    {
      where: { id: parseInt(id) },
    }
  )
};
const updateProduct = async (id ,data) => {
  console.log(data)
  return prisma.product.update(
    {
      where: { id: parseInt(id) },
      data: data,
    }
  )
};
const inventoryHistory = async (id) => {
  return prisma.inventoryTransaction.findMany({
  where: {
    productId: Number(id)
  },
  orderBy: {
    createdAt: "desc"
  }
});
};
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  inventoryHistory
};