const { sequelize, models } = require('../models');
const categories = require('./categories');
const subcategories = require('./subcategories');
const products = require('./products');

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    await sequelize.sync({ force: true });
    console.log('Database cleared');
    const createdCategories = await models.Category.bulkCreate(categories);
    console.log(`${createdCategories.length} categories seeded`);
    const createdSubcategories = await models.SubCategory.bulkCreate(subcategories);
    console.log(`${createdSubcategories.length} subcategories seeded`);
    const createdProducts = await models.Product.bulkCreate(products);
    console.log(`${createdProducts.length} products seeded`);
    console.log('Database seeded successfully');
    console.log('You can now open pgAdmin to view your seeded data');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

 console.log('Starting database seeding...');
seedDatabase(); 