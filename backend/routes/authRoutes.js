const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, changePassword, updateAvatar } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, upload.single('avatar'), updateAvatar);
router.put('/change-password', protect, changePassword);

module.exports = router;
