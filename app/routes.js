var express = require('express');
var router = express.Router();
const db = require('../db');
const moment = require('moment');
const passport = require('passport');
const BearerStrategy = require('passport-bearer-strategy');
router.use(express.urlencoded())
router.get('/', (req, res) => {
  return res.redirect('/login');
});

router.post('/register=True', (req, res) => {
  const grade = req.body.grade;
  console.log(db.register(grade));
  res.end();
})
router.get('/register=True', (req, res) => {
  return res.redirect('/login')
})
router.get('/submit=True', (req, res) => {
  console.log(db.register());
  return res.redirect('/home');
});

router.get('/login', (req, res) => {
  return res.render('login.ejs', {
    title: `Log In « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});


router.post('/login', passport.authenticate('local', { successRedirect: '/home',
  failureRedirect: '/login' }));

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