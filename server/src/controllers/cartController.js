const cartService = require("../services/cartService");
const createCart = async(req, res, next) => {
    try{
        let cart =  req.body;
        cart['userId'] = req.user.userId;
        const cartObj = await cartService.createCart(cart);
        res.status(201).json({
            message : 'Cart created',
            data : cartObj
        });
       }catch(error){
            next(error)
       }
}
const getCart = async (req, res,next) => {
    try{
        const cart = await cartService.getCart(req.user.userId);
        res.status(200).json({
            data : cart
        }); 
    }catch(error){
        next(error)
    }
}
const clearCart = async (req, res,next) => {
    try {
        await cartService.clearCart(req.user.userId);
         res.status(200).json({
           message : "Cart deleted"
        }); 
    }catch(error){
        next(error)
    }
}
const updateCart = async (req, res,next) => {
    try{
        let cart =  req.body;
        cart['userId'] = req.user.userId;
        const cartObj = await cartService.createCart(cart);
         res.status(200).json({
           message : "Cart deleted"
        }); 
    }catch(error){
        next(error)
    }
}
const updateItem = async (req, res,next)=> {
    try{
        const updatedCart = await cartService.updateItem(req.params.id,req.user.userId,req.body);
         res.status(200).json({
           message : "Cart updated",
           data : updatedCart
        }); 
    }catch(error){
        next(error)
    }
}
const deleteItem = async (req,res,next) => {
    try{
        const updatedCart = await cartService.deleteItem(req.params.id,req.user.userId);
        res.status(200).json({
           message : "Cart updated",
           data : updatedCart
        }); 
    }catch(error){
        next(error)
    }
}

module.exports = {
    createCart,
    getCart,
    updateCart,
    clearCart,
    updateItem,
    deleteItem
}