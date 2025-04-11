const { models } = require('../models');
const categoriesSeeder = require('./01-categories');
const subcategoriesSeeder = require('./02-subcategories');
const productsSeeder = require('./03-products');
const usersSeeder = require('./04-users');
const cartsSeeder = require('./05-carts');
const cartItemsSeeder = require('./06-cart-items');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Run seeders in order (relationships matter)
    await categoriesSeeder.seed(models);
    await subcategoriesSeeder.seed(models);
    await productsSeeder.seed(models);
    await usersSeeder.seed(models);
    await cartsSeeder.seed(models);
    await cartItemsSeeder.seed(models);
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase; 