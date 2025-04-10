const { models } = require("../models")

module.exports = {
  getCart: async (req,res) => {
    try {
      const cart = await models.Cart.findOne({ 
        where: {UserId:req.user.id},
        include: [{
          model:models.Product,
          through:models.CartItem
        }]
      })
      if(!cart) return res.status(404).json({error:"Cart not found"})
      res.json(cart)
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },

  addToCart: async (req,res) => {
    try {
      const {productId,quantity} = req.body
      const product = await models.Product.findByPk(productId)
           if(!product) return res.status(404).json({error:"Product not found"})
           let cart = await models.Cart.findOne({where:{UserId:req.user.id}})
      
      if(!cart) {
        cart= await models.Cart.create({
          UserId:req.user.id,
          total: 0
        })
      }
      const [cartItem,created] = await models.CartItem.findOrCreate({
        where: {
          CartId:cart.id,
          ProductId:productId
        },
        defaults: {
          quantity:quantity
        }
      })
      if(!created) {
        await cartItem.update({
          quantity:cartItem.quantity+quantity
        });
      }
      const items = await models.CartItem.findAll({
        where:{CartId:cart.id},
        include:[models.Product]
      })
      const total = items.reduce((sum,item) => sum + (item.Product.price *item.quantity),0)
      await cart.update({total})
      res.json(cart)
    } catch (error) {
      res.status(500).json({error:error.message});
    }
  },

  updateCartItem: async (req,res) => {
    try {
      const {productId} = req.params
      const {quantity} = req.body
      const cart = await models.Cart.findOne({where:{UserId:req.user.id}})
      if(!cart) return res.status(404).json({error:"Cart not found"})
      const cartItem = await models.CartItem.findOne({
        where: {
          CartId:cart.id,
          ProductId:productId
        }
      })
      if(!cartItem) return res.status(404).json({error:"Item not found in cart"})
      if(quantity<=0) {
        await cartItem.destroy();
      }else {
        await cartItem.update({quantity})
      }
      const items = await models.CartItem.findAll({
        where: {CartId: cart.id},
        include: [models.Product]
      })
      const total = items.reduce((sum,item) => sum + (item.Product.price*item.quantity),0)
      await cart.update({ total })
      res.json(cart)
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },

  removeFromCart: async (req,res) => {
    try {
      const {productId} = req.params;
      const cart = await models.Cart.findOne({where:{UserId:req.user.id}})
      if(!cart) return res.status(404).json({error:"Cart not found"})
      const cartItem = await models.CartItem.findOne({
        where: {
          CartId: cart.id,
          ProductId: productId
        }
      })
      if(!cartItem) return res.status(404).json({error:"Item not found in cart"})
      await cartItem.destroy()
      const items = await models.CartItem.findAll({
        where: { CartId: cart.id },
        include: [models.Product]
      })
      const total = items.reduce((sum, item) => sum + (item.Product.price * item.quantity), 0);
      await cart.update({ total });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  clearCart: async (req, res) => {
    try {
      const cart = await models.Cart.findOne({ where: { UserId: req.user.id } });
      if (!cart) return res.status(404).json({ error: "Cart not found" });

      await models.CartItem.destroy({ where: { CartId: cart.id } });
      await cart.update({ total: 0 });

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}; 