const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    select: false
  },
  role: {
    type: String,
    enum: ['citoyen', 'admin'],
    default: 'citoyen'
  },
  telephone: {
    type: String,
    trim: true
  },
  adresse: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  actif: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function() {
  if (!this.isModified('motDePasse')) return;
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
