require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectDB = async () =>{
    try{
        await mongoose.connect(connectionString);
        console.log("Successfully connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to MongoDB", err);
        throw err;
}};

module.exports = connectDB;