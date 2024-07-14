const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/cleaning-services-syst-db');
        console.log("Successfully connected to MongoDB.");
    }
    catch(err){
        console.error("Error connecting to MongoDB", err);
        throw err;
}};

module.exports = connectDB;