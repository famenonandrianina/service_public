const User = require('../models/User');
const Demande = require('../models/Demande');
const Service = require('../models/Service');
const Reclamation = require('../models/Reclamation');

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Admin
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query;
    const query = {};
    if (role && role !== 'tous') query.role = role;
    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await User.countDocuments(query);
    const users = await User.find(query).skip((page - 1) * limit).limit(Number(limit)).sort({ createdAt: -1 });
    res.json({ success: true, total, pages: Math.ceil(total / limit), users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle user active status
// @route   PUT /api/users/:id/toggle
// @access  Admin
const toggleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    user.actif = !user.actif;
    await user.save();
    res.json({ success: true, message: `Utilisateur ${user.actif ? 'activé' : 'désactivé'}`, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change user role
// @route   PUT /api/users/:id/role
// @access  Admin
const changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['citoyen', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Rôle invalide' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    
    user.role = role;
    await user.save();
    res.json({ success: true, message: `Rôle mis à jour vers ${role}`, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/users/stats
// @access  Admin
const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalDemandes, totalServices, totalReclamations,
           demandesEnAttente, demandesAcceptees, demandesRefusees, demandesTerminees] = await Promise.all([
      User.countDocuments({ role: 'citoyen' }),
      Demande.countDocuments(),
      Service.countDocuments({ actif: true }),
      Reclamation.countDocuments(),
      Demande.countDocuments({ statut: 'en_attente' }),
      Demande.countDocuments({ statut: 'acceptee' }),
      Demande.countDocuments({ statut: 'refusee' }),
      Demande.countDocuments({ statut: 'terminee' }),
    ]);

    // Monthly demandes for chart (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const demandesParMois = await Demande.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers, totalDemandes, totalServices, totalReclamations,
        demandesEnAttente, demandesAcceptees, demandesRefusees, demandesTerminees,
        demandesParMois
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUsers, toggleUser, deleteUser, getDashboardStats, changeRole };
