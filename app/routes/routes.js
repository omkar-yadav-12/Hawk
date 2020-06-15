
var express = require('express');
var router = express.Router();
const db = require('../db');
const user = require('../controllers/users');
const moment = require('moment');
const calendarController = require('../controllers/calendar');
const other = require('../controllers/other')
const authenticate = require('../controllers/authenticate')
const passport = require('passport')
router.get('/settings/edit', checkAuthenticated, (req, res) => {
  return res.render('misc/settingsEdit', {
    results: req.user
  });
});
router.get('/', checkNotAuthenticated, (req, res) => {
  return res.redirect('/login');
});
router.post('/register=True', checkNotAuthenticated, (req, res) => {
  user.register(req, res)
});

router.post('/teamEdit/update/:dataId', checkAuthenticated, (req, res) => {
  db.query("UPDATE hawk.team SET team_number = " + req.body.team_number + ", name = '" + req.body.name + "', school = '" + req.body.school + "', location = '" + req.body.location + "', league = '" + req.body.league + "'WHERE idteam = " + req.params.dataId);
  return res.redirect('/teamData')
});

router.post('/settings/:dataId', checkAuthenticated, (req, res) => {
  db.query("UPDATE user SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name + "', email =  '" + req.body.email + "', grade = '" + req.body.grade + "', password = '" + req.body.password + "' WHERE id =  '" + req.params.dataId + "';", function (err, results) {
    if (err) throw err;
  })
  return res.redirect('/settings')
});

router.get('/login', checkNotAuthenticated, (req, res) => {
  alert = " ";
  return res.render('main/login.ejs', {
    alert: alert,
  });
});

router.get('/teamEdit/delete/:dataId', checkAuthenticated, (req, res) => {
  db.delete("team", ["idteam"], [req.params.dataId], null, function (err) {
    return res.redirect('misc/teamData')
  })
});

router.post('/loginValidate', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}))

router.delete('/logout', checkAuthenticated, (req, res) => {
  req.logOut()
  res.redirect('/')
})


router.post('/team=True', checkAuthenticated, (req, res) => {
  db.query("INSERT INTO Hawk.team(team_number, name, school, location, league) VALUES (" + req.body.team_number + ",'" + req.body.name + "','" + req.body.school + "','" + req.body.location + "','" + req.body.league + "');");
  return res.redirect('/newTeam');
})
router.post('/tourney=True', checkAuthenticated, (req, res) => {
  req.body.date = moment(req.body.date).format('YYYY/MM/DD')
  db.query("INSERT INTO Hawk.events(Name, Location, Date, Type) VALUES ('" + req.body.name + "','" + req.body.location + "','" + req.body.date + "','" + req.body.type + "');");
  return res.redirect('/newTourney');
})
router.get('/register', checkNotAuthenticated, (req, res) => {
  return res.render('main/register.ejs');
});

router.get('/teamEdit/:dataId', checkAuthenticated, (req, res) => {
  db.get(null, "team", ["idteam"], [req.params.dataId], null, null, function (err, results) {
    return res.render('misc/teamEdit.ejs', {
      results: results,
    })
  })
});
router.get('/users', checkAuthenticated, (req, res) => {
  user.user_list(res)
});
router.get('/drop', checkAuthenticated, (req, res) => {
  return res.render('drop', {
    data: [""],
    name: ["", ""]
  })
})
router.get('/home', checkAuthenticated, (req, res) => {
  console.log(req.user.first_name.length)
  return res.render('main/home.ejs', {
    disable: false,
    results: req.user,
})
});
router.get('/settings', checkAuthenticated, (req, res) => {
  req.user.name = moment(req.user.name).format('LL')
  return res.render('misc/settings.ejs', {
    results: req.user,
  });
});


router.get('/calendar', checkAuthenticated, (req, res) => {
  calendarController.get_calendar;
  return res.render('main/calendar.ejs', {
    names: "UPPPP",
  });
});

router.get('/help', checkAuthenticated, (req, res) => {
  return res.render('main/help.ejs', {
  });
});
router.get('/announcements', checkAuthenticated, (req, res) => {
  return res.render('main/announcements.ejs', {
  });
});

router.get('/teamData', checkAuthenticated, (req, res) => {
  db.get(null, "team", null, null, null, "team_number", function (err, results) {
    return res.render('misc/teamData.ejs', {
      results: results,
    });
  })
});

router.get('/data', checkAuthenticated, (req, res) => {
    return res.render('misc/data.ejs');
});


router.get('/newTeam', checkAuthenticated, (req, res) => {
  return res.render('misc/team.ejs', {
    results: ["", "", "", "", ""]
  })
});
router.get('/newTourney', checkAuthenticated, (req, res) => {
  return res.render('misc/tournament.ejs', {
    now: moment().format('LLL'),
  });
});
router.get('/tournamentData', checkAuthenticated, (req, res) => {
  other.tournamentData(res)
});
router.get('/background', checkAuthenticated, (req, res) => {
  return res.render('main/background.ejs', {
  });
});
router.get('/localData', checkAuthenticated, (req, res) => {
  return res.render('misc/localData.ejs', {
  });
});

router.get('/disable', checkAuthenticated, (req, res) => {
  db.update("user", ["dis"], [1], ["email"], [JSON.stringify(ID)], null, function (err, results) {
    return res.redirect('/home')
  })
});
router.get('/enable', checkAuthenticated, (req, res) => {
  db.update("user", ["dis"], [0], ["email"], [JSON.stringify(ID)], null, function (err, results) {
    return res.redirect('/home')
  })
});

function checkAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/home')
  }
  next()
}

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