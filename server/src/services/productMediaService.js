const prisma = require("../config/prisma.mjs");

const saveProductMedia = async (data) => {
    return prisma.default.productMedia.create({data});
};
module.exports = {
    saveProductMedia
}