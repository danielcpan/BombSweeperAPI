const mongoose = require('mongoose');

module.exports.clearDatabase = async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
};
