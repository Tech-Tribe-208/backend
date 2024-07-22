const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');

const adminRouter = express.Router();

adminRouter.use(express.json());

const Admin = require('../models/admin');
const Cleaner = require('../models/cleaner');
const Customer = require('../models/customer');
const Service = require('../models/service');
const Booking = require('../models/booking');

// Admin signup
adminRouter.post('/signup', async (req, res) => {
    try{
        const {username, fullName, password, password2, email} = req.body;
        const existingAdmin = await Admin.findOne({username});
        if(!existingAdmin){
            if(password == password2){
                const newAdmin = new Admin({username, fullName, password: bcrypt.hashSync(password, 8), email});
                await newAdmin.save();
                res.status(200).json({responseCode: '200', responseMessage: 'Admin created successfully'});
            }
            else{
                res.status(400).json({responseCode: '303', responseMessage: 'Passwords do not match'})
            }
        }
        else{
            res.status(409).json({responseCode: '300', responseMessage: 'Admin already exists in the database'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

// Admin login
adminRouter.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const admin = await Admin.findOne({username}).select('+password');
        if(admin){
            if(bcrypt.compareSync(password, admin.password)){
                res.status(200).json({responseCode: '200', responseMessage: 'Admin login successful'})
            }
            else{
                res.status(401).json({responseCode: '401', responseMessage: 'Invalid password'})
            }
        }
        else{
            res.status(404).json({responseCode: '404', responseMessage: 'Admin not found'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

// Create a cleaner
adminRouter.post('/create-cleaner', async (req, res) => {
    try{
        const {username, fullName, password, password2, email} = req.body;
        const existingClener = await Cleaner.findOne({username});
        if(!existingClener){
            if(password == password2){
                const newCleaner = new Cleaner({username, fullName, password: bcrypt.hashSync(password, 8), email});
                await newCleaner.save();
                res.status(200).json({responseCode: '200', responseMessage: 'Cleaner created successfully'});
            }
            else{
                res.status(400).json({responseCode: '303', responseMessage: 'Passwords do not match'})
            }
        }
        else{
            res.status(409).json({responseCode: '300', responseMessage: 'Cleaner already exists in the database'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

// Get all cleaners
adminRouter.get('/cleaners', async (req, res) => {
    try{
        res.status(200).json({responseCode: '200', responseMessage: 'Cleaners found', cleaners: await Cleaner.find()})
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

// Get a cleaner by id
adminRouter.get('/cleaners/:id', async (req, res) => {
    try{
        const cleanerId = req.params.id;
        const cleaner = await Cleaner.findById(cleanerId);
        if(cleaner){
            res.status(200).json({responseCode: '200', responseMessage: 'Cleaner found', cleaner})
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

// Get all customers
adminRouter.get('/customers', async (req, res) => {
    try{
        res.status(200).json({responseCode: '200', responseMessage: 'Customers found', cleaners: await Customer.find()})
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

// Get a customer by id
adminRouter.get('/customers/:id', async (req, res) => {
    try{
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId);
        if(customer){
            res.status(200).json({responseCode: '200', responseMessage: 'Customer found', customer})
        }
        else{
            res.status(404).json({responseCode: '404', responseMessage: 'Customer not found'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    }
});

// Create a service
adminRouter.post('/services', async (req, res) => {
    try{
        const {name, category, price} = req.body;
        const existingService = await Service.findOne({name});
        if(!existingService){
            const newService = new Service({name, category, price});
            await newService.save();
            res.status(200).json({responseCode: '200', responseMessage: 'Service created successfully'});
        }
        else{
            res.status(409).json({responseCode: '300', responseMessage: 'Service already exists in the database'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    
    }
});

// Get all services
adminRouter.get('/services', async (req, res) => {
    try{
        res.status(200).json({responseCode: '200', responseMessage: 'Services found', services: await Service.find()})
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    
    }
});

// Get a service by id
adminRouter.get('/services/:id', async (req, res) => {
    try{
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId);
        if(service){
            res.status(200).json({responseCode: '200', responseMessage: 'Service found', service})
        }
        else{
            res.status(404).json({responseCode: '404', responseMessage: 'Service not found'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
        console.error(error);
    
    }
});

// Get all bookings
adminRouter.get('/bookings', async (req, res) => {
    try{
        res.status(200).json({responseCode: '200', responseMessage: 'Bookings found', bookings: await Booking.find()});
    }
    catch(error){
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
    }
});

// Get a booking by ID
adminRouter.get('/bookings/:id', async (req, res) => {
    try{
        const bookingId = req.params.id;
        const booking = await Booking.findOne({bookingId});
        if(booking){
            res.status(200).json({responseCode: '200', responseMessage: 'Booking found', responseData: booking})
        }
        else{
            res.status(404).json({responseCode: '404', responseMessage: 'Booking not found'})
        }
    }
    catch{
        res.status(500).json({responseCode: '101', responseMessage: 'fatal error'});
    }
})

module.exports = adminRouter;