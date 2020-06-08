const fs = require('fs');
const api = require('./controllers/api')

async function updateAllEvents() {
    let events = await api.call('event?region_key=IA&season_key=1920')
    console.log(events)
    fs.writeFile("app/apiData/events/allEvents.json", JSON.stringify(events), (err) => {
        if (err) console.error(err)
    })
}

async function updateEvents(link, path) {
    console.log("app/apiData/events/" + path + ".json")
    let allEvents = fs.readFileSync('app/apiData/events/allEvents.json')
    let data = JSON.parse(allEvents)
    let array = []
    for (let i = 0; i < data.length; i++) {
        array.push(await api.call('event/' + data[i].event_key + link))
    }
    fs.writeFile("app/apiData/events/" + path + ".json", JSON.stringify(array), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function updateAllTeams() {
    let teams = await api.call('team?region_key=IA&last_active=1920')
    fs.writeFile("app/apiData/teams/allTeams.json", JSON.stringify(teams), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function updateTeams(query, path) {
    let allTeams = fs.readFileSync('app/apiData/teams/allTeams.json')
    let data = JSON.parse(allTeams)
    let array = []
    for (let i = 0; i < data.length; i++) {
        array.push(await api.call('team/' + data[i].team_key + '/' + query + '/1920'))
    }
    fs.writeFile("app/apiData/teams/" + path + ".json", JSON.stringify(array), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function updateTeamsMatches() {
    let allTeams = fs.readFileSync('app/apiData/teams/allTeams.json')
    let data = JSON.parse(allTeams)
    let array = []
    for (let i = 0; i < data.length; i++) {
        array.push(await api.call('team/' + data[i].team_key))
    }
    fs.writeFile("app/apiData/teams/allTeamsMatchDetails.json", JSON.stringify(array), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

// async function updateAllTeamsMatches() {
//     let allTeams = fs.readFileSync('app/apiData/teams/allTeams.json')
//     let data = JSON.parse(allTeams)
//     let array = []
//     for (let i = 0; i < data.length; i++) {
//         array.push(await api.call('team/' + data[i].team_key + '/matches/1920'))
//     }
//     fs.writeFile("app/apiData/teams/allTeamsMatches.json", JSON.stringify(array), (err) => {
//         if (err) console.error(err)
//         else console.log("COMPLETE")
//     })
// }

// async function updateAllTeamsEvents() {
//     let allTeams = fs.readFileSync('app/apiData/teams/allTeams.json')
//     let data = JSON.parse(allTeams)
//     let array = []
//     for (let i = 0; i < data.length; i++) {
//         array.push(await api.call('team/' + data[i].team_key + '/events/1920'))
//     }
//     fs.writeFile("app/apiData/teams/allTeamsEvents.json", JSON.stringify(array), (err) => {
//         if (err) console.error(err)
//         else console.log("COMPLETE")
//     })
// }

