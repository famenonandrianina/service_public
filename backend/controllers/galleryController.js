const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, photos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add photo to gallery
// @route   POST /api/gallery
// @access  Private/Admin
const addPhoto = async (req, res) => {
  try {
    const { titre, description, categorie } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ success: false, message: 'Veuillez télécharger une image' });
    }

    const photo = await Gallery.create({
      titre,
      description,
      categorie,
      imageUrl
    });

    res.status(201).json({ success: true, photo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete photo
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deletePhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo non trouvée' });
    }

    // Delete file from storage
    const filePath = path.join(__dirname, '..', photo.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await photo.deleteOne();
    res.json({ success: true, message: 'Photo supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getGallery, addPhoto, deletePhoto };
