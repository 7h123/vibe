const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt body:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email et mot de passe requis'
            });
        }

        // Search by email OR username
        const admin = await Admin.findOne({
            $or: [
                { email: email.toLowerCase().trim() },
                { username: email.toLowerCase().trim() }
            ]
        });

        if (!admin) {
            console.log('Admin not found for:', email);
            return res.status(401).json({
                message: 'Identifiants incorrects'
            });
        }

        // Use bcrypt.compare directly
        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, admin.password);

        console.log('Password match:', isMatch); // ← debug log

        if (!isMatch) {
            return res.status(401).json({
                message: 'Identifiants incorrects'
            });
        }

        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'nova_fallback_secret_2025',
            { expiresIn: '7d' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email || admin.username,
                role: admin.role,
                name: admin.name
            }
        });

    } catch (err) {
        console.error('Login error full:', err);
        res.status(500).json({
            message: 'Erreur serveur',
            error: err.message
        });
    }
});

// POST /api/auth/init
router.post('/init', async (req, res) => {
    const exists = await Admin.findOne({ username: process.env.ADMIN_USERNAME })
    if (exists) return res.json({ message: 'Admin déjà créé' })

    const bcrypt = require('bcryptjs')
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

    const admin = new Admin({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_USERNAME,
        password: hashed,
        role: 'admin'
    })
    await admin.save()
    res.json({ message: 'Admin créé avec succès' })
})

module.exports = router
