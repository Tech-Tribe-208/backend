const express = require('express');
const connectDB = require('./src/database/database');
const adminRouter = require('./src/routes/adminRoutes');
const cleanerRouter = require('./src/routes/cleanerRoutes');
const customerRouter = require('./src/routes/customerRoutes');

const app = express();

connectDB();

app.use(express.json());

const port = 3000;


// Routes
app.use('/admin', adminRouter);
app.use('/cleaner', cleanerRouter);
app.use('/customer', customerRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});