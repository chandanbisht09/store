const calculateCartSummary = (items) => {

    let subTotal = 0;

    const cartItems = items.map(item => {

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
                title: item.variant.product.title,
                slug: item.variant.product.slug
            },
            variant: {
                id: item.variant.id,
                sku: item.variant.sku
            }
        };
    });

    const shipping = subTotal > 10000 ? 0 : 100;
    const discount = 0;
    const grandTotal = subTotal + shipping - discount;

    return {
        items: cartItems,
        summary: {
            itemCount: cartItems.length,
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