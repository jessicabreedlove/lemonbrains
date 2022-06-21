const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, console.log(`App listening on port ${port}`));
