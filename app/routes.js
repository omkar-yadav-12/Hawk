var express = require('express');
var router = express.Router();
const db = require('../db');
const userMod = require('./models/userModel');
const moment = require('moment');
const ejs = require('ejs');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
global.ID;
global.ID = null;
global.validate;
global.validate = false;

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
});
router.post('/dataEdit/update/:dataId', (req, res) => {

  for (var key in req.body) {
    if (req.body[key] == 'on')
      req.body[key] = 1
  }
  console.log(req.body.found)
  db.query("UPDATE hawk.score_data SET team1_name = '" + req.body.team_one + "', team2_name = '" + req.body.team_two + "', match_num = '" + req.body.match + "', field = '" + req.body.field + "', skystone1 = '" + req.body.skystone1 + "', skystone2 = '" + req.body.skystone2 + "', skystone3 = '" + req.body.skystone3 + "', skystone4 = '" + req.body.skystone4 + "', skystone5 = '" + req.body.skystone5 + "', skystone6 = '" + req.body.skystone6 + "', stone1 = '" + req.body.stone1 + "', stone2 = '" + req.body.stone2 + "', stone3 = '" + req.body.stone3 + "', stone4 = '" + req.body.stone4 + "', stone5 = '" + req.body.stone5 + "', stone6 = '" + req.body.stone6 + "', none1 = '" + req.body.none1 + "', none2 = '" + req.body.none2 + "', none3 = '" + req.body.none3 + "', none4 = '" + req.body.none4 + "', none5 = '" + req.body.none5 + "', none6 = '" + req.body.none6 + "', frs = '" + req.body.FRS + "', fr = '" + req.body.FS + "', r1n = '" + req.body.R1N + "', r2n = '" + req.body.R2N + "', returned_auto = '" + req.body.ReturnedAuto + "', placed_auto = '" + req.body.PlacedAuto + "', delivered = '" + req.body.delivered_number + "', tallest_sky = '" + req.body.tallest_skyscraper + "', returned_drs = '" + req.body.returned_name + "', placed_drs = '" + req.body.placed + "', found_moved = '" + req.body.found + "', cap1 = '" + req.body.Capstone1 + "', cap2 = '" + req.body.Capstone2 + "', parked1 = '" + req.body.Parked1 + "', parked2 = '" + req.body.Parked2 + "', r1n = '" + req.body.robot1_level + "', r2n = '" + req.body.robot2_level + "', minor = '" + req.body.minor + "', major = '" + req.body.major + "', team1_0 = '" + req.body.team1_0 + "', team1_1 = '" + req.body.team1_1 + "', team1_2 = '" + req.body.team1_2 + "', team2_0 = '" + req.body.team2_0 + "', team2_1 = '" + req.body.team2_1 + "', team2_2 = '" + req.body.team2_2 + "'WHERE id = " + req.params.dataId);
  return res.redirect('/scoringData')
});

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
router.post('/score=?', (req, res) => {
  db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
    if (err) throw err;
    else {
      var total = 0;
      for (var key in req.body) {
        if (req.body[key] == 'on')
          req.body[key] = 1
        total += req.body[key];
      }
      total += (req.body.tallest_skyscraper * 2);
      if (req.body.Capstone1 == 1) {
        total += (5 + req.body.robot1_level);
      }
      if (req.body.Capstone2 == 1) {
        total += (5 + req.body.robot2_level);
      }
      console.log(total);
      name = (results[0]['first_name'] + " " + results[0]['last_name']);
      db.query("INSERT INTO hawk.score_data(alliance, team1_name, team2_name, match_num, field, skystone1, skystone2, skystone3, skystone4, skystone5, skystone6, stone1, stone2, stone3, stone4, stone5, stone6, none1, none2, none3, none4, none5, none6, frs, fr, r1n, r2n, returned_auto, placed_auto, delivered, tallest_sky, returned_drs, placed_drs, found_moved, cap1, cap2, parked1, parked2, r1l, r2l, minor, major, team1_0, team1_1, team1_2, team2_0, team2_1, team2_2, create_time, Author) VALUES ('" + req.body.alliance + "','" + req.body.team_one + "','" + req.body.team_two + "','" + req.body.match + "','" + req.body.field + "','" + req.body.skystone1 + "','" + req.body.skystone2 + "','" + req.body.skystone3 + "','" + req.body.skystone4 + "','" + req.body.skystone5 + "','" + req.body.skystone6 + "','" + req.body.stone1 + "','" + req.body.stone2 + "','" + req.body.stone3 + "','" + req.body.stone4 + "','" + req.body.stone5 + "','" + req.body.stone6 + "','" + req.body.none1 + "','" + req.body.none2 + "','" + req.body.none3 + "','" + req.body.none4 + "','" + req.body.none5 + "','" + req.body.none6 + "','" + req.body.FRS + "','" + req.body.FS + "','" + req.body.R1N + "','" + req.body.R2N + "','" + req.body.ReturnedAuto + "','" + req.body.PlacedAuto + "','" + req.body.delivered_number + "','" + req.body.tallest_skyscraper + "','" + req.body.returned_name + "','" + req.body.placed + "','" + req.body.found + "','" + req.body.Capstone1 + "','" + req.body.Capstone2 + "','" + req.body.Parked1 + "','" + req.body.Parked2 + "','" + req.body.robot1_level + "','" + req.body.robot2_level + "','" + req.body.minor + "','" + req.body.major + "','" + req.body.team1_0 + "','" + req.body.team1_1 + "','" + req.body.team1_2 + "','" + req.body.team2_0 + "','" + req.body.team2_1 + "','" + req.body.team2_2 + "', NOW(), '" + name + "');");
      total_points = req.body.tallest_skyscraper * 2;
      console.log(total_points)
      return res.redirect('/score');
    }
  });
});
router.post('/scout=?', (req, res) => {
  db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
    if (err) throw err;
    else {
      for (var key in req.body) {
        if (req.body[key] == 'on')
          req.body[key] = 1
      }
      name = (results[0]['first_name'] + " " + results[0]['last_name']);
      console.log(req.body);
      db.query("INSERT INTO hawk.scout_data(team_number, event_name, author, create_time, move_auto, sense_auto, over_auto, collect_auto, place_auto, found_auto_d, sense_auto_d, park_auto_d, stone_auto_d, add_auto_d, found_teleop, collect_teleop, palce_teleop, found_teleop_d, stone_teleop_d, add_teleop_d, found_end, in_end, over_end, place_end, found_end_d, parki_end_d, stones_end_d, add_end_d) VALUES ('" + req.body.team_num + "','" + req.body.event_name + "','" + name + "', NOW() ,'" + req.body.MF + "','" + req.body.SS + "','" + req.body.PDZ + "','" + req.body.CS + "','" + req.body.FS + "','" + req.body.expand1 + "','" + req.body.expand2 + "','" + req.body.expand3 + "','" + req.body.expand4 + "','" + req.body.add_auto + "','" + req.body.MF_ + "','" + req.body.CS_ + "','" + req.body.FS_ + "','" + req.body.expand_1 + "','" + req.body.expand_2 + "','" + req.body.additional_teleop_label + "','" + req.body.MF_EG + "','" + req.body.SS_EG + "','" + req.body.PDZ_EG + "','" + req.body.FS_EG + "','" + req.body.expand__1 + "','" + req.body.expand__2 + "','" + req.body.expand__3 + "','" + req.body.additional_end_label + "');");
      return res.redirect('/scout');
    }
  });
});
router.get('/dataEdit/delete/:dataId', (req, res) => {
  console.log("GO")
  db.query("DELETE FROM score_data WHERE id  = " + req.params.dataId, function (err) {
    if (err) throw err;
    else {
      return res.redirect('/scoringData')
    }
  });
});
router.get('/scoutDownload', (req, res) => {
  db.query("SELECT * FROM `Hawk`.`scout_data` ORDER BY create_time DESC", function (err, results) {
    if (err) throw err;
    else {
      for (var i = 0; i < results.length; i++) {
        results[i]['create_time'] = moment(results[i]['create_time']).format('LLLL')
      }
      const jsonData = JSON.parse(JSON.stringify(results));
      const csvFields = ['alliance', 'team1_name', 'team2_name', 'match_num', 'field', 'skystone1', 'skystone2', 'skystone3', 'skystone4', 'skystone5', 'skystone6', 'stone1', 'stone2', 'stone3', 'stone4', 'stone5', 'stone6', 'none1', 'none2', 'none3', 'none4', 'none5', 'none6', 'frs', 'fr', 'r1n', 'r2n', 'returned_auto', 'placed_auto', 'delivered', 'tallest_sky', 'returned_drs', 'placed_drs', 'found_moved', 'cap1', 'cap2', 'parked1', 'parked2', 'r1l', 'r2l', 'minor', 'major', 'team1_0', 'team1_1', 'team1_2', 'team2_0', 'team2_1', 'team2_2', 'create_time', 'Author'];
      const json2csvParser = new Json2csvParser({ csvFields });
      const csv = json2csvParser.parse(jsonData);
      fs.writeFile('ScoutingEntries.csv', csv, function (err) {
        if (err) throw err;
        console.log("File saved");
      })
      return res.redirect('/data')

    }
  });
});
router.get('/dataDownload', (req, res) => {
  db.query("SELECT REPLACE ('undefined', 'undefined', 'off')", function (err) {
    if (err) throw err;
  });
  db.query("SELECT * FROM `Hawk`.`score_data` ORDER BY create_time DESC", function (err, results) {
    if (err) throw err;
    else {
      console.log(results[0][0])
      for (var i = 0; i < results.length; i++) {
        results[i]['create_time'] = moment(results[i]['create_time']).format('LLLL')
      }
      const jsonData = JSON.parse(JSON.stringify(results));
      console.log(jsonData);
      const csvFields = ['alliance', 'team1_name', 'team2_name', 'match_num', 'field', 'skystone1', 'skystone2', 'skystone3', 'skystone4', 'skystone5', 'skystone6', 'stone1', 'stone2', 'stone3', 'stone4', 'stone5', 'stone6', 'none1', 'none2', 'none3', 'none4', 'none5', 'none6', 'frs', 'fr', 'r1n', 'r2n', 'returned_auto', 'placed_auto', 'delivered', 'tallest_sky', 'returned_drs', 'placed_drs', 'found_moved', 'cap1', 'cap2', 'parked1', 'parked2', 'r1l', 'r2l', 'minor', 'major', 'team1_0', 'team1_1', 'team1_2', 'team2_0', 'team2_1', 'team2_2', 'create_time', 'Author'];
      const json2csvParser = new Json2csvParser({ csvFields });
      const csv = json2csvParser.parse(jsonData);
      fs.writeFile('DataEntries.csv', csv, function (err) {
        if (err) throw err;
        console.log("File saved");
      })
      return res.redirect('/data')

    }
  });
});



