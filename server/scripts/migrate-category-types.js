/**
 * One-time migration: set `type` on existing categories.
 * Run: node scripts/migrate-category-types.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

async function migrate() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const decorationSlugs = ['accessoires', 'salons'];
    const marbreSlugs = ['tables', 'consoles', 'vasques', 'sur-mesure'];

    const r1 = await Category.updateMany(
        { slug: { $in: decorationSlugs } },
        { $set: { type: 'decoration' } }
    );
    console.log(`Set ${r1.modifiedCount} categories to decoration`);

    const r2 = await Category.updateMany(
        { slug: { $in: marbreSlugs } },
        { $set: { type: 'marbre' } }
    );
    console.log(`Set ${r2.modifiedCount} categories to marbre`);

    // Set any remaining without a type to 'marbre'
    const r3 = await Category.updateMany(
        { type: { $exists: false } },
        { $set: { type: 'marbre' } }
    );
    console.log(`Set ${r3.modifiedCount} remaining categories to marbre`);

    await mongoose.disconnect();
    console.log('Done!');
}

migrate().catch(err => { console.error(err); process.exit(1); });
