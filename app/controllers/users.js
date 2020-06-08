const moment = require('moment');
const db = require('../db')
const { API } = require('@the-orange-alliance/api');
const api = new API("afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8", "hawk");
const fs = require('fs')
exports.user_list = function (res) {
  db.get(null, "user", null, null, null, "last_name", async function (err, results) {
    if (err) throw err;
    let team = fs.readFileSync('app/apiData/teams/allTeamsDetails.json')
    team = JSON.parse(team)
    for (let i = 0; i < results.length; i++) {
      results[i]['create_time'] = moment(results[i]['create_time']).format('LL')
      team = team.filter(element => element.team_key == results[i].team)
      console.log(team)
      if (team['team_name_short'] != null) results[i].teamName = team['team_name_short']
      else results[i].teamName = team['team_name_long']
    }
    return res.render('misc/userss.ejs', {
      color: "red",
      length: results.length,
      results: results,
      title: `Users « ${process.env.APP_NAME}`,

    });
  })

}



