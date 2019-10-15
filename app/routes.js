var express = require('express');
var router = express.Router();
const db = require('../db');
const moment = require('moment');
const passport = require('passport');
const BearerStrategy = require('passport-bearer-strategy');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
router.use(express.urlencoded())
router.get('/', (req, res) => {
  return res.redirect('/login');
});

router.post('/register=True', (req, res) => {
  var first = req.body.first_name;
  var last = req.body.last_name;
  var grade = req.body.grade;
  var email = req.body.email;
  var team = req.body.team;
  var password = req.body.password;
  console.log(db.register(first, last, grade, email, team, password));
  return res.redirect('/login');
})


router.get('/login', (req, res) => {
  return res.render('login.ejs', {
    title: `Log In « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});

router.post('/loginValidate', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if ((db.login(email, password)) == true) {
    return res.redirect('/home')
  } else {
    return res.redirect('/login')
  }
  
})

router.get('/register', (req, res) => {
  return res.render('register.ejs', {
    title: `Register « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/users', (req, res) => {
  console.log(db.users());
  return res.render('users.ejs', {
    title: `Users « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});

router.get('/home', (req, res) => {
  return res.render('home.ejs', {
    title: `Home « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});

router.get('/score', (req, res) => {
  return res.render('score.ejs', {
    title: `Score « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});



router.use((req, res) => {
  return res.format({
    text: () => {
      return res.status(404).send('Error 404: Not found');
    },
    html: () => {
      return res.status(404).render('404.ejs', {
        title: 'Error 404: Not found',
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true'
      });
    },
    json: () => {
      return res.status(404).send({
        code: 404,
        error: 'Error 404: Not found'
      });
    },
    default: () => {
      return res.sendStatus(404);
    }
  });
});

module.exports = router;