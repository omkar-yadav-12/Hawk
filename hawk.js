
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
const ejs = require('ejs');
const fs = require('fs');
const db = require('./db');



// First party modules
const logging = require('./lib/logging');


// Express config
const app = express();

app.locals.id = null;



//Static Assests

const PORT = process.env.PORT || 3001;




// Express middleware
app.use(favicon(path.join(process.env.APP_ROOT, 'public', 'img', 'favicon.ico')));
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');
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
 //favicon

app.use(express.static(__dirname + '/public')); //links external js and CSS files

app.use(routes);


// Start server
app.listen(PORT, () => {
  const logger = logging.getLogger('hawk');
  logger.info(`Server started on port ${PORT}`);
  logger.info(`Running in ${process.env.DEV === 'true' ? 'development' : 'production'} mode`);
});

module.exports = app;