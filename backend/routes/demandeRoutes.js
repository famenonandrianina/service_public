const express = require('express');
const router = express.Router();
const {
  createDemande, getMesDemandes, getAllDemandes, getDemande, updateStatut, getStats
} = require('../controllers/demandeController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/stats', protect, adminOnly, getStats);
router.get('/mes-demandes', protect, getMesDemandes);
router.post('/', protect, upload.array('documents', 5), createDemande);
router.get('/', protect, adminOnly, getAllDemandes);
router.get('/:id', protect, getDemande);
router.put('/:id/statut', protect, adminOnly, updateStatut);

module.exports = router;
