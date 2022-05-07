const { Router } = require('express');
const { whoami } = require('../controllers/whoami.controller');
const routes = Router();

routes.get('/whoami', whoami);

module.exports = routes;
