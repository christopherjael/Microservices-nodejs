const { Router } = require('express');
const {
  createNewUser,
  getAllUsers,
  createNewExercise,
  getLogs,
} = require('../controllers/users.controllers');

const routes = Router();

// create new user
routes.post('/users', createNewUser);

// get all users
routes.get('/users', getAllUsers);

// create new exercise
routes.post('/users/:_id/exercises', createNewExercise);

// get all logs from user
routes.get('/users/:_id/logs', getLogs);

module.exports = routes;
