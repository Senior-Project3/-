module.exports = {
  seed: async (models) => {
    const { Cart, User } = models;
    
    // Check if carts already exist
    const existingCarts = await Cart.findAll();
    if (existingCarts.length > 0) {
      console.log('Carts already exist, skipping seed');
      return;
    }
    
    // Get user IDs
    const user1 = await User.findOne({ where: { username: 'user1' } });
    const user2 = await User.findOne({ where: { username: 'user2' } });
    const user3 = await User.findOne({ where: { username: 'user3' } });
    
    const carts = [
      {
        total: 0,
        UserId: user1.id
      },
      {
        total: 0,
        UserId: user2.id
      },
      {
        total: 0,
        UserId: user3.id
      }
    ];
    
    await Cart.bulkCreate(carts);
    console.log('Carts seeded successfully');
  }
}; 