const express = require('express');
const connectDB = require('./src/database/database');
const adminRouter = require('./src/routes/adminRoutes');

const app = express();

connectDB();

app.use(express.json());

const port = 3000;


// Routes
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});