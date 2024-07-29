var mongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectDB = async () =>{
    try{
        mongoClient.connect(connectionString, function (err, db) {
        db.close();
        });
        console.log("Successfully connected to MongoDB.");
    }
    catch(err){
        console.error("Error connecting to MongoDB", err);
        throw err;
}};

module.exports = connectDB;