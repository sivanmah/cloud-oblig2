const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const connectDB = require ('./dbconnect');
const cors = require('cors');

connectDB();
app.use(express.json())
app.use(cors());

//Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api', require('./routes.js'));

//Serving frontend
app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './', 'frontend', 'build', 'index.html')));