router.post('/loginValidate', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  req.body = JSON.parse(JSON.stringify(req.body));
  var alert = " ";
  db.query("SELECT * FROM Hawk.user WHERE email = '" + email + "' AND password = '" + password + "';", function (err, results) {
    if (err) throw err;
    else {
      if (results.length != 0) {
        global.ID = results[0]['email'];
        global.validate = true;
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

router.get('/logout', (req, res) => {
  global.validate = false;
  global.ID = null;
  return res.redirect('/')
})


router.get('/register', (req, res) => {
  return res.render('register.ejs', {
    title: `Register « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/dataView/:dataId', (req, res) => {
  db.query("SELECT * FROM score_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    else {
      console.log(results)
      return res.render('dataView.ejs', {
        results: results,
        title: `View Data « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    }
  })
});
router.get('/scoutView/:dataId', (req, res) => {
  db.query("SELECT * FROM scout_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    else {
      results[0]['add_teleop_d'] = results[0]['found_auto_d'].toString();
      results[0]['add_end_d'] = results[0]['found_end_d'].toString();
      console.log(results)
      return res.render('scoutView.ejs', {
        results: results,
        title: `Scout Data « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    }
  })
});
router.get('/dataEdit/:dataId', (req, res) => {
  db.query("SELECT * FROM score_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    else {
      console.log(results)
      return res.render('dataEdit.ejs', {
        results: results,
        title: `Edit Data « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    }
  })
});
router.get('/scoutEdit/:dataId', (req, res) => {
  db.query("SELECT * FROM scout_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    else {
      console.log(results[0]['team1_name'])
      return res.render('scoutEdit.ejs', {
        results: results,
        title: `Edit Data « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    }
  })
});
router.get('/users', (req, res) => {
  console.log(global.validate)
  if (global.validate == true) {
    db.query("SELECT * FROM `Hawk`.`user` ORDER BY last_name", function (err, results) {
      if (err) throw err;
      else {
        for (var i = 0; i < results.length; i++) {
          results[i]['create_time'] = moment(results[i]['create_time']).
            format('LL')
          if (results[i]['team'] == 1281) {
            results[i]['teamName'] = "Admin"
            results[i]['icon'] == "person"
          } else if (results[i]['team'] == 3456) {
            results[i]['teamName'] = "Programmer"
            results[i]['icon'] == "computer"
          } else if (results[i]['team'] == 6789) {
            results[i]['teamName'] = "Builder"
            results[i]['icon'] == "build"
          } else {
            results[i]['teamName'] = "Documenter"
            results[i]['icon'] == "assignment"
          }
        }
        return res.render('users.ejs', {
          color: "red",
          length: results.length,
          results: results,
          title: `Users « ${process.env.APP_NAME}`,
          gtag: process.env.GTAG,
          dev: process.env.DEV === 'true',
          appName: process.env.APP_NAME
        });
      }
    })
  } else {
    return res.redirect('/')
  }

});

router.get('/home', (req, res) => {
  if (global.validate == true) {
    db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
      for (var i = 0; i < results.length; i++) {
        results[i]['create_time'] = moment(results[i]['create_time']).format('LL')
      }
      if (err) throw err;
      else {
        return res.render('home.ejs', {
          results: results,
          title: `Home « ${process.env.APP_NAME}`,
          gtag: process.env.GTAG,
          dev: process.env.DEV === 'true',
          appName: process.env.APP_NAME
        });
      }
    })
  } else {
    return res.redirect('/')
  }
});
router.get('/settings', (req, res) => {

  if (global.validate == true) {
    db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
      for (var i = 0; i < results.length; i++) {
        results[i]['create_time'] = moment(results[i]['create_time']).format('LL')
      }
      if (err) throw err;
      else {
        return res.render('settings.ejs', {
          results: results,
          title: `Settings « ${process.env.APP_NAME}`,
          gtag: process.env.GTAG,
          dev: process.env.DEV === 'true',
          appName: process.env.APP_NAME
        });
      }
    })
  } else {
    return res.redirect('/')
  }
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
router.get('/scoutingData', (req, res) => {
  db.query("SELECT * FROM `Hawk`.`scout_data` ORDER BY create_time DESC", function (err, results) {
    if (err) throw err;
    else {
      for (var i = 0; i < results.length; i++) {
        results[i]['create_time'] = moment(results[i]['create_time']).format('LLLL')
      }
      return res.render('scoutingData.ejs', {
        results: results,
        title: `Scouting Data « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    }
  })
});
router.get('/teamData', (req, res) => {
  return res.render('teamData.ejs', {
    title: `Team « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/data', (req, res) => {
  return res.render('data.ejs', {
    title: `Data « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/scout', (req, res) => {
  if (global.validate == true) {
  return res.render('scout.ejs', {
    date: moment().format('LLL'),
    see: false,
    title: `Scout « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
} else {
  return res.redirect('/');
}
});
router.get('/tournamentData', (req, res) => {
  return res.render('tournamentData.ejs', {
    title: `Tournament Data « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/background', (req, res) => {
  return res.render('background.ejs', {
    title: `Tournament Data « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});
router.get('/scoreBlue', (req, res) => {
  if (global.validate == true) {
    return res.render('scoreBlue.ejs', {
      title: `Blue Score « ${process.env.APP_NAME}`,
      gtag: process.env.GTAG,
      dev: process.env.DEV === 'true',
      appName: process.env.APP_NAME
    });
  } else {
    return res.redirect('/login')
  }
});
router.get('/scoreRed', (req, res) => {
  if (global.validate == true) {
    db.query("SELECT Name FROM `Hawk`.`events`", function (err, results) {
      console.log(results[0]['Name'] + " " + results.length);
      return res.render('scoreRed.ejs', {
        results: results,
        title: `Red Score « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    })
  } else {
    return res.redirect('/login')
  }
});
router.get('/scoringData', (req, res) => {
  if (global.validate == true) {
  db.query("SELECT * FROM `Hawk`.`score_data` ORDER BY create_time DESC", function (err, results) {
    if (err) throw err;
    else {
      for (var i = 0; i < results.length; i++) {
        results[i]['create_time'] = moment(results[i]['create_time']).format('LLLL')
      }

      return res.render('scoringData.ejs', {
        results: results,
        title: `Scoring Data « ${process.env.APP_NAME}`,
        gtag: process.env.GTAG,
        dev: process.env.DEV === 'true',
        appName: process.env.APP_NAME
      });
    }
  })
} else { 
  return res.redirect('/');
}
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