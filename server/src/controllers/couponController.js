const couponService = require("../services/couponService");

const addCoupon = async (req, res) => {
  const coupon = await couponService.addCoupon(req.body);
  res.json(coupon);
};
const assignCouponToUsers = async(req,res,ext)=>  {
    const resoonse = await couponService.assignCouponToUsers(req.params.couponId,req.body.userIds);
    res.json(resoonse);
}

module.exports = {
    addCoupon,
    assignCouponToUsers
}

