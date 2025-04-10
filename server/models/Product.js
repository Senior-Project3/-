const { DataTypes } = require('sequelize');

const Product = (sequelize) => {
  const ProductModel = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sales : {
      type : DataTypes.INTEGER
    },
    SubCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SubCategories',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
  });

  return ProductModel;
};

module.exports = Product; 