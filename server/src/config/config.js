const dev = require('./config.dev.js');
const prod = require('./config.prod.js');

const config = process.env.NODE_ENV === 'production' ? prod : dev;

module.exports = Object.assign({
  apiUrl: 'https://openexchangerates.org/api/',
  appId: 'd5c4e9491e16449cae38dc6738d57ed7'
}, config);
