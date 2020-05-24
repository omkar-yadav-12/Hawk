const db = require('../db')
exports.opr = function (req, res) {
    db.get(null, "team", null, null, null, "team_number", function (err, team) {
        if (err) console.log("error")
        var results = [];
        for (var i = 0; i < team.length; i++) if (req.body[i] == 'on') results.push(team[i])
        var scores = [];
        var combinations = [];
        var final = [];
        for (var i = 0; i < results.length; i++) {
            scores.push([results[i]['team_number'], "(" + results[i]['team_number'] + ") " + results[i]['name'] + ", " + results[i]['location'], results[i]['opr'], 0, 0, 0, 0, results[i]['wl'], 0, 0, 0, 0]);
        }
        console.log(scores[0])
        for (var i = 0; i < scores.length - 1; i++) {
            for (var g = i + 1; g < scores.length; g++) {
                combinations.push([scores[i][0], scores[i][1], scores[g][0], scores[g][1], Math.round((scores[i][2] + scores[g][2]) * 10.0) / 10.0, Math.round((scores[i][7] + scores[g][7]) / 2 * 1000.0) / 1000.0]);
            }
        }
        console.log(combinations[0])
        for (var i = 0; i < combinations.length - 1; i++) {
            for (var g = i; g < combinations.length; g++) {
                if (combinations[i][0] == combinations[g][0] || combinations[i][0] == combinations[g][2] || combinations[i][2] == combinations[g][0] || combinations[i][2] == combinations[g][2]) continue;
                final.push([combinations[i], combinations[g]])
                var location = 0, location1 = 0, location2 = 0, location3 = 0;
                for (var x = 0; x < scores.length; x++) {
                    if (scores[x][0] == combinations[i][0]) location = x;
                    if (scores[x][0] == combinations[i][2]) location1 = x;
                    if (scores[x][0] == combinations[g][0]) location2 = x;
                    if (scores[x][0] == combinations[g][2]) location3 = x;
                }
                if (combinations[i][4] > combinations[g][4]) {
                    scores[location][3]++
                    scores[location1][3]++
                    scores[location2][4]++
                    scores[location3][4]++
                } else if (combinations[i][4] < combinations[g][4]) {
                    scores[location][4]++
                    scores[location1][4]++
                    scores[location2][3]++
                    scores[location3][3]++
                } else {
                    scores[location][5]++
                    scores[location1][5]++
                    scores[location2][5]++
                    scores[location3][5]++
                }
                if (combinations[i][5] > combinations[g][5]) {
                    scores[location][8]++
                    scores[location1][8]++
                    scores[location2][9]++
                    scores[location3][9]++
                } else if (combinations[i][5] < combinations[g][5]) {
                    scores[location][9]++
                    scores[location1][9]++
                    scores[location2][8]++
                    scores[location3][8]++
                } else {
                    scores[location][10]++
                    scores[location1][10]++
                    scores[location2][10]++
                    scores[location3][10]++
                }
            }
        }
        for (var i = 0; i < scores.length; i++) {
            scores[i][6] = (Math.round(((scores[i][3] + (scores[i][5] * .5)) / (scores[i][3] + scores[i][4] + scores[i][5])) * 10000.00) / 100.00)
            scores[i][11] = (Math.round(((scores[i][8] + (scores[i][10] * .5)) / (scores[i][8] + scores[i][9] + scores[i][10])) * 10000.00) / 100.00)
            scores[i][12] = (scores[i][6] + scores[i][11])
        }
        scores.sort(function (a, b) {
            if (a[12] > b[12]) return -1;
            if (a[12] < b[12]) return 1;
            return 0;
        });
        return res.render('tab.ejs', {
            final: final,
            scores: scores,
        });
    })


}

exports.configure = function (req, res) {
    db.get(null, "team", null, null, null, "team_number", function (err, team) {
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
        console.log(final_values)
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
            } else if (final_values[i][9] == 'b') {
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
        return res.render('tournamentGames', {
            games: final_values,
            teams: teams
        })
    })
}