
// Environmental variable config
require('dotenv').config();
process.env.DEV = process.env.NODE_ENV !== 'production';

// Node core modules
const path = require('path');

// Third party modules
const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const log4js = require('log4js');
const nunjucks = require('nunjucks');
const routes = require('./app/routes')
const fs = require('fs');
const db = require('./db');



// First party modules
const logging = require('./lib/logging');


// Express config
const app = express();





//Static Assests

const PORT = process.env.PORT || 3001;




// Nunjucks config
nunjucks.configure(path.join(process.env.APP_ROOT, 'app', 'views'), {
  autoescape: true,
  express: app
});


// Express middleware


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(log4js.connectLogger(logging.getLogger('express'), {
  level: 'auto',
  statusRules: [
    { from: 100, to: 199, level: 'debug' },
    { from: 200, to: 299, level: 'debug' },
    { from: 300, to: 399, level: 'debug' },
    { from: 400, to: 499, level: 'warn' },
    { from: 500, to: 599, level: 'error' }
  ]
}));
//Routes
app.use(favicon(path.join(process.env.APP_ROOT, 'public', 'img', 'favicon.ico')));
app.use(express.static(__dirname + '/public')); //links external js and CSS files
app.use(routes);

//app.use(express.static(__dirname + '/register'));


// Public routes
// app.use('/', require('./app/controllers/login'));
// app.use('/login', require('./app/controllers/login'));
// // Register
// app.use('/', require('./app/controllers/register'));
// // app.use('/register', require('./app/views/register'))
// app.use('/register', require('./app/controllers/register'));


// // Home Page
// app.use(require('./app/controllers/home'));
// app.use('/home', require('./app/controllers/home'));
// // Score
// app.use(require('./app/controllers/score'));
// app.use('/score', require('./app/controllers/score'));
// // Authenticated routes

// // Catch-all 404 error
// app.use(require('./app/controllers/404'));


// Start server
app.listen(PORT, () => {
  const logger = logging.getLogger('hawk');
  logger.info(`Server started on port ${PORT}`);
  logger.info(`Running in ${process.env.DEV === 'true' ? 'development' : 'production'} mode`);
});