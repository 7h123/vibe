const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
    try {
        const order = new Order(req.body);
        const saved = await order.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort('-createdAt');
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        next(err);
    }
};
