const { models } = require('../models');
module.exports = {

    getallorders: async (req, res) => {
        try {
            console.log('Fetching all orders...');
            const orders = await models.Order.findAll({
                order: [['createdAt', 'DESC']] // Order by most recent first
            });
            console.log('Found orders:', orders.length);
            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: error.message });
        }
    },

    addorder: async (req, res) => {
        const { customerName, orderDate, status, totalAmount } = req.body;
        try {
            const newOrder = await models.Order.create({ customerName, orderDate, status, totalAmount });
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateorder: async (req, res) => {
        const { status } = req.body;
        const orderId = req.params.id;

        try {
            console.log('Updating order:', orderId, 'with status:', status);
            const order = await models.Order.findByPk(orderId);
            
            if (!order) {
                console.log('Order not found:', orderId);
                return res.status(404).json({ message: 'Order not found' });
            }

            console.log('Found order:', order.id);
            order.status = status;
            await order.save();
            
            console.log('Order updated successfully:', order.id);
            res.json(order);
        } catch (error) {
            console.error('Error updating order:', error);
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