const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// setup morgan debugging
app.use(morgan('dev'));

// setup cors
app.use(cors());

const path = {
  v1: '/api/v1/',
};

app.use(path.v1, require('./v1/routes/timestamp.routes.js'));

app.use('/', (req, res) => {
  res.redirect(path.v1);
});

app.listen(PORT, () => {
  console.log('Server lintening on port ', PORT);
});
