const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  nameAr:       String,
  slug:         { type: String, required: true, unique: true },
  category:     { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  material:     { type: String, trim: true },  // ← enum removed
  price:        { type: Number, default: 0 },
  priceOnRequest: { type: Boolean, default: false },
  priceLabel:   String,
  currency:     { type: String, default: 'MAD' },
  images:       [String],
  description:  String,
  shortDescription: String,
  specs: {
    dimensions: String,
    weight:     String,
    finish:     String,
    origin:     String,
    leadTime:   String,
  },
  stock:        { type: Number, default: 0 },
  inStock:      { type: Boolean, default: true },
  isFeatured:   { type: Boolean, default: false },
  active:       { type: Boolean, default: true },
  tags:         [String],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);