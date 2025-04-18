const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
        type:DataTypes.STRING,   
    },
    orderDate:
     {type:DataTypes.DATE

     },
     status:  {type:DataTypes.STRING,

     },
     totalAmount:  {type:DataTypes.FLOAT

     },

  }, {
    timestamps: true,
  });

 Order.associate = (models) => {
   Order.belongsTo(models.User, { foreignKey: 'UserId' });
   Order.hasMany(models.Product, { foreignKey: 'ProductId' });
  };

  return Order; 
}; 
