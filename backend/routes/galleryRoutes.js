const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getGallery, addPhoto, deletePhoto } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Images uniquement !'));
  }
});

router.get('/', getGallery);
router.post('/', protect, adminOnly, upload.single('image'), addPhoto);
router.delete('/:id', protect, adminOnly, deletePhoto);

module.exports = router;
