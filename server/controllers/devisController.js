const Devis = require('../models/Devis');

exports.createDevis = async (req, res, next) => {
    try {
        const devis = new Devis(req.body);
        const saved = await devis.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

exports.getDevis = async (req, res, next) => {
    try {
        const allDevis = await Devis.find().sort('-createdAt');
        res.json(allDevis);
    } catch (err) {
        next(err);
    }
};

exports.updateDevisStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const valid = ['new', 'contacted', 'quoted', 'accepted', 'rejected'];
        if (!valid.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const devis = await Devis.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!devis) return res.status(404).json({ message: 'Devis not found' });
        res.json(devis);
    } catch (err) {
        next(err);
    }
};
