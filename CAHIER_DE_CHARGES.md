# 📋 Cahier de Charges - Projet VIBE

**Date** : Mars 2026  
**Type de Projet** : E-commerce + CMS Administrateur  
**Stack Technique** : React/Vite + Node.js/Express + MongoDB

---

## 📌 Vue d'ensemble

Application web complète de vente de produits de décoration et marbre, avec :
- 🛍️ Catalogue de produits
- 🛒 Panier et système de commande
- 📝 Formulaire de devis personnalisé
- 📧 Système de contact
- 🔐 Panel administrateur sécurisé
- 🎨 Design responsive avec Tailwind CSS

---

## 🗄️ Structure Base de Données (MongoDB)

### 1. **Collection: Admin**
Gestion des utilisateurs administrateurs

| Champ | Type | Description |
|-------|------|-------------|
| `email` | String (unique) | Email de l'admin |
| `username` | String | Nom d'utilisateur |
| `password` | String (hashé) | Mot de passe chiffré avec bcrypt |
| `role` | String | Rôle (default: 'admin') |
| `name` | String | Nom complet (default: 'Nova Admin') |
| `createdAt` | Date | Date de création |
| `updatedAt` | Date | Date de modification |

---

### 2. **Collection: Category**
Catégories de produits

| Champ | Type | Description |
|-------|------|-------------|
| `name` | String (requis) | Nom de la catégorie |
| `slug` | String (unique) | URL-friendly slug |
| `image` | String | URL de l'image (Cloudinary) |
| `type` | String (enum) | Type : 'decoration' ou 'marbre' |
| `order` | Number | Ordre d'affichage |
| `active` | Boolean | Catégorie active/inactive |

**Enum type** : ['decoration', 'marbre']

---

### 3. **Collection: Product**
Catalogue de produits

| Champ | Type | Description |
|-------|------|-------------|
| `name` | String (requis) | Nom du produit (FR) |
| `nameAr` | String | Nom du produit (AR) |
| `slug` | String (unique) | URL-friendly slug |
| `category` | ObjectId (ref) | Référence à Category |
| `material` | String | Matériau du produit |
| `price` | Number | Prix (default: 0) |
| `priceOnRequest` | Boolean | Prix sur demande |
| `priceLabel` | String | Label personnalisé du prix |
| `currency` | String | Devise (default: 'MAD') |
| `images` | [String] | Tableau d'URLs d'images |
| `description` | String | Description longue |
| `shortDescription` | String | Description courte |
| `specs` | Object | Spécifications techniques |
| `specs.dimensions` | String | Dimensions |
| `specs.weight` | String | Poids |
| `specs.finish` | String | Finition |
| `specs.origin` | String | Origine/Provenance |
| `specs.leadTime` | String | Délai de livraison |
| `stock` | Number | Quantité en stock (default: 0) |
| `inStock` | Boolean | En stock/rupture |
| `isFeatured` | Boolean | Produit en vedette |
| `active` | Boolean | Produit actif |
| `tags` | [String] | Mots-clés |
| `createdAt` | Date | Date de création |
| `updatedAt` | Date | Date de modification |

---

### 4. **Collection: Order**
Commandes des clients

| Champ | Type | Description |
|-------|------|-------------|
| `items` | [Object] | Tableau d'articles commandés |
| `items[].product` | ObjectId (ref) | Référence au Product |
| `items[].name` | String | Nom du produit |
| `items[].price` | Number | Prix unitaire |
| `items[].qty` | Number | Quantité |
| `items[].material` | String | Matériau sélectionné |
| `customer` | Object | Informations client |
| `customer.name` | String (requis) | Nom du client |
| `customer.phone` | String (requis) | Téléphone |
| `customer.email` | String | Email |
| `customer.city` | String | Ville |
| `customer.address` | String | Adresse |
| `customer.message` | String | Message spécial |
| `total` | Number | Total de la commande |
| `status` | String (enum) | État de la commande |
| `createdAt` | Date | Date de la commande |
| `updatedAt` | Date | Dernière mise à jour |

**Enum status** : ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

---

### 5. **Collection: Contact**
Messages de contact

| Champ | Type | Description |
|-------|------|-------------|
| `name` | String | Nom du visiteur |
| `phone` | String | Téléphone |
| `email` | String | Email |
| `subject` | String | Sujet du message |
| `message` | String (requis) | Contenu du message |
| `createdAt` | Date | Date du message |
| `updatedAt` | Date | Date de modification |

---

### 6. **Collection: Devis**
Demandes de devis personnalisé

