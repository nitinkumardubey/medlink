const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');
const User = require('../models/User');

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany(); // Optional: clear old users

    const filePath = path.join(__dirname, '..', 'assets', 'users.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(rawData);

    const salt = await bcrypt.genSalt(10);

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, salt)
      }))
    );

    await User.insertMany(hashedUsers);
    console.log('✅ Users seeded from users.json');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
