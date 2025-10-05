const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  specialization: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

module.exports = mongoose.model('Category', categorySchema);
