const db = require('../db')
const moment = require('moment')

exports.tournamentData = function (res) {
  db.get(null, "events", null, null, null, null, function (err, results) {
    for (var i = 0; i < results.length; i++) {
      results[i]['Date'] = moment(results[0]['Date']).format('LLLL')
    }
    return res.render('tournamentData.ejs', {
      results: results,
    });
  })
}