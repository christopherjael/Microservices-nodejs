const { Router } = require('express');
const { uploadFile } = require('../controllers/fileanalyse.controller');
const routes = Router();

// route for upload file
routes.post('/fileanalyce', uploadFile);

module.exports = routes;
