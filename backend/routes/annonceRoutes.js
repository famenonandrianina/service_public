const express = require('express');
const router = express.Router();
const { getAnnonces, createAnnonce, updateAnnonce, deleteAnnonce } = require('../controllers/annonceController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getAnnonces);
router.post('/', protect, adminOnly, createAnnonce);
router.put('/:id', protect, adminOnly, updateAnnonce);
router.delete('/:id', protect, adminOnly, deleteAnnonce);

module.exports = router;
