const Users = require('../models/users.model');
const Exercises = require('../models/exercises.model');
const query = require('express/lib/middleware/query');

// create new user
const createNewUser = async (req, res) => {
  const { username } = req.body;

  // verify username is in the form
  if (!username) {
    return res.status(400).json({
      status: 400,
      message: 'Username is required',
    });
  }

  const newUser = new Users({ username });
  const result = await newUser.save();

  res.status(201).json({
    status: 201,
    result: {
      _id: result._id,
      username: result.username,
    },
  });
};

// get all users
const getAllUsers = async (req, res) => {
  await Users.find().exec(function (err, users) {
    if (err) throw err.message;
    let toObject = [];
    toObject = JSON.stringify(users);
    res.send(toObject);
  });
};

// create new exercise
const createNewExercise = async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  const existUser = await Users.findById(_id);

  if (!existUser) {
    return res.status(400).json({
      status: 400,
      message: 'This user is not exist',
    });
  }

  let dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const newExercises = new Exercises({
    username: existUser.username,
    description,
    duration: Number(duration),
    date: date || new Date().toLocaleDateString('en-US', dateOptions),
  });

  const result = await newExercises.save();

  res.status(201).json({
    status: 201,
    result: {
      _id: result._id,
      username: result.username,
      description: result.description,
      duration: result.duration,
      date: new Date(result.date).toLocaleDateString('en-US', dateOptions),
    },
  });
};

// get all logs from user
const getLogs = async (req, res) => {
  const { _id } = req.params;
  const { from = null, to = null, limit = null } = req.query;

  const existUser = await Users.findById(_id);

  // check if user exist
  if (!existUser) {
    return res.status(400).json({ status: 400, message: 'User not found' });
  }

  let query;

  if (from && to) {
    query = {
      username: existUser.username,
      date: {
        $gte: new Date(from) || undefined,
        $lte: new Date(to) || undefined,
      },
    };
  } else {
    query = {
      username: existUser.username,
    };
  }

  // find all exercise from user
  const exercisesfromUser = await Exercises.find(query).limit(limit);

  // count documents
  const count = await Exercises.find(query).limit(limit).count();

  let dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  //
  const logs = exercisesfromUser.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toLocaleDateString('en-US', dateOptions),
    };
  });

  const result = {
    username: existUser.username,
    count,
    _id: existUser._id,
    logs,
  };

  res.json(result);
};

module.exports = {
  createNewUser,
  getAllUsers,
  createNewExercise,
  getLogs,
};
