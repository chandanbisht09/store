const prisma = require("../config/prisma.mjs");

const getCategories = async () => {
    return prisma.default.category.findMany();
};

const createCategory = async (data) => {
  return prisma.default.category.create({
    data
  });
};
const getCategory = async (id) => {
  return prisma.default.category.findFirstOrThrow({
    where : {
        'id' : parseInt(id)
    }
  });
};

const updateCategory = async (id ,data) => {
  return prisma.default.category.update(
    {
      where: { id: parseInt(id) },
      data: data,
    }
  )
};

const deleteCategory = async (id ,data) => {
  return prisma.default.category.delete(
    {
      where: { id: parseInt(id) },
    }
  )
};

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
};