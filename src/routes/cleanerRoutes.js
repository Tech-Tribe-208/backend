const bcrypt = require('bcrypt');
const express = require('express');

const cleanerRouter = express.Router();
cleanerRouter.use(express.json());

const Cleaner = require('../models/cleaner');


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

module.exports = cleanerRouter;