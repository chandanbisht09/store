const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

const calculateCartSummary = async (db, cartId) => {

  const cart = await db.cart.findUnique({
    where: {
      id: cartId
    },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true
            }
          }
        }
      }
    }
  });

  let subTotal = 0;

  const items = cart.items.map(item => {

    const unitPrice = item.variant.discountedPrice ?? item.variant.price;
    const totalPrice = unitPrice * item.qty;

    subTotal += totalPrice;

    return {
      id: item.id,
      qty: item.qty,
      unitPrice,
      totalPrice,
      product: {
        id: item.variant.product.id,
        title: item.variant.product.title
      },
      variant: {
        id: item.variant.id,
        sku: item.variant.sku
      }
    };
  });

  const shipping = 100;
  const discount = 0;
  const grandTotal = subTotal + shipping - discount;
  return {
    id: cart.id,
    userId: cart.userId,
    items,
    summary: {
      subTotal,
      shipping,
      discount,
      grandTotal
    }
  };
};

module.exports = {
  calculateCartSummary
};
