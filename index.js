try{
    require('dotenv').config();
}
catch(error){
    console.error('Error: ', error);
}
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/database/database');
const adminRouter = require('./src/routes/adminRoutes');
const customerRouter = require('./src/routes/customerRoutes');

const path = require('path');

const app = express();

connectDB();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(cors({
    origin: process.env.ALLOWED_CLIENTS === '*',
    credentials: true
}));

const port = process.env.PORT || 8080;

const checkPort = async (port) => {
    if (port === undefined) {
        console.error("PORT is not defined in .env file.");
        process.exit(1);
    }
}

checkPort(port);

// Routes
app.use('/admin', adminRouter);
app.use('/customer', customerRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});