require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Admin = require('../models/Admin');

const MONGO_URI = process.env.MONGODB_URI;

const categories = [
    { name: "Tables", nameAr: "طاولات", slug: "tables" },
    { name: "Consoles", slug: "consoles" },
    { name: "Vasques & Bains", slug: "vasques" },
    { name: "Accessoires", slug: "accessoires" },
    { name: "Sur Mesure", slug: "sur-mesure" }
];

const products = [
    // ── TABLES ──
    {
        name: "Table Ronde Travertin Roma",
        slug: "table-ronde-travertin-roma",
        description: "Table de salle à manger en travertin naturel brut, base cannelée sculptée à la main. Chaque pièce est unique. Finition brossée mate anti-tache.",
        shortDescription: "Base cannelée sculptée main · Travertin naturel",
        price: 18500,
        currency: "MAD",
        category: "tables",
        dimensions: "Ø130 × H75 cm",
        material: "Travertin naturel",
        finish: "Brossé mat",
        weight: "85 kg",
        leadTime: "3–4 semaines",
        inStock: true,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85&fm=webp",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Table Ovale Marbre Blanc Statuario",
        slug: "table-ovale-marbre-blanc-statuario",
        description: "Grande table en marbre blanc Statuario veiné gris anthracite. Plateau monolithique 3cm d'épaisseur. Base en acier laqué noir mat.",
        shortDescription: "Plateau monolithique 3cm · Marbre Statuario",
        price: 27800,
        currency: "MAD",
        category: "tables",
        dimensions: "200 × 100 × H75 cm",
        material: "Marbre blanc Statuario",
        finish: "Poli brillant",
        weight: "140 kg",
        leadTime: "4–6 semaines",
        inStock: true,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Table Basse Carrara & Laiton",
        slug: "table-basse-carrara-laiton",
        description: "Table basse en marbre blanc de Carrare, pieds en laiton massif brossé doré. Plateau 2cm avec adouci biseauté. Contraste saisissant entre la pierre et le métal.",
        shortDescription: "Pieds laiton doré · Marbre Carrara",
        price: 9400,
        currency: "MAD",
        category: "tables",
        dimensions: "120 × 60 × H38 cm",
        material: "Marbre blanc Carrara",
        finish: "Poli brillant",
        weight: "48 kg",
        leadTime: "2–3 semaines",
        inStock: true,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Table d'Appoint Onyx Miel",
        slug: "table-appoint-onyx-miel",
        description: "Table d'appoint en onyx miel translucide. Veines naturelles dorées et caramel. Rétroéclairage LED intégré en option. Pièce de collection.",
        shortDescription: "Onyx translucide · LED intégré optionnel",
        price: 6800,
        currency: "MAD",
        category: "tables",
        dimensions: "Ø45 × H55 cm",
        material: "Onyx miel naturel",
        finish: "Poli brillant",
        weight: "22 kg",
        leadTime: "2–3 semaines",
        inStock: true,
        isFeatured: false,
        images: [
            "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Table de Salle à Manger Nero Marquina",
        slug: "table-salle-manger-nero-marquina",
        description: "Table imposante en marbre noir Marquina aux veines blanches vives. Base en X sculptée dans la masse. Effet sculptural maximal pour intérieurs contemporains.",
        shortDescription: "Base sculptée en X · Nero Marquina",
        price: 31500,
        currency: "MAD",
        category: "tables",
        dimensions: "220 × 110 × H76 cm",
        material: "Marbre noir Marquina",
        finish: "Poli brillant",
        weight: "165 kg",
        leadTime: "5–7 semaines",
        inStock: false,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=85&fm=webp"
        ]
    },

    // ── CONSOLES ──
    {
        name: "Console Marbre Noir & Acier",
        slug: "console-marbre-noir-acier",
        description: "Console en marbre noir Marquina, structure fine en acier noir mat soudé à la main. Plateau 2cm d'épaisseur. Idéale pour entrée ou couloir de caractère.",
        shortDescription: "Acier soudé main · Nero Marquina",
        price: 12400,
        currency: "MAD",
        category: "consoles",
        dimensions: "140 × 35 × H82 cm",
        material: "Marbre noir Marquina + acier",
        finish: "Poli brillant / Laqué mat",
        weight: "55 kg",
        leadTime: "3–4 semaines",
        inStock: true,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Console Travertin Arch",
        slug: "console-travertin-arch",
        description: "Console aux lignes arquées, entièrement sculptée dans un bloc de travertin. Arche centrale ajourée. Pièce sculpturale unique.",
        shortDescription: "Arche centrale ajourée · Bloc monolithe",
        price: 15800,
        currency: "MAD",
        category: "consoles",
        dimensions: "120 × 32 × H80 cm",
        material: "Travertin naturel",
        finish: "Brossé mat",
        weight: "70 kg",
        leadTime: "4–5 semaines",
        inStock: true,
        isFeatured: false,
        images: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85&fm=webp"
        ]
    },

    // ── VASQUES ──
    {
        name: "Vasque Monolithe Travertin",
        slug: "vasque-monolithe-travertin",
        description: "Vasque à poser taillée dans un monolithe de travertin. Forme organique légèrement asymétrique. Traitement hydrofuge de longue durée inclus.",
        shortDescription: "Monolithe taillé main · Traitement hydrofuge",
        price: 7200,
        currency: "MAD",
        category: "vasques",
        dimensions: "55 × 38 × H15 cm",
        material: "Travertin naturel",
        finish: "Adouci satiné",
        weight: "18 kg",
        leadTime: "2–3 semaines",
        inStock: true,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Vasque Ronde Marbre Blanc",
        slug: "vasque-ronde-marbre-blanc",
        description: "Vasque ronde en marbre blanc de Carrare, intérieur adouci poli. Bord relevé 4cm. Livraison avec bonde chromée de haute qualité.",
        shortDescription: "Marbre Carrara · Bonde chromée incluse",
        price: 5400,
        currency: "MAD",
        category: "vasques",
        dimensions: "Ø42 × H13 cm",
        material: "Marbre blanc Carrara",
        finish: "Poli brillant",
        weight: "14 kg",
        leadTime: "1–2 semaines",
        inStock: true,
        isFeatured: false,
        images: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=85&fm=webp"
        ]
    },

    // ── ACCESSOIRES ──
    {
        name: "Plateau Décoratif Marbre Vert Forêt",
        slug: "plateau-decoratif-marbre-vert-foret",
        description: "Plateau de présentation en marbre vert forêt veiné or. Parfait pour dressing, salon ou cuisine. Fond en feutre anti-rayure.",
        shortDescription: "Marbre vert forêt veiné or · Anti-rayures",
        price: 1850,
        currency: "MAD",
        category: "accessoires",
        dimensions: "35 × 25 × H2 cm",
        material: "Marbre vert forêt",
        finish: "Poli brillant",
        weight: "2.8 kg",
        leadTime: "1 semaine",
        inStock: true,
        isFeatured: false,
        images: [
            "https://images.unsplash.com/photo-1594913371583-95c8e8bfef5b?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Bougeoir Travertin Set de 3",
        slug: "bougeoir-travertin-set-3",
        description: "Set de 3 bougeoirs en travertin de hauteurs variées. Creusé à la main, fond poli. Ambiance chaleureuse garantie.",
        shortDescription: "Set de 3 hauteurs · Creusé main",
        price: 2200,
        currency: "MAD",
        category: "accessoires",
        dimensions: "H8 / H12 / H16 cm",
        material: "Travertin naturel",
        finish: "Brossé mat",
        weight: "1.5 kg",
        leadTime: "1 semaine",
        inStock: true,
        isFeatured: false,
        images: [
            "https://images.unsplash.com/photo-1616048056617-93b94a339009?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Vase Sculptural Onyx Blanc",
        slug: "vase-sculptural-onyx-blanc",
        description: "Vase en onyx blanc translucide, col évasé. Chaque pièce révèle des veines uniques en lumière naturelle. Objet d'art à part entière.",
        shortDescription: "Onyx translucide · Pièce unique",
        price: 3600,
        currency: "MAD",
        category: "accessoires",
        dimensions: "Ø18 × H32 cm",
        material: "Onyx blanc naturel",
        finish: "Poli brillant",
        weight: "3.2 kg",
        leadTime: "1–2 semaines",
        inStock: true,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=85&fm=webp"
        ]
    },

    // ── SUR MESURE ──
    {
        name: "Cuisine Entière en Marbre",
        slug: "cuisine-entiere-marbre",
        description: "Conception et réalisation complète de votre cuisine en marbre ou travertin. Plan de travail, crédence, îlot central. Étude personnalisée gratuite.",
        shortDescription: "Étude personnalisée gratuite · Toutes pierres",
        price: 0,
        priceOnRequest: true,
        currency: "MAD",
        category: "sur-mesure",
        dimensions: "Sur mesure",
        material: "Au choix — catalogue disponible",
        finish: "Au choix",
        leadTime: "6–10 semaines",
        inStock: true,
        isFeatured: true,
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85&fm=webp"
        ]
    },
    {
        name: "Escalier Marbre Sur Mesure",
        slug: "escalier-marbre-sur-mesure",
        description: "Marches, contremarches et main courante en marbre. Pose incluse. Rendu architectural haut de gamme pour villas et appartements de prestige.",
        shortDescription: "Pose incluse · Villas et résidences prestige",
        price: 0,
        priceOnRequest: true,
        currency: "MAD",
        category: "sur-mesure",
        dimensions: "Sur mesure",
        material: "Au choix",
        finish: "Au choix",
        leadTime: "8–12 semaines",
        inStock: true,
        isFeatured: false,
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fm=webp"
        ]
    }
];

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    await Category.deleteMany({});
    await Product.deleteMany({});

    // Delete existing admin
    await Admin.deleteMany({});

    // Create with plaintext — pre-save hook will hash it ONCE
    const admin = new Admin({
        email: 'admin@novadesign.ma',
        username: 'admin@novadesign.ma',
        password: 'NovaAdmin2025!',  // plaintext — hook handles hashing
        role: 'superadmin',
        name: 'Nova Admin'
    });
    await admin.save();
    console.log('✅ Admin seeded: admin@novadesign.ma');

    const cats = await Category.insertMany(categories);
    const catMap = {};
    cats.forEach(c => { catMap[c.slug] = c._id });

    // Map the string category to the actual ObjectId
    const finalProducts = products.map(p => ({
    name:             p.name,
    nameAr:           p.nameAr,
    slug:             p.slug,
    description:      p.description,
    shortDescription: p.shortDescription,
    price:            p.price,
    priceOnRequest:   p.priceOnRequest || false,
    currency:         p.currency || 'MAD',
    category:         catMap[p.category],
    material:         p.material,
    images:           p.images || [],
    inStock:          p.inStock ?? true,
    isFeatured:       p.isFeatured || false,
    active:           true,
    tags:             p.tags || [],
    // ← nest flat fields into specs
    specs: {
        dimensions: p.dimensions,
        weight:     p.weight,
        finish:     p.finish,
        leadTime:   p.leadTime,
    }
    }));

    await Product.insertMany(finalProducts);
    console.log(`Seeded: ${cats.length} categories, ${finalProducts.length} products`);

    // Log products for confirmation
    finalProducts.forEach(p => console.log(`- ${p.name} (${p.price} MAD)`));

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
