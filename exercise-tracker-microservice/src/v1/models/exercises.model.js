const { model, Schema } = require('mongoose');

const ExerciseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

module.exports = model('exercises', ExerciseSchema);
