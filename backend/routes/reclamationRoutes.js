const express = require('express');
const router = express.Router();
const { createReclamation, getMesReclamations, getAllReclamations, repondreReclamation } = require('../controllers/reclamationController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/mes-reclamations', protect, getMesReclamations);
router.post('/', protect, createReclamation);
router.get('/', protect, adminOnly, getAllReclamations);
router.put('/:id/repondre', protect, adminOnly, repondreReclamation);

module.exports = router;
