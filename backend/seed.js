require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const Annonce = require('./models/Annonce');
const Gallery = require('./models/Gallery');
const Demande = require('./models/Demande');
const Reclamation = require('./models/Reclamation');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🌱 Début du seeding complet...');

    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Annonce.deleteMany();
    await Gallery.deleteMany();
    await Demande.deleteMany();
    await Reclamation.deleteMany();

    // Create Admin
    const admin = await User.create({
      nom: 'Admin Principal',
      email: 'admin@test.com',
      motDePasse: 'admin123',
      role: 'admin',
      telephone: '0269611111',
      adresse: 'Mairie de Dembéni'
    });
    console.log('👤 Admin créé: admin@test.com / admin123');

    // Create Citizen
    const citizen = await User.create({
      nom: 'Said Moussa',
      email: 'citoyen@test.com',
      motDePasse: 'citoyen123',
      role: 'citoyen',
      telephone: '0639010203',
      adresse: 'Quartier Tsararano, Dembéni'
    });
    console.log('👤 Citoyen créé: citoyen@test.com / citoyen123');

    // Create Services
    const servicesList = [
      {
        nom: "Acte de Naissance",
        description: "Demande de copie intégrale ou d'extrait d'acte de naissance.",
        categorie: 'etat-civil',
        documentsRequis: ["Pièce d'identité en cours de validité"],
        delaiTraitement: "2-3 jours ouvrables"
      },
      {
        nom: "Carte Nationale d'Identité",
        description: "Première demande ou renouvellement de CNI.",
        categorie: 'identite',
        documentsRequis: ["Justificatif de domicile", "2 photos d'identité", "Ancienne CNI"],
        delaiTraitement: "4-6 semaines"
      },
      {
        nom: "Passeport",
        description: "Demande de passeport biométrique.",
        categorie: 'identite',
        documentsRequis: ["Photo d'identité", "Timbre fiscal", "Justificatif de domicile"],
        delaiTraitement: "4-8 semaines"
      }
    ];

    const services = await Service.create(servicesList);
    console.log('📋 Services créés');

    // Create Sample Demandes SEQUENTIALLY to avoid duplicate number race condition
    const demande1 = new Demande({
      utilisateur: citizen._id,
      service: services[0]._id, 
      description: "Besoin d'un acte de naissance pour mon dossier de mariage.",
      statut: 'en_cours'
    });
    await demande1.save();

    const demande2 = new Demande({
      utilisateur: citizen._id,
      service: services[1]._id,
      description: "Renouvellement suite à perte de mon ancienne carte.",
      statut: 'en_attente'
    });
    await demande2.save();

    console.log('📝 Demandes créées');

    // Create Sample Reclamations
    await Reclamation.create([
      {
        utilisateur: citizen._id,
        sujet: "Éclairage Public",
        message: "Le lampadaire devant ma maison à Tsararano est en panne depuis une semaine.",
        priorite: 'normale',
        statut: 'ouverte'
      },
      {
        utilisateur: citizen._id,
        sujet: "Ramassage des ordures",
        message: "La benne n'est pas passée ce matin dans ma rue.",
        priorite: 'haute',
        statut: 'en_cours'
      }
    ]);
    console.log('⚠️ Réclamations créées');

    // Create Gallery Items
    await Gallery.create([
      {
        titre: "Hôtel de Ville",
        description: "La mairie de Dembéni sous le soleil.",
        imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=800",
        categorie: "bâtiments"
      },
      {
        titre: "Paysage de Tsararano",
        description: "Vue panoramique sur la commune.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
        categorie: "paysages"
      }
    ]);
    console.log('🖼️ Galerie photos peuplée');

    // Create Annonces
    await Annonce.create([
      {
        titre: "Plateforme Numérique Dembéni",
        contenu: "Bienvenue sur le nouveau portail citoyen officiel.",
        categorie: 'info',
        auteur: admin._id
      }
    ]);
    console.log('📢 Annonces créées');

    console.log('✅ Seeding complet terminé avec succès !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur seeding:', err);
    process.exit(1);
  }
};

seedData();
