const bcrypt = require('bcrypt');
const express = require('express');

const cleanerRouter = express.Router();
cleanerRouter.use(express.json());

const Cleaner = require('../models/cleaner');
const Booking = require('../models/booking');


cleanerRouter.post('/login', async (req, res) => {
    try{
        console.log('we\'re in the try block');
        const {username, password} = req.body;
        const cleaner = await Cleaner.findOne({username}).select('+password');
        if(cleaner){
            console.log('we\'ve found the cleaner');
            if(bcrypt.compareSync(password, cleaner.password)){
                console.log('cleaner\'s password is correct');
                res.status(200).json({responseCode: '200', responseMessage: 'Cleaner login successful'})
            }
            else{
                console.log('cleaner\'s password is wrong');
                res.status(401).json({responseCode: '401', responseMessage: 'Invalid password'})
            }
        }
        else{
            res.status(404).json({responseCode: '404', responseMessage: 'Cleaner not found'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

cleanerRouter.get('/bookings', async (req, res) => {
    try{
        console.log('we\'re in the try block');
        res.status(200).json({responseCode: '200', responseMessage: 'Bookings found', bookings: await Booking.find()});
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
})

cleanerRouter.post('/bookings', async (req, res) => {
    try{
        console.log('we\'re in the try block');
        const {bookingId, status} = req.body;
        const booking = await Booking.findOne
        ({bookingId});
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
})

cleanerRouter.patch('/bookings/:bookingId', async (req, res) => {
    try{
        console.log('we\'re in the try block');
        const {bookingId} = req.params;
        const {bookingStatus} = req.body;
        const booking = await Booking.findOne({bookingId});
        if(booking){
            console.log('we\'ve found the booking');
            const bookingStatuses = ['pending', 'accepted', 'declined', 'in progress', 'completed', 'pending payment', 'cancelled'];
            if(!bookingStatuses.includes(bookingStatus)){
                console.log('invalid booking status');
                return res.status(400).json({responseCode: '400', responseMessage: 'Invalid booking status'});
            }
            if (['completed', 'cancelled'].includes(booking.bookingStatus)) {
                console.log('booking status cannot be updated');
                return res.status(400).json({ responseCode: '400', responseMessage: 'Booking status cannot be updated' });
            }
            booking.bookingStatus = bookingStatus;
            await booking.save();
            res.status(200).json({responseCode: '200', responseMessage: 'Booking status updated', responseData: booking});
        }
        else{
            console.log('we didn\'t find the booking');
            res.status(404).json({responseCode: '404', responseMessage: 'Booking not found'});
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
})

module.exports = cleanerRouter;