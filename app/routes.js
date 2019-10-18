var express = require('express');
var router = express.Router();
const db = require('../db');
const userMod = require('./models/userModel');
const moment = require('moment');
const ejs = require('ejs');
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
  db.query("INSERT INTO hawk.user (first_name, last_name, grade, email, team, password, create_time) VALUES ('" + first + "','" + last + "','" + grade + "','" + email + "','" + team + "','" + password + "', NOW());")
  return res.redirect('/login');
})


router.get('/login', (req, res) => {
  alert = " ";
  return res.render('login.ejs', {
    alert: alert,
    title: `Log In « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});

router.post('/loginValidate', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var alert = " ";
  var user_email = "";
  db.query("SELECT * FROM Hawk.user WHERE email = '" + email + "' AND password = '" + password + "';",  function(err, results) {
    if (err) throw err;
   else {
    if (results.length != 0) {
      return res.redirect('/home');
    } else {
      alert = "Email and Password combination not found!";
      console.log(alert);
      res.render('login.ejs', {
       alert: alert,
    });
    }
  }
});
  
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
  db.query("SELECT * FROM `Hawk`.`user` ORDER BY last_name", function (err, results) {
    if (err) throw err;
    else {
    for (var i = 0; i < results.length; i++) {
      results[i]['create_time'] = moment(results[i]['create_time']).utc().format('LL')
      if (results[i]['team'] == 1281) {
        results[i]['teamName'] = "Admin"
        results[i]['icon'] == "person"
      } else if (results[i]['team'] == 3456) {
        results[i]['teamName'] = "Programmer"
        results[i]['icon'] == "computer"
      } else if (results[i]['team' == 6789]) {
        results[i]['teamName'] = "Builder"
        results[i]['icon'] == "build"
      } else {
        results[i]['teamName'] = "Documenter"
        results[i]['icon'] == "assignment"
      }
      }
    console.log(results[0]['first_name'])
    return res.render('users.ejs', {
      length: results.length,
      results: results,
      title: `Users « ${process.env.APP_NAME}`,
      gtag: process.env.GTAG,
      dev: process.env.DEV === 'true',
      appName: process.env.APP_NAME
    });
  }
  })
  
});

router.get('/home', (req, res) => {
  db.query("SELECT Information FROM `Hawk`.`bio` WHERE email = 'omyad21@icstudents.org'; ", function(err,results){
    if(err) throw err;
    else {
      information = results[0]['Information'];
    }
  })
  db.query("SELECT first_name FROM `Hawk`.`user`", function (err, results) {
    if (err) throw err;
    else {
      username = results[0]['first_name']
      console.log(information);
      return res.render('home.ejs', {
        information: information,
        username: username,
        title: `Home « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    }
  })
  
});
router.get('/settings', (req, res) => {
  return res.render('settings.ejs', {
    title: `Settings « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/calendar', (req, res) => {
  return res.render('calendar.ejs', {
    title: `Calendar « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/help', (req, res) => {
  return res.render('help.ejs', {
    title: `Help « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/announcements', (req, res) => {
  return res.render('announcements.ejs', {
    title: `Announcements « ${process.env.APP_NAME}`,
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