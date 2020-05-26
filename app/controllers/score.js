const db = require('../db')
const moment = require('moment')
global.ID;
global.ID = "omyad21@icstudents.org";
global.validate = true;
query = (a, b, c, d) => {
  db.query("SELECT * FROM hawk.score_data WHERE event_name = '" + a + "' AND  match_num =  " + b + " AND field_num = " + c + " AND alliance = '" + d + "';", function (err, penalties) {
    if (err) throw err;
    else {
      return (penalties)
    }
  })
}
function check(value) {
  if (value == undefined) return 0
  if (value == 'on') return (1)
  else return (0);
}
function total_score (teams, results) {
  var names = ['skystone', 'stone', 'none'];
  var name = [];
  for (var i = 0; i < teams.length; i++) {
    name.push([teams[i]['team_number'], teams[i]['name'], teams[i]['school']])
  }
  for (var i = 0; i < results.length; i++) {
    var alliance;
    if (results[i]['allaince'] == "Red") {
      alliance = "Blue"
    } else {
      alliance = "Red"
    }
    penalties = query(results[i]['event_name'], results[i]['match_num'], results[i]['field_num'], alliance)

    if (penalties == undefined) {
      var penalties = []
      penalties[0] = 0;
      penalties[1] = 0
    }
    results[i]['create_time'] = moment(results[i]['create_time']).format('LLL')
    results[i]['total'] = 0;
    var t = results[i]['total']; // Set t = results[i]['total'] so it is easier to type out
    for (s = 0; s < 2; s++) {
      for (j = 1; j < 7; j++) {
        x = (String(names[s] + j));
        if (results[i][x] == 1) {
          t += 1;
        }
      }
    }
    if (results[i]['frs'] == 1) t += 10
    if (results[i]['fr'] == 1) t += 10
    if (results[i]['r1n'] == 1) t += 5
    if (results[i]['r2n'] == 1) t += 5
    t += (results[i]['returned_auto'] + (results[i]['placed_auto'] * 4));
    t += (results[i]['delivered'] + (results[i]['tallest_sky'] * 2));
    t -= (results[i]['returned_drs']);
    t += results[i]['placed_drs'];
    if (results[i]['found_moved'] == 1) t += 15
    if (results[i]['cap1'] == 1) t += 5
    if (results[i]['cap2'] == 1) t += 5
    if (results[i]['parked1'] == 1) t += 5
    if (results[i]['parked2'] == 1) t += 5
    t += (results[i]['r1l'] + results[i]['r2l']);
    if (results[i]['alliance'] != "Blue") results[i]['alliance'] = "Red"
    results[i]['total'] = t;
    for (var g = 0; g < teams.length; g++) {
      if (results[i]['team1_name'] == name[g][0]) results[i]['team1_name'] = "(" + name[g][0] + ") " + name[g][1] + ", " + name[g][2];
      if (results[i]['team2_name'] == name[g][0]) results[i]['team2_name'] = "(" + name[g][0] + ") " + name[g][1] + ", " + name[g][2];
    }
  }
  return (results)
}

