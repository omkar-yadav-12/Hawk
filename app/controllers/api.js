const fetch = require('node-fetch')
const moment = require('moment')
const db = require('../db')
const year = 1920
const fs = require('fs');
const { API } = require('@the-orange-alliance/api');
const api = new API("afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8", "hawk");

const fetchData = {
    'method': 'GET',
    'headers': {
        'Content-Type': 'application/json',
        'X-TOA-KEY': 'afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8',
        'X-Application-Origin': 'hawk',
    }
}
function delay(t, val) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val);
        }, t);
    });
}
async function call(link) {
    await delay(1000)
    console.log("https://theorangealliance.org/api/" + link)
    while (true) {
        let response = await fetch("https://theorangealliance.org/api/" + link, fetchData)
        if (response.status == 429) {
            await delay(10000)
            continue;
        }
        let data = response.json()
        return data
    }
}

exports.search = function (keyword) {
    let allTeams = fs.readFileSync('app/apiData/teams/allTeams.json')
    let data = JSON.parse(allTeams)
    let teams = data.filter(event => event.team_key.includes(keyword))
    for (obj in teams) if (teams[obj].team_name_short === null) team[obj].team_name_short = team[obj].team_name_long
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

exports.keyword = function (keyword) {
    let allEvents = fs.readFileSync('app/apiData/events/allEvents.json')
    let data = JSON.parse(allEvents)
    let events = data.filter(event => event.event_name.includes(keyword))
    for (obj in events) events[obj].start_date = moment(events[obj].start_date).format('MM-DD-YYYY')
    return events
}


exports.results = async function (req, res) {
    let team = fs.readFileSync('app/apiData/teams/allTeamsResults.json')
    let teams = JSON.parse(team)
    // for (obj in teams) console.log(teams[obj][0].team_key)
    let data = teams.filter(element => element[0].team_key == req.params.results)
    data = data[0]
    if (data == undefined) data = []
    console.log(data.length)
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
    let x;
    if (data.length > 2) x = data.length - 2
    else x = 0
    for (let i = x; i < data.length; i++) {
        console.log(data[i])
        average += data[i]['opr']
    }
    average /= 2;
    average = Math.round(average * 10000.0) / 10000.0
    let percentage = Math.round(((wins + (ties * .5)) / (wins + ties + losses)) * 10000.0) / 10000.0
    console.log(data)
    if (data.length > 0) {
        let team_name;
        if (data[0]['team']['team_name_short'] != null) team_name = data[0]['team']['team_name_short']
        else team_name = data[0]['team']['team_name_long']
        name.push([data[0]['team']['team_key'], "(" + data[0]['team']['team_key'] + ") " + team_name + " " + data[0]['team']["city"] + ", " + data[0]['team']["state_prov"]])
        results.push([data[0]['team']['team_key'], team_name, data[0]['team']["city"] + ", " + data[0]['team']["state_prov"], data[0]['team']['league_key'], average, percentage])
        console.log(name[0][0])
    } else {
        results = [["", "", "", "", "", ""]];
        name.push([req.params.results, ""])
        data = [""]
    }
    console.log(name[0][0])
    return res.render('api/simalAdd',
        {
            length: 0,
            test: [[]],
            results: results,
            data: data,
            name: name,
        })
}

// api.getTeamRankings("8696").then((parameter) => {
//     console.log(parameter)
// })
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
//Change this to update both OPR and WIN Loss in the same router call... should save lots of time and wont throw as many errors
exports.updateOPR = function (res) {
    db.get(["team_number"], "team", null, null, null, "opr", async function (err, results) {
        if (err) console.log("error")
        console.log("EEE")
        let events = fs.readFileSync('app/apiData/events/allEvents.json')
        events = JSON.parse(events)
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

exports.add = async function (req, res) {
    let results1 = [];
    let id = req.params.value
    if (id != null && id != undefined) {
        let data = fs.readFileSync('app/apiData/teams/allTeamsDetails.json')
        data = JSON.parse(data)
        data = data.find(element => element[0].team_key == id)
        results1 = ["", "", "", "", id];
        if (data != undefined) {
            data = data[0]
            results1[0] = (data['team_name_short']);
            results1[1] = (data["team_name_long"])
            results1[2] = (data["city"] + ", " + data["state_prov"])
            if (data["league_key"] != null) results1[3] = (data["league_key"])
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
    let results = fs.readFileSync('app/apiData/teams/allTeamsMatches.json')
    results = JSON.parse(results)
    results = results.find(element => element[0].team_key == req.params.key)
    res.send(results)
}

exports.teamEvents = async function (req, res) {
    let event = fs.readFileSync('app/apiData/teams/allTeamsEvents.json')
    let allEvents = fs.readFileSync('app/apiData/events/allEventsInfo.json')
    let data1 = JSON.parse(allEvents)
    let data = JSON.parse(event)
    data = data.find(element => element.team_key == req.params.eventKey)
    console.log(data1[0][0].event_key)
    let events = []
    for (obj in data) events.push(data1.find(element => element[0].event_key == data[obj].event_key))
    for (obj in events) events[obj][0]['start_date'] = moment(events[obj][0]['start_date']).format('MM-DD-YYYY')
    // events = events.sort((a,b) => b['startDate'] - a['startDate'])
    res.render('api/teamEventSelect.ejs', {
        events: events
    })
}

module.exports.call = call;