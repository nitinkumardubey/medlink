const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Category = require('../models/category');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const seedCategories = async () => {
  try {
    // Read categories JSON file
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../assets/categories.json'), 'utf-8')
    );

    // Remove existing categories to avoid duplicates
    await Category.deleteMany();

    // Insert new categories into MongoDB
    await Category.insertMany(categoriesData);

    console.log('✅ Categories data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding categories failed:', error);
    process.exit(1);
  }
};

seedCategories();
