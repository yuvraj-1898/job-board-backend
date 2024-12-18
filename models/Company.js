const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  industry: { type: String, required: true },
  location: { type: String, required: false },
  website: { type: String, required: false },
  logo: { type: String, required: false }, // Store URL or file path
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin or Creator
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', companySchema);
