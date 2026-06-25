const mongoose = require('mongoose');

const servicePublicSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee6b?q=80&w=800&auto=format&fit=crop'
  },
  categorie: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['Administration', 'Environnement', 'Solidarité', 'Agriculture', 'Social', 'Autre'],
    default: 'Autre'
  },
  date: {
    type: Date,
    default: Date.now
  },
  statut: {
    type: String,
    enum: ['Actif', 'En maintenance', 'Bientôt disponible'],
    default: 'Actif'
  },
  icone: {
    type: String,
    default: 'FiGrid'
  }
}, { timestamps: true });

module.exports = mongoose.model('ServicePublic', servicePublicSchema);
