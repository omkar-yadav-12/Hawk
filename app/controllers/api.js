const fetch = require('node-fetch')
const moment = require('moment')
const db = require('../db')
const year = 1920
const headers = {
    'Content-Type': 'application/json',
    'X-TOA-KEY': 'afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8',
    'X-Application-Origin': 'hawk',
}
const { API } = require('@the-orange-alliance/api');
const api = new API("afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8", "hawk");
async function call(link) {
    console.log("https://theorangealliance.org/api/" + link)
    let data = await fetch("https://theorangealliance.org/api/" + link, {
        method: 'get',
        headers
    })
        .then((response) => response.json())
        .then((data) => { return data })
        .catch(error => { console.error(error) })
    return data
}

exports.search = function (team, search) {
    let teams = [];
    for (var obj in team)
        if (team[obj]._teamKey.includes(search)) {
            teams.push(team[obj])
            if (team[obj]._teamNameShort === null) {
                team[obj]._teamNameShort = team[obj]._teamNameLong
            }

        }
    console.log(teams.length)
    return teams;
}

exports.match = function (json) {
    json.red.tower_level_bonus *= 2;
    json.blue.tower_level_bonus *= 2;
    if (json.red.robot_1.cap_level == -1) json.red.robot_1.cap_level = 0
    if (json.blue.robot_1.cap_level == -1) json.blue.robot_1.cap_level = 0
    if (json.blue.robot_2.cap_level == -1) json.blue.robot_2.cap_level = 0
    if (json.red.robot_2.cap_level == -1) json.red.robot_2.cap_level = 0
    return json
}

exports.keyword = function (json, keyword) {
    let array = []
    for (var obj in json) {
        if (json[obj]._eventName.includes(keyword)) {
            json[obj]._startDate = moment(json[obj]._startDate).format('MM-DD-YYYY')
            array.push(json[obj]);
        }
    }
    return array;
}

exports.results = async function (req, res) {
    let data = await api.getTeamRankings(req.params.results, year)
    let name = [];
    let results = []
    let average = 0;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    for (let i = 0; i < data.length; i++) {
        wins += data[i]['wins']
        losses += data[i]['losses']
        ties += data[i]['ties']
        if (data[i]['wins'] > 10) wins -= 10
    }
    for (let i = data.length - 2; i < data.length; i++) {
        console.log(data[i])
        average += data[i]['opr']
    }
    average /= 2;
    average = Math.round(average * 10000.0) / 10000.0
    let percentage = Math.round(((wins + (ties * .5)) / (wins + ties + losses)) * 10000.0) / 10000.0
    console.log(data)
    if (data.length > 0) {
        let team_name;
        if (data[0]['team']['teamNameShort'] != null) team_name = data[0]['team']['teamNameShort']
        else team_name = data[0]['team']['teamNameLong']
        name.push([data[0]['team']['teamKey'], "(" + data[0]['team']['teamKey'] + ") " + team_name + " " + data[0]['team']["city"] + ", " + data[0]['team']["stateProv"]])
        results.push([data[0]['team']['teamKey'], team_name, data[0]['team']["city"] + ", " + data[0]['team']["stateProv"], data[0]['team']['leagueKey'], average, percentage])
        console.log(name[0][0])
    } else {
        results = [["", "", "", "", "", ""]];
        name.push([req.params.results, ""])
        data = [""]
    }
    console.log(name[0][1])
    return res.render('api/simalAdd',
        {
            length: 0,
            test: [[]],
            results: results,
            data: data,
            name: name,
        })
}
function delay(t, val) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val);
        }, t);
    });
}
// api.getTeamRankings("8696").then((parameter) => {
//     console.log(parameter)
// })
function sort(teams, data) {
    for (let i = 0; i < data.length; i++) {
        //console.log(teams.find(element => element['event_key'] == teams['_eventKey'])['_startDate'])
        let event = teams.find(element => element['_eventKey'] == data[i]['eventKey'])
        if (event == undefined) data[i]['date'] = 0
        else data[i]['date'] = event['_startDate']
    }
    data = data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    return data
}
//Change this to update both OPR and WIN Loss in the same router call... should save lots of time and wont throw as many errors
exports.updateOPR = function (res) {
    db.get(["team_number"], "team", null, null, null, "opr", async function (err, results) {
        if (err) console.log("error")
        console.log("EEE")
        let events = await api.getEvents()
        try {
            for (var obj in results) {
                let id = results[obj]["team_number"]
                //let parameters = await call("team/" + id + "/results/1920")
                let parameters = sort(events, await api.getTeamRankings(id, year))
                await delay(1000)
                console.log(parameters[0])
                if (id != undefined && id != null) {
                    let average = 0;
                    let wins = 0;
                    let losses = 0;
                    let ties = 0;
                    for (var i = parameters.length - 2; i < parameters.length; i++) {
                        if (id == 8696) console.log(parameters[i]);
                        wins += parameters[i]['_wins']
                        losses += parameters[i]['_losses']
                        ties += parameters[i]['_ties']
                        if (parameters[i]['_wins'] > 10) wins -= 10
                        average += parameters[i]['_opr'];
                    }
                    percentage = Math.round((wins + (.5 * ties)) / (wins + losses + ties) * 10000.0) / 10000.0
                    average /= 2;
                    average = Math.round(average * 100.0) / 100.0;
                    console.log("OPR " + average + " " + id)
                    db.update("team", ["opr", "wl"], [average, percentage], "team_number", id, null, function (err, results) {
                        if (err) console.log("error")
                    })
                }
            }
        }
        catch (err) {
            console.error(err)
        }
        return res.redirect('/simSel')
    })
}

