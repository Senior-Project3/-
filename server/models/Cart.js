const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'UserId' });
    Cart.hasMany(models.CartItem, { foreignKey: 'CartId' });
  };

  return Cart;
}; 