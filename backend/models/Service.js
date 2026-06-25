const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du service est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  categorie: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['identite', 'etat-civil', 'urbanisme', 'social', 'fiscal', 'autre'],
    default: 'autre'
  },
  documentsRequis: [{
    type: String
  }],
  delaiTraitement: {
    type: String,
    default: '5-10 jours ouvrables'
  },
  frais: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: 'FileText'
  },
  actif: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
