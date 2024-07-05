const express = require('express');
const { connectMongoDB } = require('./connection');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const path = require('path');

const app = express();

const PORT = 8002;

connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => {
    console.log('MongoDB connected');
});

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', staticRoute)
app.use('/url', urlRoute);

app.listen(PORT, () => {
    console.log(`App is running on PORT: ${PORT}`);
})