const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Time out after 5s instead of 30s
    });
    
    console.log(`✅ MongoDB Branché: ${conn.connection.host}`);
    
    // Gestion des événements de connexion
    mongoose.connection.on('error', err => {
      console.error(`❌ Erreur post-connexion MongoDB: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB déconnecté. Tentative de reconnexion...');
    });

  } catch (error) {
    console.error(`❌ ÉCHEC CONNEXION MONGODB: ${error.message}`);
    // En production, on veut souvent relancer le processus pour que le Cloud orchestrator redémarre le container
    process.exit(1);
  }
};

module.exports = connectDB;
