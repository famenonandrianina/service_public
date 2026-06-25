require('dotenv').config();
const mongoose = require('mongoose');
const ServicePublic = require('./models/ServicePublic');
const Actualite = require('./models/Actualite');

const seedServicePublic = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🌱 Début du seeding Services Publics...');

    await ServicePublic.deleteMany();
    await Actualite.deleteMany();

    const services = await ServicePublic.create([
      {
        titre: 'Maison France Services',
        description: 'Un guichet unique pour vous accompagner dans vos démarches administratives du quotidien (CAF, Impôts, Assurance Maladie, etc.).',
        categorie: 'Administration',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
        icone: 'HiOutlineOfficeBuilding'
      },
      {
        titre: 'Démarches administratives',
        description: 'Accédez à toutes vos démarches en ligne : État civil, Urbanisme, Élections et plus encore.',
        categorie: 'Administration',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
        icone: 'FiFileText'
      },
      {
        titre: 'Distribution gratuite des bacs à ordures',
        description: 'Récupérez votre bac à ordures gratuitement pour contribuer à la propreté de notre ville.',
        categorie: 'Environnement',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
        icone: 'MdDeleteOutline'
      },
      {
        titre: 'Épicerie solidaire Douka Latru',
        description: 'Un soutien alimentaire pour les familles en difficulté, proposant des produits de qualité à prix réduits.',
        categorie: 'Solidarité',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
        icone: 'MdStorefront'
      },
      {
        titre: 'Services sociaux',
        description: 'Accompagnement personnalisé pour vos droits sociaux et aides spécifiques à la commune.',
        categorie: 'Social',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
        icone: 'MdVolunteerActivism'
      },
      {
        titre: 'Appels à projets agricoles',
        description: 'Soutien aux agriculteurs locaux à travers des parcelles dédiées et des aides au développement.',
        categorie: 'Agriculture',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
        icone: 'MdAgriculture'
      }
    ]);

    const actualites = await Actualite.create([
      {
        titre: 'Inauguration Maison France Services',
        description: 'La nouvelle Maison France Services de Tsararano a ouvert ses portes pour simplifier vos démarches.',
        categorie: 'Inauguration',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
      },
      {
        titre: 'Projets agricoles innovants',
        description: 'De nouvelles parcelles ont été attribuées pour favoriser l\'agriculture durable à Dembéni.',
        categorie: 'Agriculture',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop'
      },
      {
        titre: 'Actions sociales renforcées',
        description: 'L\'épicerie solidaire étend ses horaires pour mieux servir la communauté.',
        categorie: 'Social',
        image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&auto=format&fit=crop'
      },
      {
        titre: 'Amélioration des services publics',
        description: '90% des démarches administratives sont désormais accessibles via notre portail numérique.',
        categorie: 'Général',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'
      }
    ]);

    console.log('✅ Seeding Services Publics & Actualités terminé !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur seeding:', err);
    process.exit(1);
  }
};

seedServicePublic();
