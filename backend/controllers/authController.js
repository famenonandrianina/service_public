const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { nom, email, motDePasse, telephone, adresse, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    }

    const user = await User.create({ 
      nom, 
      email, 
      motDePasse, 
      telephone, 
      adresse, 
      role: role === 'admin' ? 'admin' : 'citoyen' 
    });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      user: {
        _id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        telephone: user.telephone,
        adresse: user.adresse,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
    }

    console.log(`Tentative de connexion : ${email}`);
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+motDePasse');
    
    if (!user) {
      console.log('Utilisateur non trouvé en base');
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await user.comparePassword(motDePasse);
    console.log(`Mot de passe correct : ${isMatch}`);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    if (!user.actif) {
      return res.status(401).json({ success: false, message: 'Compte désactivé, contactez l\'administration' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        _id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        telephone: user.telephone,
        adresse: user.adresse,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// @desc    Update profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { nom, telephone, adresse } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { nom, telephone, adresse },
      { new: true, runValidators: true }
    );
    res.json({ success: true, message: 'Profil mis à jour', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;
    const user = await User.findById(req.user._id).select('+motDePasse');

    if (!(await user.comparePassword(ancienMotDePasse))) {
      return res.status(400).json({ success: false, message: 'Ancien mot de passe incorrect' });
    }
    user.motDePasse = nouveauMotDePasse;
    await user.save();
    res.json({ success: true, message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update avatar
// @route   PUT /api/auth/avatar
// @access  Private
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier téléchargé' });
    }
    const avatarPath = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarPath },
      { new: true }
    );
    res.json({ success: true, message: 'Photo de profil mise à jour', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe, updateProfile, changePassword, updateAvatar };
