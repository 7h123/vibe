const Contact = require('../models/Contact');

exports.createContact = async (req, res, next) => {
    try {
        const contact = new Contact(req.body);
        const saved = await contact.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};
