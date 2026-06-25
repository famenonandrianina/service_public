const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, "L'image est requise"]
  },
  categorie: {
    type: String,
    default: 'commune'
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
