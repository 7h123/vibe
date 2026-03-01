const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const { upload, processImage } = require('../middleware/upload');
const cache = require('../middleware/cache');

router.get('/', cache(300), productController.getProducts);
router.get('/:slug', cache(300), productController.getProductBySlug);
router.post('/', auth, upload.single('image'), processImage, productController.createProduct);
router.put('/:id', auth, upload.single('image'), processImage, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
