const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: {type: String, required: true, unique: true},
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    cleanerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cleaner'}, // cleanerId will only be added when a cleaner accepts the booking
    date: {type: Date, required: true, default: Date.now},
    duration: {type: Number, required: true},
    bookingStatus: { 
        type: String, 
        enum: ['pending', 'accepted', 'declined', 'in progress', 'completed', 'pending payment', 'cancelled'], 
        required: true,
        default: 'pending' 
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;