const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Doctor = require('../models/doctor');
const connectDB = require('../config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const seedDoctors = async () => {
  try {
    // Load data from JSON file
    const doctorsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../assets/doctors.json'), 'utf-8')
    );

    // Clear existing doctors (optional but usually best for seeding)
    await Doctor.deleteMany();

    // Insert new doctors
    await Doctor.insertMany(doctorsData);

    console.log('✅ Doctors data seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDoctors();
