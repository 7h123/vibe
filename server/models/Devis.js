const mongoose = require('mongoose');

const devisSchema = new mongoose.Schema({
    type: String,    // Type de pièce
    material: String,
    dimensions: String,
    budget: String,
    description: String,
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
    },
    status: { type: String, default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Devis', devisSchema);
