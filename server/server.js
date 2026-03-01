require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'https://client-nu-peach-75.vercel.app',
    'https://client-6rt1192mp-mohameds-projects-fb194a96.vercel.app'
];

function isOriginAllowed(origin) {
    if (!origin) return true;
    return allowedOrigins.includes(origin) || origin.endsWith('.vercel.app');
}

// CORS: run first so every response (including errors and OPTIONS) gets headers (critical for Vercel)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Always set CORS headers so Vercel/edge never sends a response without them
    if (origin && isOriginAllowed(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
        res.setHeader('Access-Control-Allow-Origin', 'https://client-nu-peach-75.vercel.app');
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Max-Age', '86400');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

const corsOptions = {
    origin: function (origin, callback) {
        if (isOriginAllowed(origin)) {
            callback(null, true);
        } else {
            console.warn(`Blocked by CORS: ${origin}`);
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── MONGODB (cached for Vercel serverless) ────────────
let isConnected = false;
async function connectDB(req, res, next) {
    if (isConnected) {
        return next();
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('✅ MongoDB connected');
        next();
    } catch (err) {
        console.error('❌ MongoDB failed:', err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
}

// Ensure DB is connected for all API routes (but NOT for the OPTIONS preflight)
app.use('/api', connectDB);

// ── ROUTES ────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/devis', require('./routes/devis'));
app.use('/api/contact', require('./routes/contact'));

// ── HEALTH CHECK ──────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        mongo: mongoose.connection.readyState === 1
            ? 'connected'
            : 'disconnected'
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'Nova Design API is running',
        version: '1.0.0',
        health: '/api/health'
    });
});

// ── 404 HANDLER ───────────────────────────────────────
app.use((req, res, next) => {
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`,
        status: 404
    });
});

// ── ERROR HANDLER ─────────────────────────────────────
app.use(require('./middleware/errorHandler'));

// ── LOCAL DEV ONLY (Vercel handles this in prod) ──────
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 5000, () =>
        console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
    );
}

module.exports = app;