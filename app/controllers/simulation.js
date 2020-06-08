const db = require('../db')
const apis = require('./api')
const moment = require('moment')
const { API } = require('@the-orange-alliance/api');
const api = new API("afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8", "hawk");
const fs = require('fs')
const year = 1920
function delay(t, val) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val);
        }, t);
    });
}
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
        return res.render('simulation/tab.ejs', {
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
        return res.render('simulation/tournamentGames', {
            games: final_values,
            teams: teams
        })
    })
}

function sort(teams, data) {
    for (let i = 0; i < data.length; i++) {
        //console.log(teams.find(element => element['event_key'] == teams['_eventKey'])['_startDate'])
        let event = teams.find(element => element['event_key'] == data[i]['event_key'])
        if (event == undefined) data[i]['date'] = 0
        else data[i]['date'] = event['start_date']
    }
    data = data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    return data
}

exports.tourneyConfigure = async function (req, res) {
    let event = fs.readFileSync('app/apiData/events/allEventsMatches.json')
    event = JSON.parse(event)
    event = event.find(element => element[0].event_key == req.params.event_name)
    let rankings = fs.readFileSync('app/apiData/events/allEventsRankings.json')
    rankings = JSON.parse(rankings)
    rankings = rankings.find(element => element[0].event_key == req.params.event_name)
    let events = fs.readFileSync('app/apiData/events/allEventsInfo.json')
    events = JSON.parse(events)
    events = events.find(element => element[0].event_key == req.params.event_name)
    events = events[0]
    let allEvents = fs.readFileSync('app/apiData/events/allEvents.json')
    allEvents = JSON.parse(allEvents)
    // console.log(event[0])
    // console.log(event[0]['_matchParticipants'][0]['_teamKey'])
    let teams = fs.readFileSync('app/apiData/events/allEventsTeams.json')
    teams = JSON.parse(teams)
    teams = teams.find(element => element[0].event_key == req.params.event_name)
    let teamResults = fs.readFileSync('app/apiData/teams/allTeamsResults.json')
    teamResults = JSON.parse(teamResults)
    for (obj in teams) {
        teams[obj]['wins_'] = 0
        teams[obj]['losses_'] = 0
        teams[obj]['ties_'] = 0
    }
    for (let i = event.length - 1; i >= 0; i--) {
        if (event[i]['red_score'] == -1 || event[i]['blue_score'] == -1) {
            event.splice(i, 1)
        }
    }

    //let array = [];
    let teams_array = []
    let simulated_matches = []
    let team_matches = []
    let team_data = []
    //for (obj in event) array.push([event[obj]['red_score'], event[obj]['blue_score']])
    console.log(teams.length)
    for (let i = 0; i < teams.length; i++) {
        let data = teamResults.find(element => element[0].team_key == teams[i]['team_key'])
        if (data == undefined) data = await apis.call('team/' + teams[i]['team_key'] + '/results/1920')
        // let data = await apis.call('team/' + teams[i]['teamKey'] + '/results/1920')
        teams_array.push(sort(allEvents, data))
    }
    let q = 0
    for (obj in teams_array) {
        let opr = 0;
        let wins = 0;
        let losses = 0;
        let ties = 0;
        for (let i = teams_array[obj].length - 1; i >= 0; i--) {
            let tourney = allEvents.find(element => element['event_key'] == teams_array[obj][i]['event_key'])
            if (tourney == undefined || tourney['start_date'] >= events['start_date']) teams_array[obj].splice(i, 1)
        }
        let x = 0;
        let y = teams_array[obj].length
        if (teams_array[obj].length > 2) {
            x = teams_array[obj].length - 2
            y = 2
        }
        let matches = fs.readFileSync('app/apiData/events/allEventsMatches.json')
        matches = JSON.parse(matches)
        // final league tournaments have ten additional matches added on from the past, so account for this in the rankings data here by calculating actual matches that were played 
        for (let i = x; i < teams_array[obj].length; i++) {
            //if (q === 0) console.log(teams_array[obj][i])
            
            if (teams_array[obj][i]['wins'] + teams_array[obj][i]['losses'] + teams_array[obj][i]['ties'] > 9) {
                matches = matches.find(element => element[0].event_key == teams_array[obj][i].event_key)
                if (matches.length == 0) matches = await apis.call('event/' + teams_array[obj][i]['event_key'] + '/matches')
                let team = teams_array[obj][i]['team_key']
                for (let j = 0; j < matches.length; j++) {
                    for (let k = 0; k < 4; k++) {
                        // if (i == x) this.alert(event[j]['event_key'] + " " + event[0]['participants'][k]['team_key'] + " " + event[1]['participants'][k]['team_key'])
                        if (matches[j]['participants'][k]['team_key'] == team && matches[j]['match_name'].indexOf("Quals") != -1) {
                            //if (team == 10069) this.alert(matches[j]['match_name'] + " " + matches[j]['red_score'] + " " + matches[j]['blue_score'])
                            if (k === 0 || k === 1) {
                                if (matches[j]['red_score'] > matches[j]['blue_score']) wins++
                                else if (matches[j]['red_score'] < matches[j]['blue_score']) losses++
                                else ties++
                            } else {
                                if (matches[j]['red_score'] < matches[j]['blue_score']) wins++
                                else if (matches[j]['red_score'] > matches[j]['blue_score']) losses++
                                else ties++
                            }
                        }
                    }
                }
            } else {
                wins += teams_array[obj][i]['wins']
                losses += teams_array[obj][i]['losses']
                ties += teams_array[obj][i]['ties']
            }


            opr += teams_array[obj][i]['opr']

        }
        if (teams_array[obj].length == 0) team_data.push([team, 0, 0])
        else team_data.push([teams_array[obj][0]['team_key'], Math.round(opr / y * 100.0) / 100.0, Math.round((wins + .5 * ties) / (wins + losses + ties) * 100.0) / 100.0])
    }
    for (obj in event) {
        if (event[obj]['match_name'].indexOf('Quals') != -1) {
            simulated_matches.push([Math.round((team_data.find(element => element[0] == event[obj]['participants'][0]['team_key'])[1] +
                team_data.find(element => element[0] == event[obj]['participants'][1]['team_key'])[1]) * 100.0) / 100.0,
            Math.round((team_data.find(element => element[0] == event[obj]['participants'][0]['team_key'])[2] +
                team_data.find(element => element[0] == event[obj]['participants'][1]['team_key'])[2]) * 100.0) / 100.0,
            Math.round((team_data.find(element => element[0] == event[obj]['participants'][2]['team_key'])[1] +
                team_data.find(element => element[0] == event[obj]['participants'][3]['team_key'])[1]) * 100.0) / 100.0,
            Math.round((team_data.find(element => element[0] == event[obj]['participants'][2]['team_key'])[2] +
                team_data.find(element => element[0] == event[obj]['participants'][3]['team_key'])[2]) * 100.0) / 100.0])
        }
    }

    for (let i = 0; i < simulated_matches.length; i++) {
        let x = simulated_matches[i][0] / (simulated_matches[i][0] + simulated_matches[i][2])
        let y = simulated_matches[i][1] / (simulated_matches[i][1] + simulated_matches[i][3])
        let a = 1 - x
        let b = 1 - y
        b *= 1.75
        a *= 1
        x *= 1
        y *= 1.75
        team_matches.push([(x + y) * 100 / 2, (a + b) * 100 / 2])
    }

    for (let i = 0; i < event.length; i++) {
        if (event[i]['match_name'].indexOf('Quals') == -1) continue
        let team = event[i]['participants']
        if (team_matches[i][0] > team_matches[i][1]) {
            teams.find(element => element['team_key'] == team[0]['team_key'])['wins_']++
            teams.find(element => element['team_key'] == team[1]['team_key'])['wins_']++
            teams.find(element => element['team_key'] == team[2]['team_key'])['losses_']++
            teams.find(element => element['team_key'] == team[3]['team_key'])['losses_']++
        } else if (team_matches[i][0] < team_matches[i][1]) {
            teams.find(element => element['team_key'] == team[0]['team_key'])['losses_']++
            teams.find(element => element['team_key'] == team[1]['team_key'])['losses_']++
            teams.find(element => element['team_key'] == team[2]['team_key'])['wins_']++
            teams.find(element => element['team_key'] == team[3]['team_key'])['wins_']++
        } else {
            teams.find(element => element['team_key'] == team[0]['team_key'])['ties_']++
            teams.find(element => element['team_key'] == team[1]['team_key'])['ties_']++
            teams.find(element => element['team_key'] == team[2]['team_key'])['ties_']++
            teams.find(element => element['team_key'] == team[3]['team_key'])['ties_']++
        }
    }
    // In final league tournaments you carry over 10 wins in your rankings, but we dont really care about those. 
    for (let i = 0; i < rankings.length; i++) {
        let team = rankings[i]['team_key']
        let w = 0;
        let l = 0;
        let t = 0;
        for (let j = 0; j < event.length; j++) {
            for (let k = 0; k < 4; k++) {
                if (event[j]['participants'][k]['team_key'] == team && event[j]['match_name'].indexOf("Quals") != -1) {
                    if (event[j]['participants'][k]['team_key'] == team && event[j]['match_name'].indexOf("Quals") != -1) {
                        if (k === 0 || k === 1) {
                            if (event[j]['red_score'] > event[j]['blue_score']) w++
                            else if (event[j]['red_score'] < event[j]['blue_score']) l++
                            else t++
                        } else {
                            if (event[j]['red_score'] < event[j]['blue_score']) w++
                            else if (event[j]['red_score'] > event[j]['blue_score']) l++
                            else t++
                        }

                    }
                }
            }
        }
        rankings[i]['wins'] = w;
        rankings[i]['losses'] = l;
        rankings[i]['ties'] = t;
    }
    for (let i = 0; i < team_matches.length; i++) {
        let x = 100 * team_matches[i][0] / (team_matches[i][0] + team_matches[i][1])
        let y = 100 * team_matches[i][1] / (team_matches[i][0] + team_matches[i][1])

        team_matches[i][0] = Math.round(x * 100.0) / 100.0
        team_matches[i][1] = Math.round(y * 100.0) / 100.0
    }
    let accuracy = 0;
    for (let i = 0; i < team_matches.length; i++) {
        if (team_matches[i][0] > team_matches[i][1] && event[i]['red_score'] > event[i]['blue_score']) accuracy++
        else if (team_matches[i][0] < team_matches[i][1] && event[i]['red_score'] < event[i]['blue_score']) accuracy++
        else continue;
    }
    accuracy /= team_matches.length
    accuracy = Math.round(accuracy * 10000.0) / 100.0
    return res.render('simulation/tournamentSimulation', {
        event: event,
        sim_matches: simulated_matches,
        match: team_matches,
        rankings: rankings,
        accuracy: accuracy
    })
}

