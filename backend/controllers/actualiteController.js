const Actualite = require('../models/Actualite');

// @desc    Obtenir toutes les actualités
// @route   GET /api/actualites
// @access  Public
exports.getActualites = async (req, res) => {
  try {
    const actualites = await Actualite.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: actualites.length, data: actualites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Créer une actualité
// @route   POST /api/actualites
// @access  Admin
exports.createActualite = async (req, res) => {
  try {
    const actualite = await Actualite.create(req.body);
    res.status(201).json({ success: true, data: actualite });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Modifier une actualité
// @route   PUT /api/actualites/:id
// @access  Admin
exports.updateActualite = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!actualite) return res.status(404).json({ success: false, message: 'Actualité non trouvée' });
    res.status(200).json({ success: true, data: actualite });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Supprimer une actualité
// @route   DELETE /api/actualites/:id
// @access  Admin
exports.deleteActualite = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndDelete(req.params.id);
    if (!actualite) return res.status(404).json({ success: false, message: 'Actualité non trouvée' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
