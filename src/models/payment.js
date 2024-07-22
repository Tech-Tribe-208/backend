const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    paymentMethod: { 
        type: String,
        enum: ['cash', 'mobile money', 'bank transfer'],
        required: true,
        default: 'cash'
    },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'paid'], 
        required: true,
        default: 'pending' 
    }
})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;