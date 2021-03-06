
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
const routes = require('./app/routes/routes')
const simulationRoutes = require('./app/routes/simulationRoutes');
const apiRoutes = require('./app/routes/apiRoutes')
const scoutRoutes = require('./app/routes/scoutRoutes')
const scoringRoutes = require('./app/routes/scoringRoutes')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const db = require('./app/db')
const json = require('./app/json')
const methodOverride = require('method-override')
const initializePassport = require('./app/controllers/authenticate')



// First party modules
const logging = require('./lib/logging');


// Express config
const app = express();

app.locals.id = null;



//Static Assests

const PORT = process.env.PORT || 80;




// Express middleware
app.use(favicon(path.join(process.env.APP_ROOT, 'public', 'img', 'favicon.ico')));

app.set('views', path.join(__dirname, 'app', 'views')); 
app.set('partials', path.join(__dirname, 'app', 'partials'));
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


initializePassport(passport)


app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: "fhfonzzkzjldxpjnwbjc",
  resave: false, 
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// app.use(apiRoutes);
app.use(scoringRoutes)
app.use(scoutRoutes)
app.use(apiRoutes)
app.use(simulationRoutes)
app.use(routes);





// Start server
app.listen(PORT, () => {
  const logger = logging.getLogger('hawk');
  logger.info(`Server started on port ${PORT}`);
  logger.info(`Running in ${process.env.DEV === 'true' ? 'development' : 'production'} mode`);
});

module.exports = app;