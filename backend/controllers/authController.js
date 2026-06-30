const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log('===================== NOUVELLE INSCRIPTION =====================');
    console.log('📥 HEADERS:', req.headers);
    console.log('📥 ORIGINE:', req.headers.origin);
    console.log('📥 Données reçues pour inscription:', req.body);
    
    const { nom, email, motDePasse, telephone, adresse, role } = req.body;

    if (!nom || !email || !motDePasse) {
      const errMsg = 'Tous les champs obligatoires sont requis (nom, email, mot de passe)';
      console.log('❌ Champs manquants:', { nom: !!nom, email: !!email, motDePasse: !!motDePasse });
      return res.status(400).json({ success: false, message: errMsg });
    }

    console.log('🔍 Vérification si email existe déjà:', email);
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('❌ Email déjà utilisé:', email);
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    }

    console.log('📝 Création de l utilisateur...');
    const user = await User.create({ 
      nom, 
      email, 
      motDePasse, 
      telephone, 
      adresse, 
      role: role === 'admin' ? 'admin' : 'citoyen' 
    });
    
    console.log('✅ Utilisateur créé avec succès:', user._id);
    const token = generateToken(user._id);

    console.log('✅ Token généré:', token ? 'Oui' : 'Non');
    console.log('✅ Réponse envoyée avec succès');
    console.log('==============================================================');

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
    console.error('❌❌❌ ERREUR CRITIQUE INSCRIPTION ❌❌❌');
    console.error('Nom de l erreur:', error.name);
    console.error('Message:', error.message);
    console.error('Stack trace:', error.stack);
    console.error('==============================================================');
    
    res.status(500).json({ 
      success: false, 
      message: error.message, 
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log('📥 Données reçues pour connexion:', req.body);
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      console.log('❌ Champs manquants pour connexion');
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
    }

    console.log(`Tentative de connexion : ${email}`);
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+motDePasse');
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé en base');
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await user.comparePassword(motDePasse);
    console.log(`Mot de passe correct : ${isMatch}`);

    if (!isMatch) {
      console.log('❌ Mot de passe incorrect');
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    if (!user.actif) {
      console.log('❌ Compte désactivé');
      return res.status(401).json({ success: false, message: 'Compte désactivé, contactez l\'administration' });
    }

    const token = generateToken(user._id);
    console.log('✅ Connexion réussie pour:', user.email);

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
    console.error('❌ ERREUR CONNEXION:', error);
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
