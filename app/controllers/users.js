const moment = require('moment');
const db = require('../db')
const bcrypt = require('bcrypt')
const fs = require('fs')
exports.user_list = function (res) {
  db.get(null, "user", null, null, null, "last_name", async function (err, results) {
    if (err) throw err;
    let teamName = []
    let team = fs.readFileSync('app/data/teams/allTeamsDetails.json')
    team = JSON.parse(team)
    for (let i = 0; i < results.length; i++) {
      results[i]['create_time'] = moment(results[i]['create_time']).format('LL')
      team = team.filter(element => element[0].team_key == results[i].team)
      if (team[0][0]['team_name_short'] != null) teamName.push(team[0][0]['team_name_short'])
      else teamName = teamName.push(team['team_name_long'])
    }
    return res.render('misc/userss.ejs', {
      color: "red",
      length: results.length,
      results: results,
      teamName: teamName,
      title: `Users « ${process.env.APP_NAME}`,

    });
  })

}

exports.register = async function (req, res) {
  try {
      let hash = await bcrypt.hash(req.body.password, 10)
      let array = [["first_name", "last_name", "grade", "email", "team", "password", "dis", "create_time"], [req.body.first_name, req.body.last_name, req.body.grade, req.body.email, req.body.team, hash, 1]]
      db.insert("user", array[0], array[1], true, function (err, results) {
          if (err) console.log("error");
          return res.redirect('/login');
      })
  } catch {
      res.redirect('register')
  }
}



