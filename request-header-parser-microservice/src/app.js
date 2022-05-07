const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;

const paths = {
  v1: '/api/v1/',
};

// middlewares
app.use(cors());
app.use(morgan('dev'));

// enable trust proxy
app.set('trust proxy', true);

// routes
app.use(paths.v1, require('./v1/routes/whoami.routes'));

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'page not found',
  });
});

app.listen(PORT, () => {
  console.log('Server lintening on port ', PORT);
});
