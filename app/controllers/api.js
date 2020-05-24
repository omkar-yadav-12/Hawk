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
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });
    //console.log(data)
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

exports.results = function (req, res) {
    api.getTeamRankings(req.params.results, year).then((data) => {
        let name = [];
        let results = []
        let average = 0;
        let wins = 0;
        let losses = 0;
        let ties = 0;
        for (let i = 0; i < data.length; i++) {
            average += data[i]['opr']
            wins += data[i]['wins']
            losses += data[i]['losses']
            ties += data[i]['ties']
        }
        average /= 4;
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
    })
}

// api.getTeamRankings("8696").then((parameter) => {
//     console.log(parameter)
// })
exports.updateOPR = function (res) {
    console.log("OPR")
    db.get(["team_number"], "team", null, null, null, "opr", function (err, results) {
        if (err) console.log("error")
        console.log(results.length)
        console.log(results)
        for (var obj in results) {
            let id = results[obj]["team_number"]
            call("team/" + id + "/results/1920").then(function (parameters) {
                console.log(parameters.length)
                if (id != undefined && id != null) {
                    let average = 0;
                    for (var i = parameters.length - 2; i < parameters.length; i++) {
                        average += parameters[i]['opr'];
                    }
                    average /= 2;
                    average = Math.round(average * 100.0) / 100.0;
                    console.log("OPR " + average + " " + id)
                    db.update("team", ["opr"], [average], "team_number", id, null, function (err, results) {
                        if (err) console.log("error")
                    })
                }
            })
        }
        return res.redirect('/updateWLT')
    })
}

exports.updateWLT = function (res) {
    db.get(["team_number"], "team", null, null, null, "wl", function (err, results) {
        if (err) console.log("error")
        for (obj in results) {
            let id = results[obj]['team_number']
            call("team/" + id + "/results/1920").then(function (parameters) {
                try {
                    let wins = 0;
                    let losses = 0;
                    let ties = 0;
                    for (var obj in parameters) {
                        if (id == 8696) console.log(parameters[obj]);
                        if(wins > 10) wins -= 10
                        wins += parameters[obj]['wins']
                        losses += parameters[obj]['losses']
                        ties += parameters[obj]['ties']
                    } 
                    percentage = Math.round((wins + (.5 * ties)) / (wins + losses + ties) * 10000.0) / 10000.0
                    db.update("team", ["wl"], [percentage], "team_number", id, null, function (err, results) {
                        if (err) console.log("error")
                    })
                }
                catch (e) {
                    console.error(e)
                }
            })
        }
        return res.redirect("/simulation")
    })
}

exports.add = function (req, res) {
    let results1 = [];
    let id = req.params.value
    if (id != null && id != undefined) {
        console.log(1)
        api.getTeam(id).then((data) => {
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
                return res.render('team.ejs', {
                    results: results1
                });
            }
            else {
                return res.render('team.ejs', {
                    results: [],
                    id: req.params.value
                });
            }
        })


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

exports.teamMatches = function (req, res) {
    call('team/' + req.params.key + '/matches/1920').then(function (results) {
        res.send(results)
    })
}

exports.teamEvents = function (req, res) {
    call('team/' + req.params.key + '/events/1920').then(function (results) {
        res.send(results)
    })
}


module.exports.call = call;