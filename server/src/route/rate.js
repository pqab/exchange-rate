const express = require('express');
const router = express.Router();
const axios = require('axios');

const config = require('../config/config');

router.get('/latest', (req, res, next) => {
  axios.get(`${config.apiUrl}latest.json?app_id=${config.appId}&base=${'USD' || req.query.base}`)
    .then((response) => {
      res.json(response.data.rates);
    })
    .catch((err) => {
      next(err);
    });
});

router.param('date', function(req, res, next, date) {
  if (date.match(/^\d{4}-\d{2}-\d{2}$/g))
    next();
  else
    next(new Error(`Invalid date - ${date}`));
});

router.get('/historical/:date', (req, res, next) => {
  axios.get(`${config.apiUrl}historical/${req.params.date}.json?app_id=${config.appId}&base=${'USD' || req.query.base}`)
    .then((response) => {
      res.json(response.data.rates);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
