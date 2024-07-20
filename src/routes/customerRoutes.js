const express = require('express');
const bcrypt = require('bcrypt');

const customerRouter = express.Router();
customerRouter.use(express.json());

const Customer = require('../models/customer');
const Booking = require('../models/booking');

customerRouter.post('/signup', async (req, res) => {
    try{
        console.log('we\'re in the try block');
        const {username, fullName, password, password2, email} = req.body;
        const existingCustomer = await Customer.findOne({ $or: [{ username }, { email }] });

        if(!existingCustomer){
            console.log('we didn\'t find an existing customer so we\'re creating a new customer');
            if(password == password2){
                console.log('passwords match');
                const newCustomer = new Customer({username, fullName, password: bcrypt.hashSync(password, 8), email});
                await newCustomer.save();
                res.status(200).json({responseCode: '200', responseMessage: 'Customer created successfully'});
            }
            else{
                console.log('passwords don\'t match');
                res.status(400).json({responseCode: '303', responseMessage: 'Passwords do not match'})
            }
        }
        else{
            console.log('we found an existing customer');
            res.status(409).json({responseCode: '300', responseMessage: 'Customer already exists in the database'})
        }
    }
    catch(err){
        console.log('we\'re in the catch block');
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(err);
    }
});

customerRouter.post('/login', async (req, res) => {
    try{
        console.log('we\'re in the try block');
        const {username, password} = req.body;
        const customer = await Customer.findOne({username}).select('+password');
        if(customer){
            console.log('we\'ve found the customer');
            if(bcrypt.compareSync(password, customer.password)){
                console.log('the customer\'s password is correct');
                res.status(200).json({responseCode: '200', responseMessage: 'Customer login successful'})
            }
            else{
                console.log('the customer\'s password is wrong');
                res.status(401).json({responseCode: '401', responseMessage: 'Invalid password'})
            }
        }
        else{
            res.status(404).json({responseCode: '404', responseMessage: 'Customer not found'})
        }
    }
    catch(err){
        console.log('we\'re in the catch block');
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(err);
    }
});

customerRouter.post('/bookings', async (req, res) => {
    try{
        console.log('we\'re in the try block');
        const {bookingId, customerId, serviceId, date, bookingStatus} = req.body;
        const existingBooking = await Booking.findOne({bookingId});
        if(!existingBooking){
            console.log('booking does not exist so we\'re creating a new one');
            const newBooking = new Booking({bookingId, customerId, serviceId, date, bookingStatus});
            await newBooking.save();
            res.status(200).json({responseCode: '200', responseMessage: 'Booking created successfully', responseData: newBooking});
        }
        else{
            console.log(`an existing booking was found so we can\'t create a new one ${existingBooking}`)
            res.status(409).json({responseCode: '409', responseMessage: 'Booking already exists in the database'});
        }
    }
    catch(error){
        console.log('we\'re in the catch block');
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

module.exports = customerRouter;