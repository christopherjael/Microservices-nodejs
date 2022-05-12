const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./db/config');

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

const paths = {
  v1: '/api/v1/',
};

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/v1/views'));

app.use(paths.v1, require('./v1/routes/users.routes'));

app.use('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Server lintening on port ', PORT);
});
