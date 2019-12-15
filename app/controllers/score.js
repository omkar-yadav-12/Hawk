const db = require('/Users/omkaryadav/Documents/GitHub/Hawk/db.js')
const moment = require('moment')
 query = (a, b, c, d) => {
    db.query("SELECT * FROM hawk.score_data WHERE event_name = '" + a + "' AND  match_num =  " + b + " AND field_num = " + c + " AND alliance = '" + d+  "';", function(err, penalties){
      if (err) throw err;
      else {
        return (penalties)
      }
    })
  }

exports.total_score  = (teams, results) => {
    var names = ['skystone', 'stone', 'none'];
    var name = [];
    for(var i = 0; i < teams.length; i++) {
        name.push([teams[i]['team_number'], teams[i]['name'], teams[i]['school']])
    }
    for (var i = 0; i < results.length; i++) {
      var alliance; 
      if (results[i]['allaince'] == "Red") {
        alliance = "Blue" } else {
          alliance = "Red"
        }
      penalties = query(results[i]['event_name'], results[i]['match_num'], results[i]['field_num'] , alliance)
      
      if (penalties == undefined) {
        var penalties = []
        penalties[0] = 0;
        penalties[1] = 0
      }
      results[i]['create_time'] = moment(results[i]['create_time']).format('LLL')
      results[i]['total'] = 0;
      var t = results[i]['total']; // Set t = results[i]['total'] so it is easier to type out
      for(s = 0; s < 2; s++) {
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
      if (results[i]['r2n'] == 1 ) t += 5
      t += (results[i]['returned_auto'] + (results[i]['placed_auto'] * 4));
      t += (results[i]['delivered'] + (results[i]['tallest_sky'] * 2));
      t -= (results[i]['returned_drs']);
      t += results[i]['placed_drs'] ;
      if (results[i]['found_moved'] == 1) t += 15
      if (results[i]['cap1'] == 1) t += 5
      if (results[i]['cap2'] == 1) t += 5
      if (results[i]['parked1'] == 1) t += 5
      if (results[i]['parked2'] == 1) t += 5
      t += (results[i]['r1l'] + results[i]['r2l']);
      if (results[i]['alliance'] != "Blue") results[i]['alliance'] = "Red"
      console.log(results[i]['alliance'])
      console.log("t = " + t)
      results[i]['total'] = t;
      console.log(results[i]['total']); // resasign total as t
      for (var g = 0; g < teams.length; g++) {
        if (results[i]['team1_name'] == name[g][0]) results[i]['team1_name'] = "(" + name[g][0] + ") " + name[g][1] + ", " + name[g][2];
        if (results[i]['team2_name'] == name[g][0]) results[i]['team2_name'] = "(" + name[g][0] + ") " + name[g][1] + ", " + name[g][2];
      }
    }
    return(results)
}
