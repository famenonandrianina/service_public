const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sujet: {
    type: String,
    required: [true, 'Le sujet est requis'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Le message est requis']
  },
  reponse: {
    type: String,
    default: ''
  },
  statut: {
    type: String,
    enum: ['ouverte', 'en_cours', 'resolue', 'fermee'],
    default: 'ouverte'
  },
  priorite: {
    type: String,
    enum: ['basse', 'normale', 'haute', 'urgente'],
    default: 'normale'
  }
}, { timestamps: true });

module.exports = mongoose.model('Reclamation', reclamationSchema);
