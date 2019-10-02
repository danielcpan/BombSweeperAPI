/* eslint no-console: 0 */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('../server/routes/index.route');
const APIError = require('./utils/APIError.utils');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env]; // eslint-disable-line import/no-dynamic-require

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true);

// Mount all routes
app.use('/api', routes);

// If error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  // Format Validation Errors into one msg
  if (err.name === 'ValidationError') {
    const validationErrorMsg = []
    for (field in err.errors) {
      validationErrorMsg.push(err.errors[field].message);
    }
    err.message = validationErrorMsg.join(',')
  }

  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status);
    return next(apiError);
  }

  return next(err);
});

// Catch 404 and forward to Error Handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// Error Handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
});

// Mongoose Connect to heroku database
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => console.log(error));
} else {
// Mongoose Connect to local database
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${config.database}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => console.log(error));
}

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

console.log(config.database);
mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = app;
