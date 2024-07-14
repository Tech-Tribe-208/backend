const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use(express.json());

const Admin = require('../models/admin');
const Cleaner = require('../models/cleaner');

// admin
router.post('/admin/signup', async (req, res) => {
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

router.post('/admin/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const admin = await Admin.findOne({username});
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

router.post('/admin/create-cleaner', async (req, res) => {
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

module.exports = router;