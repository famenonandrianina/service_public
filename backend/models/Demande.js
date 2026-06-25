const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  statut: {
    type: String,
    enum: ['en_attente', 'en_cours', 'acceptee', 'refusee', 'terminee'],
    default: 'en_attente'
  },
  description: {
    type: String,
    required: [true, 'La description de la demande est requise']
  },
  documents: [{
    nom: String,
    chemin: String,
    type: String,
    taille: Number
  }],
  commentaireAdmin: {
    type: String,
    default: ''
  },
  dateTraitement: {
    type: Date
  },
  numero: {
    type: String,
    unique: true
  }
}, { timestamps: true });

// Auto-generate request number
demandeSchema.pre('save', async function() {
  if (!this.numero) {
    const count = await mongoose.model('Demande').countDocuments();
    this.numero = `DEM-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
  }
});

module.exports = mongoose.model('Demande', demandeSchema);
