const db = require('/db.js');

exports.create = function(first, last, grade, email, team, password) {
    var values = [userId, text, new Date().toISOString()]
    db.query('INSERT INTO comments (first, last, grade, email, team, password) VALUES(?, ?, ?, ?, ?, ?)', values, function(err, result) {
      if (err) return done(err)
    })
  }