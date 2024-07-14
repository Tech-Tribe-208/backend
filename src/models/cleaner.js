const mongoose = require('mongoose');

const cleanerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Cleaner = mongoose.model('Cleaner', cleanerSchema);

module.exports = Cleaner;