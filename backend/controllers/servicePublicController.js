const ServicePublic = require('../models/ServicePublic');

// @desc    Obtenir tous les services publics
// @route   GET /api/services-publics
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const services = await ServicePublic.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Créer un nouveau service public
// @route   POST /api/services-publics
// @access  Admin
exports.createService = async (req, res) => {
  try {
    const service = await ServicePublic.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Modifier un service public
// @route   PUT /api/services-publics/:id
// @access  Admin
exports.updateService = async (req, res) => {
  try {
    const service = await ServicePublic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!service) return res.status(404).json({ success: false, message: 'Service non trouvé' });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Supprimer un service public
// @route   DELETE /api/services-publics/:id
// @access  Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await ServicePublic.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service non trouvé' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
