const { connect } = require('mongoose');

module.exports = async () => {
  try {
    console.log(process.env.PORT);
    await connect(process.env.MONGODB_URI);
    console.log('Database connection established');
  } catch (error) {
    throw new Error(error.message);
  }
};
