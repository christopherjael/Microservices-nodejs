const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const paths = {
  v1: '/api/v1/',
};

//middlewares
app.use(cors());
app.use(morgan('dev'));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './v1/views'));

// setting paths
app.use(paths.v1, require('./v1/routes/fileanalyse.routes'));
app.use('/', (req, res) => {
  res.render('index');
});

// 404 error handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});

// start the server
app.listen(PORT, () => {
  console.log('Server lintening on port ', PORT);
});
