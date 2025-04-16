const { models } = require('../models');
module.exports = {

    getallorders: async (req, res) => {
        try {
            const orders = await models.Order.findAll();
            res.json(orders);
        } catch (error) {
            res.staus(500).json({ error: error.message });
        }

    },
    addorder:async (req, res) => {
        const { customerName, orderDate, status, totalAmount} = req.body;
        try {
      
        const newOrder = await models.Order.create({ customerName, orderDate, status, totalAmount });
        res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        
      },
     updateorder: async (req, res) => {
        const { status } = req.body;
       
    try {
        const order = await models.Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        order.status = status;
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
     
      },
     deletorder: async (req, res) => {
        try {
            const deleted = await models.Order.destroy({ where: { id: req.params.id } });
            res.json({ deleted });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
       
      }
}