const express = require('express');
const router = express.Router();
const axios = require('axios');

const config = require('../config/config');

router.get('/', (req, res, next) => {
  axios.get(`${config.apiUrl}currencies.json?`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
