const { Router } = require('express');
const {
  createShortURL,
  redirectToShortURL,
} = require('../controllers/shortURL.controller');
const {
  dns,
  verifyProtocol,
  validateResults,
  existShortURL,
} = require('../middlewares');
const { body, param } = require('express-validator');
const routes = Router();

routes.post(
  '/shorturl',
  [
    body('url', 'An url is required').notEmpty(),
    body('url', 'url to be string').isString(),
    validateResults,
    verifyProtocol,
    dns,
  ],
  createShortURL
);

routes.get(
  '/shorturl/:short_url',
  [
    param('short_url', 'An short_url is required').notEmpty(),
    validateResults,
    existShortURL,
  ],
  redirectToShortURL
);

module.exports = routes;
