const moment = require('moment');

exports.user_list = function(results) {
for (var i = 0; i < results.length; i++) {
    results[i]['create_time'] = moment(results[i]['create_time']).
      format('LL')
    if (results[i]['team'] == 86960) {
      results[i]['teamName'] = "Admin"
      results[i]['icon'] == "person"
    } else if (results[i]['team'] == 86961) {
      results[i]['teamName'] = "Programmer"
      results[i]['icon'] == "computer"
    } else if (results[i]['team'] == 86962) {
      results[i]['teamName'] = "Builder"
      results[i]['icon'] == "build"
    } else {
      results[i]['teamName'] = "Documenter"
      results[i]['icon'] == "assignment"
    }
  }
}