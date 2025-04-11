const bcrypt = require('bcrypt');

module.exports = {
  seed: async (models) => {
    const { User } = models;
    
    // Check if users already exist
    const existingUsers = await User.findAll();
    if (existingUsers.length > 0) {
      console.log('Users already exist, skipping seed');
      return;
    }
    
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedUserPassword = await bcrypt.hash('user123', 10);
    
    const users = [
      {
        username: 'admin',
        email: 'admin@labesni.com',
        password: hashedAdminPassword,
        role: 'admin'
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: hashedUserPassword,
        role: 'user'
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: hashedUserPassword,
        role: 'user'
      },
      {
        username: 'user3',
        email: 'user3@example.com',
        password: hashedUserPassword,
        role: 'user'
      }
    ];
    
    await User.bulkCreate(users);
    console.log('Users seeded successfully');
  }
}; 