// exports.updateWLT = function (res) {
//     db.get(["team_number"], "team", null, null, null, "wl", async function (err, results) {
//         if (err) console.log("error")
//         for (obj in results) {
//             let id = results[obj]['team_number']
//             let events = await api.getEvents()
//             try {
//                 let parameters = sort(events, await api.getTeamRankings(id, year))
//                 await delay(1000)
//                 if (id == 8696) console.log(parameters)
//                 let wins = 0;
//                 let losses = 0;
//                 let ties = 0;
//                 for (let i = 0; i < parameters.length; i++) {
//                     if (id == 8696) console.log(parameters[i]);
//                     wins += parameters[i]['_wins']
//                     losses += parameters[i]['_losses']
//                     ties += parameters[i]['_ties']
//                     if (parameters[i]['_wins'] > 10) wins -= 10
//                 }
//                 percentage = Math.round((wins + (.5 * ties)) / (wins + losses + ties) * 10000.0) / 10000.0
//                 db.update("team", ["wl"], [percentage], "team_number", id, null, function (err, results) {
//                     if (err) console.log("error")
//                 })
//             }
//             catch (e) {
//                 console.error(e)
//             }
//         }
//         return res.redirect("/simulation")
//     })
// }

exports.add = async function (req, res) {
    let results1 = [];
    let id = req.params.value
    if (id != null && id != undefined) {
        console.log(1)
        let data = await api.getTeam(id)
        results1 = ["", "", "", "", id];
        if (data != undefined || data != null && data[teamKey] > 0) {
            results1[0] = (data['teamNameShort']);
            results1[1] = (data["teamNameLong"])
            results1[2] = (data["city"] + ", " + data["stateProv"])
            if (data["leagueKey"] != null) results1[3] = (data["leagueKey"])
            else results1[3] = ""
            results1[4] = id
            if (results1[1].includes("School")) results1[1] = results1[1].substring(0, results1[1].indexOf("School") + 6)
            if (results1[0] == null && !results1[1].includes("School")) {
                results1[0] = results1[1]
                results1[1] = null
            }
            return res.render('misc/team.ejs', {
                results: results1
            });
        }
        else {
            return res.render('misc/team.ejs', {
                results: [],
                id: req.params.value
            });
        }
    }
}

exports.teamSearch = function (res) {
    let data = [""];
    let results = [["", "", "", "", "", ""]]
    let name = [["", ""]]
    return res.render('api/simalAdd',
        {
            length: 0,
            test: [[]],
            results: results,
            data: data,
            name: name
        })
}

exports.teamMatches = async function (req, res) {
    let results = await call('team/' + req.params.key + '/matches/1920')
    res.send(results)
}

exports.teamEvents = async function (req, res) {
    let results = await call('team/' + req.params.key + '/events/1920')
    let events = []
    for (obj in results) events.push(await api.getEvent(results[obj]['event_key']))
    for (obj in events) events[obj]['startDate'] = moment(events[obj]['startDate']).format('MM-DD-YYYY')
    // events = events.sort((a,b) => b['startDate'] - a['startDate'])
    res.render('api/teamEventSelect.ejs', {
        events: events
    })
}

async function x() {
    //let results = await call('team/8696/results/1920')
    let results = await api.getTeamRankings('8696', year)
    let wins = 0;
    let ties = 0;
    let losses = 0
    for (obj in results) {
        wins += results[obj]['_wins']
        ties += results[obj]['_ties']
        losses += results[obj]['_losses']
        if (results[obj]['_wins'] > 10) wins -= 10
    }
    console.log((wins + .5 * ties) / (losses + ties + wins))
}
x()
module.exports.call = call;