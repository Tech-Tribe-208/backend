const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: {type: String, required: true, unique: true},
    date: {type: String, required: true},
    status: {type: Boolean, required: true}
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;