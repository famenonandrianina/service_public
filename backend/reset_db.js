require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const resetUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Supprimer tous les utilisateurs
    await User.deleteMany({});
    console.log('✅ Tous les utilisateurs ont été supprimés.');

    // Recréer l'administrateur par défaut pour que vous puissiez gérer le site
    const admin = await User.create({
      nom: 'Administrateur',
      email: 'admin@test.com',
      motDePasse: 'admin123',
      role: 'admin',
      actif: true
    });
    
    console.log('👤 Administrateur par défaut recréé : admin@test.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur :', error);
    process.exit(1);
  }
};

resetUsers();
