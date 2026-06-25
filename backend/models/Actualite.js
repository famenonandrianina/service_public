const mongoose = require('mongoose');

const actualiteSchema = new mongoose.Schema({
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
    default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop'
  },
  categorie: {
    type: String,
    enum: ['Inauguration', 'Social', 'Environnement', 'Agriculture', 'Général'],
    default: 'Général'
  },
  date: {
    type: Date,
    default: Date.now
  },
  statut: {
    type: String,
    enum: ['Publié', 'Brouillon'],
    default: 'Publié'
  }
}, { timestamps: true });

module.exports = mongoose.model('Actualite', actualiteSchema);
