
var express = require('express');
var router = express.Router();
const db = require('./db');
const user = require('./controllers/users');
const moment = require('moment');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const calendarController = require('./controllers/calendar');
const score = require('./controllers/score');
const http = require('http');
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const https = require('https');
const simal = require('./controllers/simulation');
const fetch = require('node-fetch')
const headers = {
  'Content-Type': 'application/json',
  'X-TOA-KEY': 'afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8',
  'X-Application-Origin': 'hawk',
}
var Request = require("request");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const { API } = require('@the-orange-alliance/api');
const api = new API("afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8", "hawk");

global.ID;
global.ID = null;
global.validate;
router.get('/api/event/:keyword', (req, res) => {
  fetch('http://theorangealliance.org/api/event', {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(json => {
      let array = []
      for (var obj in json) {
        if (json[obj].event_name.includes(req.params.keyword)) {
          json[obj].start_date = moment(json[obj].start_date).format('MM-DD-YYYY')
          array.push(json[obj]);
        }
      }
      
      res.render('api/tournamentApi.ejs', {
        array: array,
        keyword: req.params.keyword
      })

    })
    .catch(error => {
        res.redirect('/apiData')
    });
});
go = function (link) {
  if (global.validate) return res.redirect(link)
  else return res.redirect('/login')
}
global.validate = false;
var now = moment().format("hh:mm:ss");
router.get("/update", function (req, res) {
  return res.redirect("/api/update")
})
router.get("/api/update", function (req, res) {
  console.log("Update Started")
  db.query("SELECT team_number FROM `Hawk`.`team`; ", function (err, results) {
    results = [results[0]]
    for (obj in results) {
      let id = results[obj]['team_number']
      fetch('http://theorangealliance.org/api/team/' + id + "/wlt", {
        method: 'get',
        headers,
      })
        .then(res => res.json())
        .then(json => updatePercentage(id, json))
          .catch((error) => console.error(error))
    }
  });
  db.query("SELECT team_number FROM `Hawk`.`team`; ", function (err, results) {
    results = [results[0]]
    for (obj in results) {
      let id = results[obj]['team_number']
      fetch('http://theorangealliance.org/api/team/' + id + '/results/1920', {
        method: 'get',
        headers,
      })
        .then(res => {
          console(res);
          return res.json()
        }
        )
        .then(json => updateOpr(id, json)
        )
    }
  })


  updatePercentage = function (id, parameters) {
    console.log( parameters);
    if (id != undefined && id != null) {
      let percentage = Math.round((parameters[0]["wins"] + .5 * parameters[0]["ties"]) / (parameters[0]["wins"] + parameters[0]["losses"] + parameters[0]["ties"]) * 10000.0) / 10000.0
      console.log("Percentage")
      db.query("UPDATE team SET wl = " + percentage + "WHERE team_number = " + id);
    }

  }
  updateOpr = function (id, parameters) {
    console.log(parameters)
    if (id != undefined && id != null) {
      let average = 0;

      for (var i = 0; i < parameters.length; i++) {
        average += parameters[i]['opr'];
      }
      average /= parameters.length;
      average = Math.round(average * 100.0) / 100.0;
      console.log("OPR " + average + " " + id)
      db.query("UPDATE team SET opr = " + average + " WHERE team_number = " + id)
    }

  }

  console.log("Update Ended")
  return res.redirect('/simulation')
});

router.get('/settings/edit', (req, res) => {
  db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
    for (var i = 0; i < results.length; i++) {
      results[i]['create_time'] = moment(results[i]['create_time']).format('LL')
    }
    return res.render('settingsEdit', {
      results: results
    });
  });
});
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
function check(value) {
  if (value == 'on') return (1)
  else return (0);
}
router.post('/dataEdit/update/:dataId', (req, res) => {
  console.log(check(req.body.R1N))
  console['log'](req['body'])
  db.query("UPDATE hawk.score_data SET team1_name = '" + req.body.team_one + "', team2_name = '" + req.body.team_two + "', event_name = '" + req.body.event_name + "', match_num = '" + req.body.match + "', field_num = '" + req.body.field + "', skystone1 = '" + check(req.body.skystone1) + "', skystone2 = '" + check(req.body.skystone2) + "', skystone3 = '" + check(req.body.skystone3) + "', skystone4 = '" + check(req.body.skystone4) + "', skystone5 = '" + check(req.body.skystone5) + "', skystone6 = '" + check(req.body.skystone6) + "', stone1 = '" + check(req.body.stone1) + "', stone2 = '" + check(req.body.stone2) + "', stone3 = '" + check(req.body.stone3) + "', stone4 = '" + check(req.body.stone4) + "', stone5 = '" + check(req.body.stone5) + "', stone6 = '" + check(req.body.stone6) + "', none1 = '" + check(req.body.none1) + "', none2 = '" + check(req.body.none2) + "', none3 = '" + check(req.body.none3) + "', none4 = '" + check(req.body.none4) + "', none5 = '" + check(req.body.none5) + "', none6 = '" + check(req.body.none6) + "', frs = '" + check(req.body.FRS) + "', fr = '" + check(req.body.FS) + "' , r1n = " + check(req.body.R1N) + " , r2n = " + check(req.body.R2N) + ", returned_auto = '" + req.body.ReturnedAuto + "', placed_auto = '" + req.body.PlacedAuto + "', delivered = '" + req.body.delivered_number + "', tallest_sky = '" + req.body.tallest_skyscraper + "', returned_drs = '" + req.body.returned_name + "', placed_drs = '" + req.body.placed + "', found_moved = '" + check(req.body.found) + "', cap1 = '" + check(req.body.Capstone1) + "', cap2 = '" + check(req.body.Capstone2) + "', parked1 = '" + check(req.body.Parked1) + "', parked2 = '" + check(req.body.Parked2) + "', r1n = '" + req.body.robot1_level + "', r2n = '" + req.body.robot2_level + "', minor = '" + req.body.minor + "', major = '" + req.body.major + "', team1_0 = '" + check(req.body.team1_0) + "', team1_1 = '" + check(req.body.team1_1) + "', team1_2 = '" + check(req.body.team1_2) + "', team2_0 = '" + check(req.body.team2_0) + "', team2_1 = '" + check(req.body.team2_1) + "', team2_2 = '" + check(req.body.team2_2) + "'WHERE id = " + req.params.dataId);
  db.query("UPDATE score_data SET r1n = " + check(req.body.R1N) + " , r2n = " + check(req.body.R2N) + " WHERE id = " + req.params.dataId)
  return res.redirect('/scoringData')
});
router.post('/teamEdit/update/:dataId', (req, res) => {
  db.query("UPDATE hawk.team SET team_number = " + req.body.team_number + ", name = '" + req.body.name + "', school = '" + req.body.school + "', location = '" + req.body.location + "', league = '" + req.body.league + "'WHERE idteam = " + req.params.dataId);
  return res.redirect('/teamData')
});
router.post('/settings/:dataId', (req, res) => {
  console.log(req.body)
  db.query("UPDATE user SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name + "', email =  '" + req.body.email + "', grade = '" + req.body.grade + "', password = '" + req.body.password + "' WHERE id =  '" + req.params.dataId + "';", function (err, results) {
    if (err) throw err;
  })
  return res.redirect('/settings')
});

