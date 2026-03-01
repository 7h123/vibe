const express = require('express');
const router = express.Router();
const devisController = require('../controllers/devisController');
const auth = require('../middleware/auth');

router.post('/', devisController.createDevis);
router.get('/', devisController.getDevis);
router.patch('/:id/status', auth, devisController.updateDevisStatus);

module.exports = router;
