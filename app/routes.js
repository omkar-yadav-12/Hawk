var express = require('express');
var router = express.Router();
const db = require('../db');
const user = require('./controllers/users');
const moment = require('moment');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const calendarController = require('./controllers/calendar');
const score = require('./controllers/score');
const http = require('http');
const https = require('https');
const simal = require('./controllers/simulation');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.ID;
global.ID = null;
global.validate;
go = function(link) {
  if (global.validate) return res.redirect(link)
  else return res.redirect('/login')
}

global.validate = false;

router.get("/api/", function(req, response, res) {
  var apiKey = "afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8";

  let url = "http://theorangealliance.org/api/";
  var options = {
    method: "GET",
    headers: {
      'Content-Type' : 'application/json',
      'X-Auth-Token': 'afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8',
      'X-Application-Origin' : 'hawk',
    }
  };
  let data = "";

  let apiRequest = http.request(url, options, function(res) {
    console.log("Connected");

    res.on("data", chunk => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(data)
      console.log("data collected");

      response.end(JSON.stringify(data));
    });
    
  });
  apiRequest.end();
  // return res.redirect('/home')
});
router.get('/settings/edit', (req, res) => {
  db.query("SELECT *  FROM `Hawk`.`user` WHERE email = '" + global.ID + "';", function (err, results) {
    // for (var i = 0; i < results.length; i++) {
    //   results[i]['create_time'] = moment(results[i]['create_time']).format('LL')
    // }
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
function check (value){
  if (value == 'on') return (1)
  else return (0);
}
router.post('/dataEdit/update/:dataId', (req, res) => {
  db.query("UPDATE hawk.score_data SET team1_name = '" + req.body.team_one + "', team2_name = '" + req.body.team_two +  "', event_name = '" + req.body.event_name + "', match_num = '" + req.body.match + "', field_num = '" + req.body.field + "', skystone1 = '" + check(req.body.skystone1) + "', skystone2 = '" + check(req.body.skystone2) + "', skystone3 = '" + check(req.body.skystone3) + "', skystone4 = '" + check(req.body.skystone4) + "', skystone5 = '" + check(req.body.skystone5) + "', skystone6 = '" + check(req.body.skystone6) + "', stone1 = '" + check(req.body.stone1) + "', stone2 = '" + check(req.body.stone2) + "', stone3 = '" + check(req.body.stone3) + "', stone4 = '" + check(req.body.stone4) + "', stone5 = '" + check(req.body.stone5) + "', stone6 = '" + check(req.body.stone6) + "', none1 = '" + check(req.body.none1) + "', none2 = '" + check(req.body.none2) + "', none3 = '" + check(req.body.none3) + "', none4 = '" + check(req.body.none4) + "', none5 = '" + check(req.body.none5) + "', none6 = '" + check(req.body.none6) + "', frs = '" + check(req.body.FRS) + "', fr = '" + check(req.body.FS) + "', r1n = " + check(req.body.R1N) + ", r2n = '" + check(req.body.R2N) + "', returned_auto = '" + req.body.ReturnedAuto + "', placed_auto = '" + req.body.PlacedAuto + "', delivered = '" + req.body.delivered_number + "', tallest_sky = '" + req.body.tallest_skyscraper + "', returned_drs = '" + req.body.returned_name + "', placed_drs = '" + req.body.placed + "', found_moved = '" + check(req.body.found) + "', cap1 = '" + check(req.body.Capstone1) + "', cap2 = '" + check(req.body.Capstone2) + "', parked1 = '" + check(req.body.Parked1) + "', parked2 = '" + check(req.body.Parked2) + "', r1n = '" + req.body.robot1_level + "', r2n = '" + req.body.robot2_level + "', minor = '" + req.body.minor + "', major = '" + req.body.major + "', team1_0 = '" + check(req.body.team1_0) + "', team1_1 = '" + check(req.body.team1_1) + "', team1_2 = '" + check(req.body.team1_2) + "', team2_0 = '" + check(req.body.team2_0) + "', team2_1 = '" + check(req.body.team2_1) + "', team2_2 = '" + check(req.body.team2_2) + "'WHERE id = " + req.params.dataId);
  return res.redirect('/scoringData')
});
router.post('/teamEdit/update/:dataId', (req, res) => {
  db.query("UPDATE hawk.team SET team_number = " + req.body.team_number + ", name = '" + req.body.name + "', school = '" + req.body.school + "', location = '" + req.body.location + "', league = '" + req.body.league +  "'WHERE idteam = " + req.params.dataId);
  return res.redirect('/teamData')
});
router.post('/settings/:dataId', (req, res) => {
  console.log(req.body)
  // db.query("UPDATE user SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name + "', email =  '" + req.body.email + "', grade = '" + req.body.grade + "', password = '" + req.body.password + "' WHERE id =  '" + req.params.dataId + "';", function(err, results) {
  //   if (err) throw err;
  // })
  return res.redirect('/settings')
});

router.post('/scoutttEdit/update/:dataId', (req, res) => {
  //db.query("UPDATE hawk.scout_data SET team_number = '" + req.body.team_num + "', move_auto = '" + req.body.MF + "', sense_auto = '" + req.body.SS + "', over_auto = '" + req.body.PDZ + "', collect_auto = '" + req.body.CS + "', place_auto = '" + req.body.FS + "', found_auto_d = '" + req.body.expand1 + "', sense_auto_d = '" + req.body.expand2 + "', add_auto_d = '" + req.body.expand3 + "', found_teleop = '" + req.body.expand4 + "', collect_teleop = '" + req.body.add_auto + "', palce_teleop = '" + req.body.MF_ + "', found_teleop_d = '" + req.body.CS_ + "', stone_teleop_d = '" + req.body.FS_ + "', add_teleop_d = '" + req.body.expand_1 + "', found_end = '" + req.body.expand_2 + "', in_end = '" + req.body.additional_teleop + "', over_end = '" + req.body.MF_EG + "', place_end = '" + req.body.SS_EG + "', found_end_d = '" + req.body.PDZ_EG + "', parki_end_d = '" + req.body.FS_EG + "', stones_end_d = '" + req.body.expand__1 + "', add_end_d = '" + req.body.expand__2 + "', fr = '" + req.body.expand__3 + "', r1n = '" + req.body.additional_end + "', r2n = '" + req.body.R2N + "', returned_auto = '" + req.body.ReturnedAuto + "', placed_auto = '" + req.body.PlacedAuto + "', delivered = '" + req.body.delivered_number + "', tallest_sky = '" + req.body.tallest_skyscraper + "', returned_drs = '" + req.body.returned_name + "', placed_drs = '" + req.body.placed + "', found_moved = '" + req.body.found + "', cap1 = '" + req.body.Capstone1 + "', cap2 = '" + req.body.Capstone2 + "', parked1 = '" + req.body.Parked1 + "', parked2 = '" + req.body.Parked2 + "', r1n = '" + req.body.robot1_level + "', r2n = '" + req.body.robot2_level + "', minor = '" + req.body.minor + "', major = '" + req.body.major + "', team1_0 = '" + req.body.team1_0 + "', team1_1 = '" + req.body.team1_1 + "', team1_2 = '" + req.body.team1_2 + "', team2_0 = '" + req.body.team2_0 + "', team2_1 = '" + req.body.team2_1 + "', team2_2 = '" + req.body.team2_2 + "'WHERE id = " + req.params.dataId);
  return res.redirect('/scoutingData')
});

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
      db.query("INSERT INTO hawk.score_data(alliance, team1_name, team2_name, event_name, match_num, field_num, skystone1, skystone2, skystone3, skystone4, skystone5, skystone6, stone1, stone2, stone3, stone4, stone5, stone6, none1, none2, none3, none4, none5, none6, frs, fr, r1n, r2n, returned_auto, placed_auto, delivered, tallest_sky, returned_drs, placed_drs, found_moved, cap1, cap2, parked1, parked2, r1l, r2l, minor, major, team1_0, team1_1, team1_2, team2_0, team2_1, team2_2, create_time, author) VALUES ('" + req.body.alliance + "','" + req.body.team_one + "','" + req.body.team_two + "','" + req.body.event_name + "','" +  req.body.match + "','" + req.body.field + "','" + check(req.body.skystone1) + "','" + check(req.body.skystone2) + "','" + check(req.body.skystone3) + "','" + check(req.body.skystone4) + "','" + check(req.body.skystone5) + "','" + check(req.body.skystone6) + "','" + check(req.body.stone1) + "','" + check(req.body.stone2) + "','" + check(req.body.stone3) + "','" + check(req.body.stone4) + "','" + check(req.body.stone5) + "','" + check(req.body.stone6) + "','" + check(req.body.none1) + "','" + check(req.body.none2) + "','" + check(req.body.none3) + "','" + check(req.body.none4) + "','" + check(req.body.none5) + "','" + check(req.body.none6) + "','" + check(req.body.FRS) + "','" + check(req.body.FS) + "','" + check(req.body.R1N) + "','" + check(req.body.R2N) + "','" + req.body.ReturnedAuto + "','" + req.body.PlacedAuto + "','" + req.body.delivered_number + "','" + req.body.tallest_skyscraper + "','" + req.body.returned_name + "','" + req.body.placed + "','" + check(req.body.found) + "','" + check(req.body.Capstone1) + "','" + check(req.body.Capstone2) + "','" + check(req.body.Parked1) + "','" + check(req.body.Parked2) + "','" + req.body.robot1_level + "','" + req.body.robot2_level + "','" + req.body.minor + "','" + req.body.major + "','" + check(req.body.team1_0) + "','" + check(req.body.team1_1) + "','" + check(req.body.team1_2) + "','" + check(req.body.team2_0) + "','" + check(req.body.team2_1) + "','" + check(req.body.team2_2) + "', NOW(), '" + name + "');");
      var total = 0;
    console.log("DATA: " + total);
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
  db.query("INSERT INTO Hawk.team(team_number, name, school, location, league) VALUES (" + req.body.team_number + ",'" + req.body.name + "','" +  req.body.school + "','" + req.body.location + "','" + req.body.league + "');");
  return res.redirect('/newTeam');
})
router.post('/tourney=True', (req, res) => {
  req.body.date = moment(req.body.date).format('YYYY/MM/DD')
  console.log(req.body.date);
  for (key in req.body) {
    console.log(req.body[key].toString());
  }
  db.query("INSERT INTO Hawk.events(Name, Location, Date, Type) VALUES ('" + req.body.name + "','" +  req.body.location + "','" + req.body.date + "','" + req.body.type+ "');");
  return res.redirect('/newTourney');
})
router.get('/register', (req, res) => {
  return res.render('register.ejs', {
    title: `Register « ${process.env.APP_NAME}`,
    
  });
});
router.get('/dataView/:dataId', (req, res) => {
  db.query("SELECT * FROM score_data WHERE id = " + req.params.dataId, function (err, results) {
    if (err) throw err;
    if(results > 0){
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
      if(results.length > 0) {
      return res.render('dataEdit.ejs', {
        results: results        
      });
    }
    }
  })
});
router.get('/scoutEdit/:dataId', (req, res) => {
  try{
  db.query("SELECT * FROM scout_data WHERE id = " + req.params.dataId, function (err, results) {
  if (results.length > 0) {
    db.query("SELECT * FROM events", function(err, events) {
      db.query("SELECT * FROM team", function (err, teams){
        intend = results[0]['team_number'];
        needed = results[0]['event_name'];
        results[0]['add_teleop_d'] = results[0]['found_auto_d'].toString();
        results[0]['add_end_d'] = results[0]['found_end_d'].toString();
        console.log(results[0]['team1_name'])
        var name = [];
        for(var i = 0; i < teams.length; i++) {
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
  if (global.validate == true) {
    db.query("SELECT * FROM `Hawk`.`user` ORDER BY last_name", function (err, results) {
      if (err) throw err;
        user.user_list(results);
        return res.render('users.ejs', {
          color: "red",
          length: results.length,
          results: results,
          title: `Users « ${process.env.APP_NAME}`,
         
        });
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
  console.log(req.body)
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
router.get('/calendar', (req, res) => {
  calendarController.get_calendar;
  return res.render('calendar.ejs', {
    title: `Calendar « ${process.env.APP_NAME}`,
    
  });
});
router.get('/simSel', (req, res) => {
  db.query("SELECT * FROM team", function (err, results){
    return res.render('simalSelect.ejs', {
      results: results,

    });
  })
 
});
router.get('/simulation', (req, res) => {
  db.query("SELECT * FROM team", function(err, results) {
    return res.render('tab.ejs', {
    });
  });
});
router.get('/help', (req, res) => {
  return res.render('help.ejs', {
  });
});
router.get('/announcements', (req, res) => {
  return res.render('announcements.ejs', {
  });
});
router.get('/score', (req, res) => {
  return res.render('score.ejs', {
  });
});

router.get('/scoutingData', (req, res) => {
  
  db.query("SELECT * FROM `Hawk`.`scout_data` ORDER BY create_time DESC", function (err, results) {
    db.query("SELECT * FROM team ",  function(err, teams){
      var name = [];
      for(var i = 0; i < teams.length; i++) {
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
  db.query("SELECT * FROM team", function(err, results) {
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
    
    db.query("SELECT * FROM `Hawk`.`team`; ", function(err, results) {
      db.query("SELECT * FROM Hawk.events; ", function (err, results1) {
      var name = [];
      for(var i = 0; i < results.length; i++) {
        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
      }
      return res.render('scouttt.ejs', {
        date: moment().format('LLL'),
        name: name,
        results: results,
        results1: results1,
      });
    })
    })
    
  } else {
    return res.redirect('/');
  }
});
router.get('/newTeam', (req, res) => {
  return res.render('team.ejs', {
  });
});
router.get('/newTourney', (req, res) => {
  return res.render('tournament.ejs', {
    now: moment().format('LLL'),
  });
});
router.get('/tournamentData', (req, res) => {
  db.query("SELECT * FROM Hawk.events", function(err, results){
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
router.get('/disable', (req, res) => {
    db.query("UPDATE user SET dis = 1 WHERE email = '"  + global.ID + "';")
    return res.redirect('/home')
});
router.get('/enable', (req, res) => {
  db.query("UPDATE user SET dis = 0 WHERE email = '"  + global.ID + "';")
  return res.redirect('/home')
});
router.get('/scoreBlue', (req, res) => {
  if (global.validate == true) {
    db.query("SELECT * FROM `Hawk`.`team`; ", function(err, results) {
      var name = [];
      for(var i = 0; i < results.length; i++) {
        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
      }
    db.query("SELECT Name FROM `Hawk`.`events`", function (err, results1) {
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
   
    db.query("SELECT * FROM `Hawk`.`team`; ", function(err, results) {
      var name = [];
      for(var i = 0; i < results.length; i++) {
        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
      }
    db.query("SELECT Name FROM `Hawk`.`events`", function (err, results1) {
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
function query (a, b, c, d)  {
  db.query("SELECT * FROM hawk.score_data WHERE event_name = '" + a + "' AND  match_num =  " + b + " AND field_num = " + c + " AND alliance = '" + d+  "';", function(err, penalties){
    if (err) throw err;
    else {
      return (penalties)
    }
  })
}
router.get('/scoringData', (req, res) => {
  db.query("SELECT * FROM team ",  function(err, teams){
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