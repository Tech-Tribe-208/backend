const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cleaning-services-syst-db', {
}).then(() => {
    console.log("Successfully connected to MongoDB.");
})
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
        throw err;
});

const db = mongoose.connection;

module.exports = db;