// async function x(a, b, results,) {

//     let teams = []
//     let data = []
//     let list = []
//     let outcomes = []
//     let oprOutcomes = []
//     let wlOutcomes = []

//     let matches = await api.getEventMatches('1920-IA-CMP2')
//     //console.log(matches.length)
//     for (obj in matches) {
//         if (matches[obj]['redScore'] > matches[obj]['blueScore']) list.push(1);
//         else if (matches[obj]['redScore'] < matches[obj]['blueScore']) list.push(0);
//         else list.push(.5)
//         for (let i = 0; i < 4; i++) teams.push(matches[obj]['_matchParticipants'][i]['_teamKey'])
//     }
//     // console.log(list.length)
//     for (obj in teams) {
//         for (obj1 in results) {
//             if (teams[obj] == results[obj1].team_number) {
//                 //console.log(results[obj1]['team_number'])
//                 data.push([results[obj1].opr, results[obj1].wl, results[obj1].team_number])
//             } 
//         }
//     }

//     for (let i = 0; i < data.length; i += 4) {
//         let w = data[i][0] + data[i + 1][0]
//         let x = data[i + 2][0] + data[i + 3][0]
//         let y = data[i][1] + data[i + 1][1]
//         let z = data[i + 2][1] + data[i + 3][1]
//         let s, t, u, v;
//         if (w > x) oprOutcomes.push(1)
//         else if (w < x) oprOutcomes.push(0)
//         else oprOutcomes.push(.5)
//         s = w / (w + x)
//         t = 1 - s
//         u = y / (z + y)
//         v = 1 - u
//         if (y > z) wlOutcomes.push(1)
//         else if (y < z) wlOutcomes.push(0)
//         else wlOutcomes.push(.5)


//         // console.log(a)
//         //console.log((s+u) * a + " " + (t+v) * b)
//         if ((s + u) * a > (t + v) * b) outcomes.push(1);
//         else if ((s + u) * a < (t + v) * b) outcomes.push(0);
//         else {
//             if (a > b) outcomes.push((s + u) * a)
//             else outcomes.push((s + u) * b)
//         }
//     }
//     let wl = 0;
//     let opr = 0
//     let over = 0
//     // console.log(outcomes)
//     // console.log(list)
//     for (let i = 0; i < outcomes.length; i++) {
//         if (outcomes[i] === list[i]) over++
//         if (oprOutcomes[i] === list[i]) opr++
//         if (wlOutcomes[i] === list[i]) wl++
//     }
//     //console.log(wl)
//     let q = outcomes.length
//     console.log(a + " " + b + " " + (over / q) * 100 + " " + (opr / q) * 100 + " " + (wl / q) * 100)
//     //console.log(a + " " + (over / q) * 100)


// }

// function y() {

//     // db.get(null, "team", null, null, null, "team_number", function (err, results) {
//     //        for (let i = .7; i <= 1.5; i+= .05) {
//     //             x(1, i, results)
//     //        } 
//     //     x(1, 1, results)
//     // })

// }

// y()


