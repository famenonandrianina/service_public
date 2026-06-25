const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService } = require('../controllers/servicePublicController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/')
  .get(getServices)
  .post(protect, adminOnly, createService);

router.route('/:id')
  .put(protect, adminOnly, updateService)
  .delete(protect, adminOnly, deleteService);

module.exports = router;
