module.exports = {
  seed: async (models) => {
    const { CartItem, Cart, Product, User } = models;
    
    // Check if cart items already exist
    const existingCartItems = await CartItem.findAll();
    if (existingCartItems.length > 0) {
      console.log('Cart items already exist, skipping seed');
      return;
    }
    
    // Get user carts
    const user1 = await User.findOne({ where: { username: 'user1' } });
    const user1Cart = await Cart.findOne({ where: { UserId: user1.id } });
    
    // Get some products
    const products = await Product.findAll({ limit: 3 });
    
    const cartItems = [
      {
        quantity: 2,
        CartId: user1Cart.id,
        ProductId: products[0].id
      },
      {
        quantity: 1,
        CartId: user1Cart.id,
        ProductId: products[1].id
      }
    ];
    
    await CartItem.bulkCreate(cartItems);
    
    // Update cart total
    const total = (products[0].price * 2) + products[1].price;
    await Cart.update({ total }, { where: { id: user1Cart.id } });
    
    console.log('Cart items seeded successfully');
  }
}; 