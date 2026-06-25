const Reclamation = require('../models/Reclamation');

// @desc    Create reclamation
// @route   POST /api/reclamations
// @access  Private
const createReclamation = async (req, res) => {
  try {
    const { sujet, message, priorite } = req.body;
    const reclamation = await Reclamation.create({
      utilisateur: req.user._id, sujet, message, priorite
    });
    res.status(201).json({ success: true, message: 'Réclamation soumise', reclamation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my reclamations
// @route   GET /api/reclamations/mes-reclamations
// @access  Private
const getMesReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find({ utilisateur: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, reclamations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reclamations (admin)
// @route   GET /api/reclamations
// @access  Admin
const getAllReclamations = async (req, res) => {
  try {
    const { statut, page = 1, limit = 10 } = req.query;
    const query = {};
    if (statut && statut !== 'tous') query.statut = statut;

    const total = await Reclamation.countDocuments(query);
    const reclamations = await Reclamation.find(query)
      .populate('utilisateur', 'nom email')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, total, pages: Math.ceil(total / limit), reclamations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reply to reclamation (admin)
// @route   PUT /api/reclamations/:id/repondre
// @access  Admin
const repondreReclamation = async (req, res) => {
  try {
    const { reponse, statut } = req.body;
    const reclamation = await Reclamation.findByIdAndUpdate(
      req.params.id,
      { reponse, statut: statut || 'resolue' },
      { new: true }
    ).populate('utilisateur', 'nom email');

    if (!reclamation) return res.status(404).json({ success: false, message: 'Réclamation non trouvée' });
    res.json({ success: true, message: 'Réponse envoyée', reclamation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createReclamation, getMesReclamations, getAllReclamations, repondreReclamation };
