const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 1;
const PORT = process.env.PORT || 33000;

var start = () => {

  const app = require('./app');

  app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}...`);
    })

}

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start);
