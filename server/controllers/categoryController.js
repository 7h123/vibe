const Category = require('../models/Category');

exports.getCategories = async (req, res, next) => {
    try {
        const filter = { active: true };
        if (req.query.type && ['decoration', 'marbre'].includes(req.query.type)) {
            filter.type = req.query.type;
        }
        const categories = await Category.find(filter).sort('order');
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        if (req.file) category.image = req.file.path;
        const saved = await category.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };
        if (req.file) {
            updates.image = req.file.path;
        }

        const updated = await Category.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) return res.status(404).json({ message: 'Category not found' });
        res.json(updated);
    } catch (err) {
        console.error("updateCategory error:", err, "Body:", req.body);
        next(err);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        next(err);
    }
};
