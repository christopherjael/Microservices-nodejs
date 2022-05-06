const { Router } = require('express');
//chaching
const cache = require('../middlewares/chaching');

const {
  getCurrentDate,
  getDate,
} = require('../controllers/timestamp.controller');

const route = Router();

// get current date
route.get('/', getCurrentDate);

// get current
route.get('/:date', cache(10), getDate);

module.exports = route;
