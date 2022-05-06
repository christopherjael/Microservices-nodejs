const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

//connect to mongodb
connectDB();

const PORT = process.env.PORT || 3000;

const paths = {
  v1: '/api/v1/',
};

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// view engine
app.set('views', path.join(__dirname, './v1/views'));
app.set('view engine', 'ejs');

app.use(paths.v1, require('./v1/routers/shortURL.routes'));

// render home-page
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// page not found
app.use((req, res) => {
  res.json({
    status: '404 page not found',
  });
});

// server listening
app.listen(PORT, () => {
  console.log('Server lintening on port ', PORT);
});
