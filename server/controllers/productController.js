const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getProducts = async (req, res, next) => {
    try {
        const filters = { active: true };

        if (req.query.category) {
            const cat = await Category.findOne({ slug: req.query.category });
            if (cat) {
                filters.category = cat._id;
            } else {
                filters.category = req.query.category;
            }
        }

        if (req.query.material) filters.material = req.query.material;
        if (req.query.featured === 'true') filters.isFeatured = true;

        const products = await Product.find(filters).populate('category');
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.getProductBySlug = async (req, res, next) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, active: true }).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        if (req.file) {
            product.images = [req.file.path];
        }
        const saved = await product.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updates = { ...req.body };
        if (req.file) {
            updates.images = [req.file.path];
        }
        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
}
