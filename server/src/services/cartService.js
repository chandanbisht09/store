const prisma = require("../config/prisma.js");
const { calculateCartSummary } = require("../helpers/cartHelper");

const createCart = async (cart) => {
  const { cartItems, userId } = cart;

  return await prisma.$transaction(async (tx) => {

    const createdCart = await tx.cart.create({
      data: {
        userId
      }
    });

    await tx.cartItem.createMany({
      data: cartItems.map(item => ({
        ...item,
        cartId: createdCart.id
      }))
    });

    const userCart = await tx.cart.findUnique({
      where: {
        id: createdCart.id
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

    const cartSummary = calculateCartSummary(userCart.items);
    return {
            id: userCart.id,
            userId: userCart.userId,
            ...cartSummary
        };
    });
};
const getCart = async(userId) => {
    const userCart = await prisma.cart.findUnique({
      where: {
        userId: userId
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

    const cartSummary = calculateCartSummary(userCart.items);
    return {
        id: userCart.id,
        userId: userCart.userId,
        ...cartSummary
    };    
}
const clearCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) {
    return {
      success: true,
      message: "Cart is already empty."
    };
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id
    }
  });

  return {
    success: true,
    message: "Cart cleared successfully."
  };
};

module.exports = {
    createCart,
    getCart,
    clearCart
}