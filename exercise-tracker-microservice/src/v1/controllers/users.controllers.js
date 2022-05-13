const Users = require('../models/users.model.js');
const Exercises = require('../models/exercises.model');

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
    _id: result._id,
    username: result.username,
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

  const newExercises = new Exercises({
    username: existUser.username,
    description,
    duration: Number(duration),
    date: date || new Date().toDateString(),
  });

  const result = await newExercises.save();

  return res.json({
    _id: existUser._id,
    username: result.username,
    date: new Date(result.date).toDateString(),
    duration: Number(duration),
    description,
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

  const log = exercisesfromUser.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    };
  });

  const result = {
    _id: existUser._id,
    username: existUser.username,
    count,
    log,
  };

  res.json(result);
};

module.exports = {
  createNewUser,
  getAllUsers,
  createNewExercise,
  getLogs,
};
