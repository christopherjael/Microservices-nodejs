const { model, Schema } = require('mongoose');

const UsersSchema = new Schema({
  username: { type: 'string', require: true },
});

module.exports = model('users', UsersSchema);
