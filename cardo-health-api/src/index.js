const cors = require('./cors.js');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');
const logger = require('morgan');
const port = 3001;

const app = express();
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(function (tokens, req, res) {
    return [
      tokens.url(req, res),
      tokens.status(req, res),
      '-',
      tokens.res(req, res, 'content-length'), 
      '-',
      tokens['response-time'](req, res), 'ms',
      '-',
      (req.user ? (req.user._id) : "")
    ].join(' ')
}));

routes.init(app);

app.listen(port, () => {
    console.log(`API Listening at port: ${port}`)
});