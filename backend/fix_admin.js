require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find admin or create it
    let admin = await User.findOne({ email: 'admin@test.com' });
    
    if (admin) {
      admin.motDePasse = 'admin123';
      admin.actif = true;
      admin.role = 'admin';
      await admin.save();
      console.log('Admin password reset to: admin123');
    } else {
      await User.create({
        nom: 'Administrateur',
        email: 'admin@test.com',
        motDePasse: 'admin123',
        role: 'admin',
        actif: true
      });
      console.log('Admin created with password: admin123');
    }
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetAdmin();
