const mongoose = require('mongoose');

const cleanerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, unique: true },
  rating: { type: Number, default: 5.0 },
  phoneNumber: { type: String, required: true },
  numberOfRatings: { type: Number, default: 0 },
  available: { type: Boolean, default: true}
});

const Cleaner = mongoose.model('Cleaner', cleanerSchema);

module.exports = Cleaner;