exports.scoreSend = function (req, res) {
    const authorName = req.user.first_name + " " + req.user.last_name
      db.query("INSERT INTO hawk.score_data(alliance, team1_name, team2_name, event_name, match_num, field_num, skystone1, skystone2, skystone3, skystone4, skystone5, skystone6, stone1, stone2, stone3, stone4, stone5, stone6, none1, none2, none3, none4, none5, none6, frs, fr, r1n, r2n, returned_auto, placed_auto, delivered, tallest_sky, returned_drs, placed_drs, found_moved, cap1, cap2, parked1, parked2, r1l, r2l, minor, major, team1_0, team1_1, team1_2, team2_0, team2_1, team2_2, create_time, author) VALUES ('" + req.body.alliance + "','" + req.body.team_one + "','" + req.body.team_two + "','" + req.body.event_name + "','" + req.body.match + "','" + req.body.field + "','" + check(req.body.skystone1) + "','" + check(req.body.skystone2) + "','" + check(req.body.skystone3) + "','" + check(req.body.skystone4) + "','" + check(req.body.skystone5) + "','" + check(req.body.skystone6) + "','" + check(req.body.stone1) + "','" + check(req.body.stone2) + "','" + check(req.body.stone3) + "','" + check(req.body.stone4) + "','" + check(req.body.stone5) + "','" + check(req.body.stone6) + "','" + check(req.body.none1) + "','" + check(req.body.none2) + "','" + check(req.body.none3) + "','" + check(req.body.none4) + "','" + check(req.body.none5) + "','" + check(req.body.none6) + "','" + check(req.body.FRS) + "','" + check(req.body.FS) + "','" + check(req.body.R1N) + "','" + check(req.body.R2N) + "','" + req.body.ReturnedAuto + "','" + req.body.PlacedAuto + "','" + req.body.delivered_number + "','" + req.body.tallest_skyscraper + "','" + req.body.returned_name + "','" + req.body.placed + "','" + check(req.body.found) + "','" + check(req.body.Capstone1) + "','" + check(req.body.Capstone2) + "','" + check(req.body.Parked1) + "','" + check(req.body.Parked2) + "','" + req.body.robot1_level + "','" + req.body.robot2_level + "','" + req.body.minor + "','" + req.body.major + "','" + check(req.body.team1_0) + "','" + check(req.body.team1_1) + "','" + check(req.body.team1_2) + "','" + check(req.body.team2_0) + "','" + check(req.body.team2_1) + "','" + check(req.body.team2_2) + "', NOW(), '" + authorName+ "');");
      return res.redirect('/score')
}

exports.delete = function (dataId, res) {
  db.delete("score_data", ["id"], [dataId], null, function (err) {
    if (err) throw err;
    else {
      return res.redirect('/scoringData')
    }
  })
}

exports.dataView = function (dataId, res) {
  db.get(null, "score_data", ["id"], [dataId], null, null, function (err, results) {
    if (err) throw err;
    if (results.length > 0) {
      console.log(results)
      return res.render('score/dataView.ejs', {
        results: results,
        title: `View Data « ${process.env.APP_NAME}`,

      });
    } else {
      return res.redirect('/scoringData')
    }
  })
}

exports.test = function (dataId, res) {
  db.get(null, "score_data", ["id"], [dataId], null, null, function (err, results) {
    if (err) throw err;
    else {
      console.log(results)
      return res.render('score/splitTest.ejs', {
        results: results,
        title: `View Data « ${process.env.APP_NAME}`,

      });
    }
  })
}

exports.dataEdit = function (dataId, res) {
  db.get(null, "score_data", ["id"], [dataId], null, null, function (err, results) {
    if (err) throw err;
    else {
      if (results.length > 0) {
        return res.render('score/dataEdit.ejs', {
          results: results
        });
      }
    }
  })

}

exports.score = function (req, res, color) {
    db.get(null, "team", null, null, null, "team_number", function (err, results) {
      var name = [];
      for (var i = 0; i < results.length; i++) {
        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
      }
      db.get(["Name"], "events", null, null, null, "Date DESC", function (err, results1) {
        console.log(results1.length)
        results1 = results1
        for(let i = 0; i < results1.length; i++) console.log(results1[i]['Name'])
        let rb = "Red"
        if (color) rb = "Blue"
        console.log(req.user)
        return res.render('score/score' + rb + '.ejs', {
          name: name,
          results: results,
          results1: results1,
        });
      })
    })
}

exports.scoringData = function (res) {
  db.get(null, "team", null, null, null, "team_number", function(err, teams) {
    db.get(null, "score_data", null, null, null, "create_time DESC", function (err, results) {
      return res.render('score/scoringData.ejs', {
        alert: "",
        id: ID,
        results: total_score(teams, results),
      });
    })
  })
}

module.exports.total_score = total_score