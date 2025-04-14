require('dotenv').config();
const { sequelize, syncDatabase } = require('./models');

async function main() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync database
    await syncDatabase();
    console.log('Database synchronized successfully');

    // Close the connection
    await sequelize.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 