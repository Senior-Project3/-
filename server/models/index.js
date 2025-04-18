const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false
  }
);

const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const SubCategory = require('./SubCategory');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./order');

const models = {
  User: User(sequelize),
  Product: Product(sequelize),
  Category: Category(sequelize),
  SubCategory: SubCategory(sequelize),
  Cart: Cart(sequelize),
  CartItem: CartItem(sequelize),
  Order: Order(sequelize)
};

const defineAssociations = () => {
  models.User.hasOne(models.Cart, { foreignKey: 'UserId' });
  models.Cart.belongsTo(models.User, { foreignKey: 'UserId' });

  models.Category.hasMany(models.SubCategory, { foreignKey: 'CategoryId' });
  models.SubCategory.belongsTo(models.Category, { foreignKey: 'CategoryId' });

  models.SubCategory.hasMany(models.Product, { foreignKey: 'SubCategoryId' });
  models.Product.belongsTo(models.SubCategory, { foreignKey: 'SubCategoryId' });

  models.Cart.hasMany(models.CartItem, { foreignKey: 'CartId' });
  models.CartItem.belongsTo(models.Cart, { foreignKey: 'CartId' });

  models.Product.hasMany(models.CartItem, { foreignKey: 'ProductId' });
  models.CartItem.belongsTo(models.Product, { foreignKey: 'ProductId' });
};

defineAssociations();

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  models,
  syncDatabase
}; 