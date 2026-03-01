const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        qty: Number,
        material: String,
    }],
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        city: String,
        address: String,
        message: String,
    },
    total: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
