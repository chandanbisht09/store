const prisma = require("../config/prisma.mjs");

const saveMedia = async (data) => {
    return prisma.default.media.create({data});
};

module.exports = {
    saveMedia
}
