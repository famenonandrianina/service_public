const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const { categorie, search, page = 1, limit = 10 } = req.query;
    const query = { actif: true };

    if (categorie && categorie !== 'tous') query.categorie = categorie;
    if (search) query.nom = { $regex: search, $options: 'i' };

    const total = await Service.countDocuments(query);
    const services = await Service.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      services
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service non trouvé' });
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Admin
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, message: 'Service créé avec succès', service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Admin
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service non trouvé' });
    res.json({ success: true, message: 'Service mis à jour', service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Admin
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service non trouvé' });
    res.json({ success: true, message: 'Service supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getServices, getService, createService, updateService, deleteService };
