const db = require('../db')
const moment = require('moment')


exports.scoutView = function (results) {
    if (results['add_teleop_d'] != undefined) results['add_teleop_d'] = results['found_auto_d'].toString();
    if (results['add_end_d'] != undefined) results['add_end_d'] = results['found_end_d'].toString();
    return results
}


exports.insert = function (req, res) {
    for (var key in req.body) {
        if (req.body[key] == 'on') req.body[key] = 1
        if (req.body[key].toString() == 'undefined') req.body[key].toString()
        if (typeof req.body[key] == "number") continue;
        req.body[key] = String(req.body[key])
    }
    db.insert("scout_data", ["team_number", "event_name", "author", "create_time", "move_auto", "sense_auto", "over_auto", "collect_auto", "place_auto", "found_auto_d", "sense_auto_d", "park_auto_d", "stone_auto_d", "add_auto_d", "found_teleop", "collect_teleop", "palce_teleop", "found_teleop_d", "stone_teleop_d", "add_teleop_d", "found_end", "in_end", "over_end", "place_end", "found_end_d", "parki_end_d", "stones_end_d", "add_end_d"], [req.body.team_num, req.body.event_name, req.user.first_name + " " + req.user.last_name, "NOW()", JSON.stringify(req.body.MF), JSON.stringify(req.body.SS), JSON.stringify(req.body.PDZ), JSON.stringify(req.body.CS), JSON.stringify(req.body.FS), JSON.stringify(req.body.expand1), JSON.stringify(req.body.expand2), JSON.stringify(req.body.expand3), JSON.stringify(req.body.expand4), JSON.stringify(req.body.add_auto), JSON.stringify(req.body.MF_), JSON.stringify(req.body.CS_), JSON.stringify(req.body.FS_), JSON.stringify(req.body.expand_1), JSON.stringify(req.body.expand_2), JSON.stringify(req.body.additional_teleop_label), JSON.stringify(req.body.MF_EG), JSON.stringify(req.body.SS_EG), JSON.stringify(req.body.PDZ_EG), JSON.stringify(req.body.FS_EG), JSON.stringify(req.body.expand__1), JSON.stringify(req.body.expand__2), JSON.stringify(req.body.expand__3), JSON.stringify(req.body.additional_end_label)], false, function (err, results) {
        if (err) console.log("error")
    })
    return res.redirect('/scout');
}


exports.scoutingData = function (res) {
    db.get(null, "scout_data", null, null, null, "create_time DESC", function (err, results) {
        db.get(null, "team", null, null, null, "team_number", function (err, teams) {
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
            return res.render('scout/scoutingData.ejs', {
                results: results,
            });
        })
    })
}

exports.scout = function (res) {
        db.get(null, "user", null, null, null, null, function (err, users) {
            db.get(null, "team", null, null, null, "team_number", function (err, results) {
                db.get(null, "events", null, null, null, "Date DESC", function (err, results1) {
                    var name = [];
                    for (var i = 0; i < results.length; i++) {
                        name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
                    }
                    return res.render('scout/scouttt.ejs', {
                        date: moment().format('LLL'),
                        name: name,
                        users, users,
                        results: results,
                        results1: results1,
                    });
                })
            })
        })
}

exports.scoutEdit = function (res, dataId) {
    try {
        db.get(null, "scout_data", ["id"], [dataId], null, null, function (err, results) {
            if (err) console.error(err)
            if (results.length > 0) {
                db.get(null, "events", null, null, null, null, function (err, events) {
                    db.get(null, "team", null, null, null, null, function (err, teams) {
                        intend = results[0]['team_number'];
                        needed = results[0]['event_name'];
                        results[0]['add_teleop_d'] = results[0]['found_auto_d'].toString();
                        results[0]['add_end_d'] = results[0]['found_end_d'].toString();
                        console.log(results[0]['team1_name'])
                        var name = [];
                        for (var i = 0; i < teams.length; i++) {
                            name.push("(" + teams[i]['team_number'] + ") " + teams[i]['name'])
                        }
                        return res.render('scout/scoutttEdit.ejs', {
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
                return res.redirect("/scoutingData")
            }

        })
        db.query("SELECT * FROM scout_data WHERE id = " + dataId, function (err, results) {


        })
    } catch (error) {
        console.log("error")
        console.error(error);
        return res.redirect('/scoutingData')
    }
} 

exports.add = function (res, num) {
    db.get(null, "team", null, null, null, "team_number", function(err, results) {
        db.get(null, "events", null, null, null, null, function(err, results1) {
            var name = [];
          for (var i = 0; i < results.length; i++) {
            name.push("(" + results[i]['team_number'] + ") " + results[i]['name'])
          }
          return res.render('simulation/addTeams', {
            date: moment().format('LLL'),
            name: name,
            results: results,
            results1: results1,
            amount: num
          });
        })
    })
}