const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  numberOfBookings: { type: Number, required: false, default: 0},
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;