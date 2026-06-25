require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await User.countDocuments();
    const users = await User.find({}, 'nom email role actif');
    console.log(`Total users: ${count}`);
    console.log(JSON.stringify(users, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkDB();
