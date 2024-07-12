const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;