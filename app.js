const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./DB/connect');
const products = require('./routes/products')
const port = process.env.PORT || 4000
// middleware
app.use(express.json());

//routes
app.use("/api/v1/products", products);

// product routes
app.use(errorHandler);
app.all("*", notFound);


const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening at ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};

start()