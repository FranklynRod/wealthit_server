'use strict';

const { sequelize, Account, Asset, Liability, Networth } = require('./models');
const Router = require('./routes');
const sqlite3 = require('sqlite3').verbose();

// load modules
const express = require('express');
const morgan = require('morgan');
// var cors = require('cors')

// create the Express app
const app = express();

app.use(express.json());

//Creating DB
let db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.serialize(() => {
  db.each(`SELECT PlaylistId as id,
                  Name as name
           FROM playlists`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

//CORS connection which allows server to indicate origins
// app.use(cors())

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

console.log('Testing the connection to the database...');

(async () => {
  try {
    // Test the connection to the database
    const auth = await sequelize.authenticate();
    console.log('Connection to the database successful!');
    // Sync the models
    console.log('Synchronizing the models with the database...');
    await sequelize.sync();
  } catch(error) {
    console.log('Unable to connect to the database...');
  }
})();

// setup a global error handler
app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
      console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });
// set our port
app.set('port', process.env.PORT || 5000);
// start listening on our port
const server = app.listen(app.get('port'), () => {
console.log(`Express server is listening on port ${server.address().port}`);
});