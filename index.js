const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', require('./routes/router'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
