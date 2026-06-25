const express = require('express');
const router = express.Router();
const { getUsers, toggleUser, deleteUser, getDashboardStats, changeRole } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/', protect, adminOnly, getUsers);
router.put('/:id/toggle', protect, adminOnly, toggleUser);
router.put('/:id/role', protect, adminOnly, changeRole);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
