const prisma = require("../config/prisma.js");
const AppError = require("../utils/appError.js");

const addCoupon = async (coupon) => {
    return await prisma.$transaction(async (tx) => {
        const isCodeDuplicate = await tx.coupon.findUnique({
            where : {
                code : coupon.code
            }
        })
        if (!isCodeDuplicate) {
            return await tx.coupon.create({
                data : coupon
        })
        }
    });
};
const assignCouponToUsers = async (couponId, userIds) => {

    couponId = Number(couponId);

    return await prisma.$transaction(async (tx) => {

        const coupon = await tx.coupon.findUnique({
            where: {
                id: couponId
            }
        });

        if (!coupon) {
            throw new AppError("Coupon not found.", 404);
        }

        const users = await tx.user.findMany({
            where: {
                id: {
                    in: userIds.map(Number)
                }
            },
            select: {
                id: true
            }
        });

        if (users.length !== userIds.length) {
            throw new AppError("One or more users do not exist.", 400);
        }

        await tx.couponAssignment.createMany({
            data: users.map(user => ({
                couponId,
                userId: user.id
            }))
        });

        return {
            message: "Coupon assigned successfully."
        };

    });
};

module.exports = {
    addCoupon,
    assignCouponToUsers
}