| Champ | Type | Description |
|-------|------|-------------|
| `type` | String | Type de pièce |
| `material` | String | Matériau souhaité |
| `dimensions` | String | Dimensions demandées |
| `budget` | String | Budget estimé |
| `description` | String | Description détaillée |
| `customer` | Object | Informations client |
| `customer.name` | String (requis) | Nom |
| `customer.phone` | String (requis) | Téléphone |
| `customer.email` | String | Email |
| `status` | String | État (default: 'new') |
| `createdAt` | Date | Date de création |
| `updatedAt` | Date | Date de modification |

---

## 🔗 Relations Entre Collections

```
Category ←→ Product (one-to-many)
Product ←→ Order.items (many-to-many)
```

---

## 🎯 Fonctionnalités Principales

### Frontend (Client)
- ✅ Catalogue dynamique des produits
- ✅ Filtrage par catégorie (Décoration/Marbre)
- ✅ Panier persistant
- ✅ Formulaire de commande
- ✅ Formulaire de contact
- ✅ Formulaire de devis "Sur Mesure"
- ✅ Panel administrateur privé
- ✅ Supporté en FR/AR
- ✅ Design responsive mobile/desktop

### Backend (Serveur)
- ✅ API REST complète (CRUD)
- ✅ Authentification admin (JWT)
- ✅ Upload d'images (Cloudinary)
- ✅ Validation des données (Joi/express-validator)
- ✅ Rate limiting
- ✅ CORS configuré
- ✅ Gestion d'erreurs centralisée
- ✅ Cache côté serveur
- ✅ MongoDB avec Mongoose

---

## 📡 Routes API Principales

### Produits
- `GET /api/products` - Lister tous les produits
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/products` - Créer (admin)
- `PUT /api/products/:id` - Modifier (admin)
- `DELETE /api/products/:id` - Supprimer (admin)

### Catégories
- `GET /api/categories` - Lister les catégories
- `POST /api/categories` - Créer (admin)
- `PUT /api/categories/:id` - Modifier (admin)
- `DELETE /api/categories/:id` - Supprimer (admin)

### Commandes
- `GET /api/orders` - Lister (admin)
- `POST /api/orders` - Créer une commande
- `PUT /api/orders/:id` - Mettre à jour le status (admin)

### Contacts
- `POST /api/contact` - Envoyer un message

### Devis
- `POST /api/devis` - Soumettre une demande
- `GET /api/devis` - Lister (admin)

### Admin
- `POST /api/auth/login` - Connexion admin
- `GET /api/auth/me` - Infos admin

---

## 🖼️ Medias

### Stockage
- **Provider** : Cloudinary
- **Images Produits** : URL publiques stored in MongoDB
- **Catégories** : Une image par catégorie
- **Dossiers** :
  - `/public/images/products/` (local)
  - `/public/images/instagram/` (Instagram content)

---

## 🔐 Sécurité

| Aspect | Implémentation |
|--------|-----------------|
| Authentification | JWT (JSON Web Tokens) |
| Mot de passe | Bcrypt (hash + salt) |
| CORS | Whitelist d'origines |
| Rate Limiting | express-rate-limit |
| Validation | Joi + express-validator |
| Helmet | Protection headers HTTP |

---

## 📊 Déploiement

- **Frontend** : Vercel
- **Backend** : Vercel (Serverless)
- **Base de Données** : MongoDB Atlas (Cloud)
- **Stockage Images** : Cloudinary
- **Variables d'Environnement** : `.env` (server)

---

## 🛠️ Technologies Clés

### Frontend
- React 19.2.0
- Vite 7.3.1
- Tailwind CSS 4.2.1
- React Router 7.13.1
- Axios 1.13.6
- Lucide React (icônes)

### Backend
- Node.js + Express 5.2.1
- MongoDB 7.1.0 + Mongoose 9.2.3
- Cloudinary (images)
- bcryptjs (sécurité)
- jsonwebtoken (JWT)
- Sharp (traitement images)

---

## 💼 Contexte Métier

**Entreprise** : Nova Design (Décoration & Marbre)  
**Secteur** : Vente de produits de décoration et marbre  
**Modèle** : B2C avec options personnalisées  
**Devise** : MAD (Dirham marocain)  
**Langues** : Français + Arabe

---

## 📝 Notes Importantes

1. **Devis Sur Mesure** : Fonction spéciale pour demandes personnalisées non présentes au catalogue
2. **Panier Dynamique** : Basket stocké en localStorage (côté client)
3. **Admin Dashboard** : Interface pour gérer produits, catégories, commandes et devis
4. **Deux Types de Catégories** : Décoration et Marbre (enum)
5. **Prix Flexible** : Option "Prix sur demande" pour articles premium
6. **WhatsApp Integration** : Widget de contact direct (FloatingWhatsApp.jsx)

---

**Dernière mise à jour** : Mars 2026
