const Annonce = require('../models/Annonce');

// @desc    Get all annonces
// @route   GET /api/annonces
// @access  Public
const getAnnonces = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const total = await Annonce.countDocuments({ publiee: true });
    const annonces = await Annonce.find({ publiee: true })
      .populate('auteur', 'nom')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, total, pages: Math.ceil(total / limit), annonces });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create annonce
// @route   POST /api/annonces
// @access  Admin
const createAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.create({ ...req.body, auteur: req.user._id });
    res.status(201).json({ success: true, message: 'Annonce publiée', annonce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update annonce
// @route   PUT /api/annonces/:id
// @access  Admin
const updateAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!annonce) return res.status(404).json({ success: false, message: 'Annonce non trouvée' });
    res.json({ success: true, message: 'Annonce mise à jour', annonce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete annonce
// @route   DELETE /api/annonces/:id
// @access  Admin
const deleteAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!annonce) return res.status(404).json({ success: false, message: 'Annonce non trouvée' });
    res.json({ success: true, message: 'Annonce supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAnnonces, createAnnonce, updateAnnonce, deleteAnnonce };
