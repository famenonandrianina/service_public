const Demande = require('../models/Demande');
const path = require('path');

// @desc    Create demande
// @route   POST /api/demandes
// @access  Private (citoyen)
const createDemande = async (req, res) => {
  try {
    const { service, description } = req.body;
    const documents = req.files ? req.files.map(f => ({
      nom: f.originalname,
      chemin: f.filename,
      type: f.mimetype,
      taille: f.size
    })) : [];

    const demande = await Demande.create({
      utilisateur: req.user._id,
      service,
      description,
      documents
    });
    await demande.populate(['utilisateur', 'service']);
    res.status(201).json({ success: true, message: 'Demande soumise avec succès', demande });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my demandes
// @route   GET /api/demandes/mes-demandes
// @access  Private
const getMesDemandes = async (req, res) => {
  try {
    const { statut, page = 1, limit = 10 } = req.query;
    const query = { utilisateur: req.user._id };
    if (statut && statut !== 'tous') query.statut = statut;

    const total = await Demande.countDocuments(query);
    const demandes = await Demande.find(query)
      .populate('service', 'nom categorie')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, total, pages: Math.ceil(total / limit), demandes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all demandes (admin)
// @route   GET /api/demandes
// @access  Admin
const getAllDemandes = async (req, res) => {
  try {
    const { statut, page = 1, limit = 10, search } = req.query;
    const query = {};
    if (statut && statut !== 'tous') query.statut = statut;

    const total = await Demande.countDocuments(query);
    const demandes = await Demande.find(query)
      .populate('utilisateur', 'nom email')
      .populate('service', 'nom categorie')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, total, pages: Math.ceil(total / limit), demandes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single demande
// @route   GET /api/demandes/:id
// @access  Private
const getDemande = async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id)
      .populate('utilisateur', 'nom email telephone')
      .populate('service', 'nom description categorie documentsRequis');

    if (!demande) return res.status(404).json({ success: false, message: 'Demande non trouvée' });

    // Check ownership or admin
    if (demande.utilisateur._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Accès non autorisé' });
    }

    res.json({ success: true, demande });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update demande status (admin)
// @route   PUT /api/demandes/:id/statut
// @access  Admin
const updateStatut = async (req, res) => {
  try {
    const { statut, commentaireAdmin } = req.body;
    const demande = await Demande.findByIdAndUpdate(
      req.params.id,
      { statut, commentaireAdmin, dateTraitement: Date.now() },
      { new: true }
    ).populate(['utilisateur', 'service']);

    if (!demande) return res.status(404).json({ success: false, message: 'Demande non trouvée' });
    res.json({ success: true, message: 'Statut mis à jour', demande });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get stats
// @route   GET /api/demandes/stats
// @access  Admin
const getStats = async (req, res) => {
  try {
    const stats = await Demande.aggregate([
      { $group: { _id: '$statut', count: { $sum: 1 } } }
    ]);
    const total = await Demande.countDocuments();
    res.json({ success: true, stats, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createDemande, getMesDemandes, getAllDemandes, getDemande, updateStatut, getStats };
