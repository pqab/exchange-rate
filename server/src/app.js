const express = require('express');
const app = express();
const path = require('path');

const currency = require('./route/currency');
const rate = require('./route/rate');

const config = require('./config/config');

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', config.clientUrl);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  console.log(`http request - ${req.url}`);
  next();
})

app.use('/currency', currency);
app.use('/rate', rate);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found'
  })
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message
  })
})

module.exports = app;
