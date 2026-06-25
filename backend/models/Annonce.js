const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  contenu: {
    type: String,
    required: [true, 'Le contenu est requis']
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categorie: {
    type: String,
    enum: ['info', 'alerte', 'evenement', 'maintenance'],
    default: 'info'
  },
  publiee: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Annonce', annonceSchema);