router.post('/scoutttEdit/update/:dataId', (req, res) => {
  //db.query("UPDATE hawk.scout_data SET team_number = '" + req.body.team_num + "', move_auto = '" + req.body.MF + "', sense_auto = '" + req.body.SS + "', over_auto = '" + req.body.PDZ + "', collect_auto = '" + req.body.CS + "', place_auto = '" + req.body.FS + "', found_auto_d = '" + req.body.expand1 + "', sense_auto_d = '" + req.body.expand2 + "', add_auto_d = '" + req.body.expand3 + "', found_teleop = '" + req.body.expand4 + "', collect_teleop = '" + req.body.add_auto + "', palce_teleop = '" + req.body.MF_ + "', found_teleop_d = '" + req.body.CS_ + "', stone_teleop_d = '" + req.body.FS_ + "', add_teleop_d = '" + req.body.expand_1 + "', found_end = '" + req.body.expand_2 + "', in_end = '" + req.body.additional_teleop + "', over_end = '" + req.body.MF_EG + "', place_end = '" + req.body.SS_EG + "', found_end_d = '" + req.body.PDZ_EG + "', parki_end_d = '" + req.body.FS_EG + "', stones_end_d = '" + req.body.expand__1 + "', add_end_d = '" + req.body.expand__2 + "', fr = '" + req.body.expand__3 + "', r1n = '" + req.body.additional_end + "', r2n = '" + req.body.R2N + "', returned_auto = '" + req.body.ReturnedAuto + "', placed_auto = '" + req.body.PlacedAuto + "', delivered = '" + req.body.delivered_number + "', tallest_sky = '" + req.body.tallest_skyscraper + "', returned_drs = '" + req.body.returned_name + "', placed_drs = '" + req.body.placed + "', found_moved = '" + req.body.found + "', cap1 = '" + req.body.Capstone1 + "', cap2 = '" + req.body.Capstone2 + "', parked1 = '" + req.body.Parked1 + "', parked2 = '" + req.body.Parked2 + "', r1n = '" + req.body.robot1_level + "', r2n = '" + req.body.robot2_level + "', minor = '" + req.body.minor + "', major = '" + req.body.major + "', team1_0 = '" + req.body.team1_0 + "', team1_1 = '" + req.body.team1_1 + "', team1_2 = '" + req.body.team1_2 + "', team2_0 = '" + req.body.team2_0 + "', team2_1 = '" + req.body.team2_1 + "', team2_2 = '" + req.body.team2_2 + "'WHERE id = " + req.params.dataId);
  return res.redirect('/scoutingData')
});
router.get('/team/add/:value', (req, res) => {
  id = req.params.value
  if (id != null && id != undefined) {
    fetch('http://theorangealliance.org/api/team/' + id, {
      method: 'get',
      headers,
    })
      .then(res => res.json())
      .then(json => send(json, id));
    let results = [];
    send = function (data, id) {
      let results1 = ["", "", "", "", id];
      if (data.length != undefined) {
        results1[0] = (data[0]['team_name_short']);
        results1[1] = (data[0]["team_name_long"])
        results1[2] = (data[0]["city"] + " " + data[0]["state_prov"])
        results1[3] = (data[0]["league_key"])
        results = results1
        return res.render('team.ejs', {
          results: results
        });
        res.send({ results: results })
      }
    }


  }
  else {
    return res.render('team.ejs', {
      results: results
    });
  }
  console.log(results)


})
router.get('/login', (req, res) => {
  alert = " ";
  return res.render('login.ejs', {
    alert: alert,
    title: `Log In « ${process.env.APP_NAME}`,

  });
});
router.get('/scouttt', (req, res) => {
  alert = " ";
  return res.render('scout.ejs', {
    alert: alert,
    title: `Log In « ${process.env.APP_NAME}`,

  });
});
router.post('/score=?', (req, res) => {
  db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
    if (err) throw err;
    else {

      var types = ["skystone", "stone", "none"];
      name = (results[0]['first_name'] + " " + results[0]['last_name']);
      db.query("INSERT INTO hawk.score_data(alliance, team1_name, team2_name, event_name, match_num, field_num, skystone1, skystone2, skystone3, skystone4, skystone5, skystone6, stone1, stone2, stone3, stone4, stone5, stone6, none1, none2, none3, none4, none5, none6, frs, fr, r1n, r2n, returned_auto, placed_auto, delivered, tallest_sky, returned_drs, placed_drs, found_moved, cap1, cap2, parked1, parked2, r1l, r2l, minor, major, team1_0, team1_1, team1_2, team2_0, team2_1, team2_2, create_time, author) VALUES ('" + req.body.alliance + "','" + req.body.team_one + "','" + req.body.team_two + "','" + req.body.event_name + "','" + req.body.match + "','" + req.body.field + "','" + check(req.body.skystone1) + "','" + check(req.body.skystone2) + "','" + check(req.body.skystone3) + "','" + check(req.body.skystone4) + "','" + check(req.body.skystone5) + "','" + check(req.body.skystone6) + "','" + check(req.body.stone1) + "','" + check(req.body.stone2) + "','" + check(req.body.stone3) + "','" + check(req.body.stone4) + "','" + check(req.body.stone5) + "','" + check(req.body.stone6) + "','" + check(req.body.none1) + "','" + check(req.body.none2) + "','" + check(req.body.none3) + "','" + check(req.body.none4) + "','" + check(req.body.none5) + "','" + check(req.body.none6) + "','" + check(req.body.FRS) + "','" + check(req.body.FS) + "','" + check(req.body.R1N) + "','" + check(req.body.R2N) + "','" + req.body.ReturnedAuto + "','" + req.body.PlacedAuto + "','" + req.body.delivered_number + "','" + req.body.tallest_skyscraper + "','" + req.body.returned_name + "','" + req.body.placed + "','" + check(req.body.found) + "','" + check(req.body.Capstone1) + "','" + check(req.body.Capstone2) + "','" + check(req.body.Parked1) + "','" + check(req.body.Parked2) + "','" + req.body.robot1_level + "','" + req.body.robot2_level + "','" + req.body.minor + "','" + req.body.major + "','" + check(req.body.team1_0) + "','" + check(req.body.team1_1) + "','" + check(req.body.team1_2) + "','" + check(req.body.team2_0) + "','" + check(req.body.team2_1) + "','" + check(req.body.team2_2) + "', NOW(), '" + name + "');");
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
      db.query("INSERT INTO hawk.scout_data(team_number, event_name, author, create_time, move_auto, sense_auto, over_auto, collect_auto, place_auto, found_auto_d, sense_auto_d, park_auto_d, stone_auto_d, add_auto_d, found_teleop, collect_teleop, palce_teleop, found_teleop_d, stone_teleop_d, add_teleop_d, found_end, in_end, over_end, place_end, found_end_d, parki_end_d, stones_end_d, add_end_d) VALUES ('" + req.body.team_num + "','" + req.body.event_name + "','" + req.body.author + "', NOW() ,'" + req.body.MF + "','" + req.body.SS + "','" + req.body.PDZ + "','" + req.body.CS + "','" + req.body.FS + "','" + req.body.expand1 + "','" + req.body.expand2 + "','" + req.body.expand3 + "','" + req.body.expand4 + "','" + req.body.add_auto + "','" + req.body.MF_ + "','" + req.body.CS_ + "','" + req.body.FS_ + "','" + req.body.expand_1 + "','" + req.body.expand_2 + "','" + req.body.additional_teleop_label + "','" + req.body.MF_EG + "','" + req.body.SS_EG + "','" + req.body.PDZ_EG + "','" + req.body.FS_EG + "','" + req.body.expand__1 + "','" + req.body.expand__2 + "','" + req.body.expand__3 + "','" + req.body.additional_end_label + "');");
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
router.get('/scoutEdit/delete/:dataId', (req, res) => {
  console.log("GO")
  db.query("DELETE FROM scout_data WHERE id  = " + req.params.dataId, function (err) {
    if (err) throw err;
    else {
      return res.redirect('/scoutingData')
    }
  });
});
router.get('/teamEdit/delete/:dataId', (req, res) => {
  db.query("DELETE FROM team WHERE idteam  = " + req.params.dataId, function (err) {
    if (err) throw err;
    else {
      return res.redirect('/teamData')
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
      console.log(jsonData);
      const csvFields = ['team_number', 'event_name', 'author', 'create_time', 'move_auto', 'sense_auto', 'over_auto', 'collect_auto', 'place_auto', 'found_auto_d', 'sense_auto_d', 'park_auto_d', 'stone_auto_d', 'add_auto_d', 'found_teleop', 'collect_teleop', 'palce_teleop', 'found_teleop_d', 'stone_teleop_d', 'add_teleop_d', 'found_end', 'in_end', 'over_end', 'place_end', 'found_end_d', 'parki_end_d', 'stones_end_d', 'add_end_d'];
      const json2csvParser = new Json2csvParser({ csvFields });
      const csv = json2csvParser.parse(jsonData);
      fs.writeFile('ScoutingEntries.csv', csv, function (err) {
        if (err) throw err;
        console.log("File saved");
      });
      return res.redirect('/data')

    }
  });
});
router.get('/dataDownload', (req, res) => {
  db.query("SELECT * FROM `Hawk`.`score_data` ORDER BY create_time DESC", function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      results[i]['create_time'] = moment(results[i]['create_time']).format('LLLL')
    }
    const jsonData = JSON.parse(JSON.stringify(results));
    const csvFields = ['alliance', 'team1_name', 'team2_name', 'match_num', 'field_num', 'skystone1', 'skystone2', 'skystone3', 'skystone4', 'skystone5', 'skystone6', 'stone1', 'stone2', 'stone3', 'stone4', 'stone5', 'stone6', 'none1', 'none2', 'none3', 'none4', 'none5', 'none6', 'frs', 'fr', 'r1n', 'r2n', 'returned_auto', 'placed_auto', 'delivered', 'tallest_sky', 'returned_drs', 'placed_drs', 'found_moved', 'cap1', 'cap2', 'parked1', 'parked2', 'r1l', 'r2l', 'minor', 'major', 'team1_0', 'team1_1', 'team1_2', 'team2_0', 'team2_1', 'team2_2', 'create_time', 'author'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonData);
    fs.writeFile('DataEntries.csv', csv, function (err) {
      if (err) throw err;
      console.log(csv);
      console.log("File saved");
    })
    return res.redirect('/data')
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

router.post('/team=True', (req, res) => {
  db.query("INSERT INTO Hawk.team(team_number, name, school, location, league) VALUES (" + req.body.team_number + ",'" + req.body.name + "','" + req.body.school + "','" + req.body.location + "','" + req.body.league + "');");
  return res.redirect('/newTeam');
})
router.post('/tourney=True', (req, res) => {
  req.body.date = moment(req.body.date).format('YYYY/MM/DD')
  console.log(req.body.date);
  for (key in req.body) {
    console.log(req.body[key].toString());
  }
  db.query("INSERT INTO Hawk.events(Name, Location, Date, Type) VALUES ('" + req.body.name + "','" + req.body.location + "','" + req.body.date + "','" + req.body.type + "');");
  return res.redirect('/newTourney');
})
router.get('/register', (req, res) => {
  return res.render('register.ejs', {
    title: `Register « ${process.env.APP_NAME}`,

  });
});
router.get('/dataView/:dataId', (req, res) => {
  console.log(req.params.dataId)
  db.query("SELECT * FROM score_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    if (results.length > 0) {
      console.log(results)
      return res.render('dataView.ejs', {
        results: results,
        title: `View Data « ${process.env.APP_NAME}`,

      });
    } else {
      return res.redirect('/scoringData')
    }

  })
});
router.get('/Test/:dataId', (req, res) => {
  db.query("SELECT * FROM score_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    else {
      console.log(results)
      return res.render('splitTest.ejs', {
        results: results,
        title: `View Data « ${process.env.APP_NAME}`,

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
      return res.render('scoutttView.ejs', {
        results: results,
      });
    }
  })
});
router.get('/dataEdit/:dataId', (req, res) => {
  db.query("SELECT * FROM score_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    else {
      if (results.length > 0) {
        return res.render('dataEdit.ejs', {
          results: results
        });
      }
    }
  })
});
router.get('/scoutEdit/:dataId', (req, res) => {
  try {
    db.query("SELECT * FROM scout_data WHERE id = " + req.params.dataId, function (err, results) {
      if (results.length > 0) {
        db.query("SELECT * FROM events", function (err, events) {
          db.query("SELECT * FROM team", function (err, teams) {
            intend = results[0]['team_number'];
            needed = results[0]['event_name'];
            results[0]['add_teleop_d'] = results[0]['found_auto_d'].toString();
            results[0]['add_end_d'] = results[0]['found_end_d'].toString();
            console.log(results[0]['team1_name'])
            var name = [];
            for (var i = 0; i < teams.length; i++) {
              name.push("(" + teams[i]['team_number'] + ") " + teams[i]['name'])
            }
            return res.render('scoutttEdit.ejs', {
              events: events,
              intend: intend,
              needed: needed,
              teams: teams,
              results: results,
              name: name,
            });
          })

        })
      } else {
        return res.redirect("/tournamentData")
      }


    })
  } catch (error) {
    console.log("error")
    console.error(error);
    return res.redirect('/scoutingData')
  }
});
router.get('/teamEdit/:dataId', (req, res) => {
  db.query("SELECT * FROM team WHERE idteam = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    else {
      return res.render('teamEdit.ejs', {
        results: results,
        title: `Edit Data « ${process.env.APP_NAME}`,

      });
    }
  })
});
router.get('/users', (req, res) => {
  console.log(global.validate)
  // if (global.validate == true) {
  db.query("SELECT * FROM `Hawk`.`user` ORDER BY last_name", function (err, results) {
    if (err) throw err;
    user.user_list(results);
    return res.render('userss.ejs', {
      color: "red",
      length: results.length,
      results: results,
      title: `Users « ${process.env.APP_NAME}`,

    });
  })
});
router.get('/drop', (req, res) => {
  return res.render('drop', {
    data: [""],
    name: ["", ""]
  })
})
router.get('/home', (req, res) => {
  if (global.validate == true) {
    db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
      for (var i = 0; i < results.length; i++) {
        results[i]['create_time'] = moment(results[i]['create_time']).format('LL')
      }

      if (err) throw err;
      else {
        return res.render('home.ejs', {
          disable: false,
          results: results,

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
        });
      }
    })
  } else {
    return res.redirect('/')
  }
});
router.post('/simulation=?', (req, res) => {
  db.query("SELECT * FROM team", function (err, team) {
    var results = [];
    for (var i = 0; i < team.length; i++) {
      if (req.body[i] == 'on') results.push(team[i])
    }
    return res.render('tab.ejs', {
      final: simal.opr(results)[0],
      scores: simal.opr(results)[1],
    });
  })
});
router.get('/other', (req, res) => {
  return res.render('api/otherSimal')
});
router.get('/api/:key/1920/matches', (req, res) => {
  let array = [];
  fetch('http://theorangealliance.org/api/team/' + req.params.key + '/matches/1920', {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(match => {
      console.log(array)
      for (let i = 0; i < match.length; i++) {
        fetch('http://theorangealliance.org/api/team/' + req.params.key + '/matches/1920', {
          method: 'get',
          headers,
      })
      .then(res => res.json())
      .then(json => array.push(json))
      }
      console.log(array.length)
      res.send(array)
    });
});
returnMatches = (matchKeys) => {
  console.log(matchKeys[0])
  let matchData = [];
  let x = ""
  for (let i = 0; i < matchKeys.length; i++) {
    api.getMatchDetails(matchKeys[i]).then((match) => {
      try {
        x += match
        matchData[i] = match
      }
      catch (e) {
        throw (e)
      }
      
    })
  }

  return matchData
}
router.get('/api/:key/1920/events', (req, res) => {
  console.log(req.params.key)
  fetch('http://theorangealliance.org/api/team/' + req.params.key + '/events/1920', {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(match => {
      let array = [];
      for (let i = 0; i < match.length; i++) {
        fetch('http://theorangealliance.org/api/event/' + match[i]['event_key'], {
          method: 'get',
          headers,
        })
        .then(res => res.join())
        .then(event => {
          array.push(event)
        })
      }
      res.send(match)
    });
});
router.get('/teamApi', (req, res) => {

  res.render('api/teamApi', {
    teams: [],
    name: ""
  })

});
// fetch('http://theorangealliance.org/api/match/1920-IA-LT8-E001-1', {
//     method: 'get',
//     headers,
//   })
//   .then(res => res.json())
//     .then(team => {
//       console.log(team[0]['participants'])
//     })

router.get('/teamApi/:search', (req, res) => {
  fetch('http://theorangealliance.org/api/team/' + req.params.search, {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(team => {
      console.log(team)
      let teams = [];
      teams.push(team)
      for (let i = 0; i < teams.length; i++) if (teams[i].team_name_short === null) teams[i].team_name_short = teams[i].team_name_long
      console.log(teams[0][0]['team_number'])

      res.render('api/teamApi', {
        teams: teams,
        name: req.params.search
      })
    })
    });


router.get('/apiData', (req, res) => {
  return res.render('api/apiData')
});

router.get('/calendar', (req, res) => {
  calendarController.get_calendar;
  return res.render('calendar.ejs', {
    names: "UPPPP",

  });
});
router.get('/simSel', (req, res) => {
  db.query("SELECT * FROM team ORDER BY team_number", function (err, results) {
    return res.render('simalSelect.ejs', {
      results: results,

    });
  })

});
// router.get('/simulation', (req, res) => {
//   return res.render('simulationPicker');
// });
router.get('/simulation', (req, res) => {
  return res.redirect('simSel');
});
router.get('/help', (req, res) => {
  return res.render('help.ejs', {
  });
});
router.get('/announcements', (req, res) => {
  return res.render('announcements.ejs', {
  });
});
router.get('/api/:team', (req, res) => {
  fetch('http://theorangealliance.org/api/team/' + req.params.team + '/results/1920', {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(json => {
      res.send(json)
    });
});
router.get('/api/event/:event_name/matches', (req, res) => {
  try {
    console.log(req.params.event_name)
    api.getEventMatches(req.params.event_name).then((event) => {
      console.log(event[0].eventKey)
      res.render('api/matchApi.ejs', {
        array: event
      })
    })
  }
  catch {
    return res.redirect('/')
  }
});
router.get('/api/event/:event_name/rankings', (req, res) => {
  console.log(req.params.event_name)
  api.getEventRankings(req.params.event_name).then((event) => {
    console.log(event)
    res.render('api/eventRankings.ejs', {
      json: event
    });
  });
});
router.get('/api/event/:event_name/:match_key', (req, res) => {
  fetch('http://theorangealliance.org/api/match/' + req.params.match_key + '/details', {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(json => {
      console.log(json[0])
      for (let i = 0; i < json.length; i++) {
        json[i].red.tower_level_bonus *= 2;
        json[i].blue.tower_level_bonus *= 2;

        if (json[i].red.robot_1.cap_level == -1) json[i].red.robot_1.cap_level = 0
        if (json[i].blue.robot_1.cap_level == -1) json[i].blue.robot_1.cap_level = 0
        if (json[i].blue.robot_2.cap_level == -1) json[i].blue.robot_2.cap_level = 0
        if (json[i].red.robot_2.cap_level == -1) json[i].red.robot_2.cap_level = 0

        console['log'](json[i].red.robot_1.cap_level)
      }
      res.render('api/matchView', {
        data: json
      })

    });
});
router.get('/api/team/search/:results', (req, res) => {
  fetch('http://theorangealliance.org/api/team/' + req.params.results + '/results/1920', {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .then(json => {

      send(json)

    });
  send = function (data) {
    let name = [];
    let results = []
    let average = 0;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    for (let i = 0; i < data.length; i++) {
      average += data[i]['opr']
      wins += data[i]['wins']
      losses += data[i]['losses']
      ties += data[i]['ties']
    }
    average /= 4;
    average = Math.round(average * 10000.0) / 10000.0
    let percentage = Math.round(((wins + (ties * .5)) / (wins + ties + losses)) * 10000.0) / 10000.0
    console.log(data)
    if (data.length > 0) {
      let team_name;
      if (data[0]['team']['team_name_short'] != null) team_name = data[0]['team']['team_name_short']
      else team_name = data[0]['team']['team_name_long']
      name.push([data[0]['team']['team_key'], "(" + data[0]['team']['team_key'] + ") " + team_name + " " + data[0]['team']["city"] + ", " + data[0]['team']["state_prov"]])
      results.push([data[0]['team']['team_key'], team_name, data[0]['team']["city"] + ", " + data[0]['team']["state_prov"], data[0]['team']['league_key'], average, percentage])
      console.log(results)
    } else {
      results = [["", "", "", "", "", ""]];
      name.push([req.params.results, ""])
      data = [""]
    }
    console.log(results)
    return res.render('api/simalAdd',
      {
        length: 0,
        test: [[]],
        results: results,
        data: data,
        name: name,
      })
  }
});
router.get('/api/team/search', (req, res) => {
  let data = [""];
  let results = [["", "", "", "", "", ""]]
  let name = [["", ""]]
  return res.render('api/simalAdd',
    {
      length: 0,
      test: [[]],
      results: results,
      data: data,
      name: name
    })
})
router.get('/score', (req, res) => {
  return res.render('score.ejs', {
  });
});

router.get('/scoutingData', (req, res) => {

  db.query("SELECT * FROM `Hawk`.`scout_data` ORDER BY create_time DESC", function (err, results) {
    db.query("SELECT * FROM team ORDER BY team_number ", function (err, teams) {
      var name = [];
      for (var i = 0; i < teams.length; i++) {
        name.push([teams[i]['team_number'], teams[i]['name'], teams[i]['school']])
      }

      for (var i = 0; i < results.length; i++) {
        var x = null;

        var desired;
        for (var g = 0; g < name.length; g++) {
          if (results[i]['team_number'] == name[g][0]) {
            desired = "(" + name[g][0] + ") " + name[g][1] + ", " + name[g][2];
            break
          }
        }
        results[i]['identification'] = desired
        results[i]['create_time'] = moment(results[i]['create_time']).format('LLLL')
      }

      return res.render('scoutingData.ejs', {
        results: results,

      });
    })
  })
});
router.get('/teamData', (req, res) => {
  db.query("SELECT * FROM team", function (err, results) {
    if (err) throw err;
    return res.render('teamData.ejs', {
      results: results,
    });
  })

});
router.get('/data', (req, res) => {
  if (validate) {
    return res.render('data.ejs', {
      id: ID,
    });
  }
  else {
    return res.redirect('/');
  }
});
router.get('/scout', (req, res) => {
  if (global.validate == true) {
    db.query("SELECT * FROM `Hawk`.`user`", function (err, users) {
      db.query("SELECT * FROM `Hawk`.`team` ORDER by team_number", function (err, results) {
        db.query("SELECT * FROM Hawk.events ORDER by Date DESC ", function (err, results1) {
          var name = [];
          for (var i = 0; i < results.length; i++) {
            name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
          }
          return res.render('scouttt.ejs', {
            date: moment().format('LLL'),
            name: name,
            users, users,
            results: results,
            results1: results1,
          });
        })
      })
    })

  } else {
    return res.redirect('/');
  }
});
router.get('/simalAdd', (req, res) => {

  return res.render('api/simalAdd.ejs', {
    length: 0,
    test: [[]],
    data: [""],
    name: [["", ""]],
    results: [["", "", "", "", "", "", ""]]
  })
});
router.get('/newTeam', (req, res) => {
  return res.render('team.ejs')
});
router.get('/newTourney', (req, res) => {
  return res.render('tournament.ejs', {
    now: moment().format('LLL'),
  });
});
router.get('/tournamentData', (req, res) => {
  db.query("SELECT * FROM Hawk.events", function (err, results) {
    for (var i = 0; i < results.length; i++) {
      results[i]['Date'] = moment(results[0]['Date']).format('LLLL')
    }
    return res.render('tournamentData.ejs', {
      results: results,
    });
  })

});
router.get('/background', (req, res) => {
  return res.render('background.ejs', {
  });
});
router.get('/localData', (req, res) => {
  return res.render('localData.ejs', {
  });
});
router.get('/gettt', (req, res) => {
  return res.render('api/tournamentApi.ejs', {
    keyword: '',
    array: []
  });
});
router.get('/disable', (req, res) => {
  db.query("UPDATE user SET dis = 1 WHERE email = '" + global.ID + "';")
  return res.redirect('/home')
});
router.get('/enable', (req, res) => {
  db.query("UPDATE user SET dis = 0 WHERE email = '" + global.ID + "';")
  return res.redirect('/home')
});
router.get('/scoreBlue', (req, res) => {
  if (global.validate == true) {
    db.query("SELECT * FROM `Hawk`.`team` ORDER BY team_number ", function (err, results) {
      var name = [];
      for (var i = 0; i < results.length; i++) {
        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
      }
      db.query("SELECT Name FROM `Hawk`.`events` ORDER BY Date DESC", function (err, results1) {
        console.log(results1[0]['Name'] + " " + results1.length);
        return res.render('scoreBlue.ejs', {
          name: name,
          results: results,
          results1: results1,
        });
      })
    })
  } else {
    return res.redirect('/login')
  }
});
router.get('/scoreRed', (req, res) => {
  if (global.validate == true) {

    db.query("SELECT * FROM `Hawk`.`team` ORDER BY team_number ", function (err, results) {
      var name = [];
      for (var i = 0; i < results.length; i++) {
        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
      }
      db.query("SELECT Name FROM `Hawk`.`events` ORDER BY Date DESC", function (err, results1) {
        console.log(results1[0]['Name'] + " " + results1.length);
        return res.render('scoreRed.ejs', {
          name: name,
          results: results,
          results1: results1,
          title: `Red Score « ${process.env.APP_NAME}`,

        });
      })
    })
  } else {
    return res.redirect('/login')
  }
});
function query(a, b, c, d) {
  db.query("SELECT * FROM hawk.score_data WHERE event_name = '" + a + "' AND  match_num =  " + b + " AND field_num = " + c + " AND alliance = '" + d + "';", function (err, penalties) {
    if (err) throw err;
    else {
      return (penalties)
    }
  })
}
router.post('/create=?', (req, res) => {
  return res.redirect('/add/' + req.body.game_num)
})
router.get('/add/:num', (req, res) => {
  db.query("SELECT * FROM `Hawk`.`team` ORDER BY team_number", function (err, results) {
    db.query("SELECT * FROM Hawk.events; ", function (err, results1) {
      var name = [];
      for (var i = 0; i < results.length; i++) {
        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
      }
      return res.render('addTeams', {
        date: moment().format('LLL'),
        name: name,
        results: results,
        results1: results1,
        amount: req.params.num
      });
    })
  })
})
router.post('/configure=?', (req, res) => {
  db.query("SELECT * FROM team ORDER BY team_number", function (err, team) {
    let array = [];
    let teams = []
    let teams1 = []
    for (obj in team) {
      teams.push([team[obj].team_number, 0, 0, 0, "(" + team[obj]['team_number'] + ") " + team[obj]['name'] + ", " + team[obj]['location'], 0]);
      teams1.push(team[obj].team_number)
    }

    for (obj in req.body) {
      for (obj1 in team) {
        if (team[obj1].team_number == req.body[obj]) {
          array.push([team[obj1].team_number, team[obj1].opr, team[obj1].wl])
        }
      }
    }
    let final_values = [];
    console.log(array)
    for (let i = 0; i < Object.keys(req.body).length; i += 4) {
      final_values.push([array[i][0], array[i + 1][0], Math.round((array[i][1] + array[i + 1][1]) * 1000.00) / 1000.00, Math.round((array[i][2] + array[i + 1][2]) * 1000.00) / 1000.00, array[i + 2][0], array[i + 3][0], (Math.round((array[i + 2][1] + array[i + 3][1]) * 1000.00) / 1000.00), (Math.round((array[i + 2][2] + array[i + 3][2]) * 1000.00) / 1000.00)])
    }
    for (let i = 0; i < final_values.length; i++) {
      first_probability = final_values[i][2] / (final_values[i][2] + final_values[i][6]);
      second_probability = final_values[i][3] / (final_values[i][3] + final_values[i][7])
      probability = (first_probability + second_probability) / 2
      console.log(probability)
      if (probability > .50) {
        final_values[i][8] = final_values[i][8] = Math.round((probability) * 10000.00) / 100.00;
        final_values[i][9] = 'r'
      } else if (probability < 0.5) {
        final_values[i][8] = Math.round((1 - probability) * 10000.00) / 100.00;
        final_values[i][9] = 'b'
      } else {
        final_values[i][8] = 50;
        final_values[i][9] = 'g'
      }
    }

    for (let i = 0; i < final_values.length; i++) {
      if (final_values[i][9] == 'r') {
        teams[teams1.indexOf(final_values[i][0])][1]++
        teams[teams1.indexOf(final_values[i][1])][1]++
        teams[teams1.indexOf(final_values[i][4])][2]++
        teams[teams1.indexOf(final_values[i][5])][2]++
      } else if (final_values[i][9] == 'b'){
        teams[teams1.indexOf(final_values[i][0])][2]++
        teams[teams1.indexOf(final_values[i][1])][2]++
        teams[teams1.indexOf(final_values[i][4])][1]++
        teams[teams1.indexOf(final_values[i][5])][1]++
      } else {
        teams[teams1.indexOf(final_values[i][0])][3]++
        teams[teams1.indexOf(final_values[i][1])][3]++
        teams[teams1.indexOf(final_values[i][4])][3]++
        teams[teams1.indexOf(final_values[i][5])][3]++
      }
    }
    let teams3 = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i][1] === 0 && teams[i][2] === 0) continue;
      teams3.push(teams[i])
    }
    teams = teams3
    for (let i = 0; i < teams.length; i++) teams[i][5] = teams[i][1] + (.5 * teams[i][3])
    teams.sort(function (a, b) {
      if (a[5] > b[5]) return -1;
      if (a[5] < b[5]) return 1;
      return 0;
    });
    console.log(teams)
    const jsonData = JSON.parse(JSON.stringify(final_values));
    const csvFields = ['Red1', 'Red2', 'Blue1', 'Blue2', 'Score', 'Win-Loss', 'Probability', 'Winner'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonData);
    fs.writeFile('TournamentSimulation.csv', csv, function (err) {
      if (err) throw err;
      console.log(csv);
      console.log("File saved");
    })
    console.log(teams.length)


    return res.render('tournamentGames', {
      games: final_values,
      teams: teams
    })
  })

})
router.get('/testCreation', (req, res) => {
  return res.render('createTourney')
})
router.get('/scoringData', (req, res) => {
  db.query("SELECT * FROM team ORDER BY team_number ", function (err, teams) {
    db.query("SELECT * FROM `Hawk`.`score_data` ORDER BY create_time DESC", function (err, results) {

      return res.render('scoringData.ejs', {
        alert: "",
        id: ID,
        results: score.total_score(teams, results),
      });
    })

    // return res.redirect('/');
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