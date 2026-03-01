const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const { upload, processImage } = require('../middleware/upload');
const cache = require('../middleware/cache');

router.get('/', cache(300), categoryController.getCategories);
router.post('/', auth, upload.single('image'), processImage, categoryController.createCategory);
router.put('/:id', auth, upload.single('image'), processImage, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;
