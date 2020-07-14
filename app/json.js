const fs = require('fs');
const api = require('./controllers/api')

async function updateAllEvents() {
    let events = await api.call('event?region_key=IA&season_key=1920')
    console.log(events)
    fs.writeFile("app/data/events/allEvents.json", JSON.stringify(events), (err) => {
        if (err) console.error(err)
    })
}

async function updateEvents(link, path) {
    console.log("app/data/events/" + path + ".json")
    let allEvents = fs.readFileSync('app/data/events/allEvents.json')
    let data = JSON.parse(allEvents)
    let array = []
    for (let i = 0; i < data.length; i++) {
        array.push(await api.call('event/' + data[i].event_key + link))
    }
    fs.writeFile("app/data/events/" + path + ".json", JSON.stringify(array), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function updateAllTeams() {
    let teams = await api.call('team?region_key=IA&last_active=1920')
    fs.writeFile("app/data/teams/allTeams.json", JSON.stringify(teams), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function updateTeams(query, path) {
    let allTeams = fs.readFileSync('app/data/teams/allTeams.json')
    let data = JSON.parse(allTeams)
    let array = []
    for (let i = 0; i < data.length; i++) {
        array.push(await api.call('team/' + data[i].team_key + '/' + query + '/1920'))
    }
    fs.writeFile("app/data/teams/" + path + ".json", JSON.stringify(array), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function teamResults() {
    let allTeams = fs.readFileSync('app/data/teams/allTeamsResults.json')
    let data = JSON.parse(allTeams)
    let array = []
    console.log(data[1][0])
    for (let i = 0; i < data.length; i++) {
        array.push(await api.call('team/' + data[i] + '/results/1920'))
    }
    fs.writeFile("app/data/teams/allTeamsResults.json", JSON.stringify(array), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function updateTeamsMatches() {
    let allTeams = fs.readFileSync('app/data/teams/allTeams.json')
    let data = JSON.parse(allTeams)
    let array = []
    for (let i = 0; i < data.length; i++) {
        array.push(await api.call('team/' + data[i].team_key))
    }
    fs.writeFile("app/data/teams/allTeamsMatchDetails.json", JSON.stringify(array), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}

async function updateMatches() {
    let matches = []
    let iowaMatches = []
    for (let i = 0; i < 17000; i += 500) {
        matches.push(await api.call('match/all/1920?start=' + i))
    }
    for (let i = 0; i < matches.length; i++) {
        for (obj in matches[i]) {
            if (matches[i][obj].event_key.indexOf('IA') != -1) {
                iowaMatches.push(matches[i][obj])
            }
        }
    }
    console.log(iowaMatches.length)
    fs.writeFile("app/data/matches/allMatches.json", JSON.stringify(iowaMatches), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })


}

async function updateMatchesDetails (){
    let allTeams = fs.readFileSync('app/data/matches/allMatches.json')
    let data = JSON.parse(allTeams) 
    let details = []
    for (let i = 0; i < data.length; i++) {
        details.push(await api.call('match/' + data[i].match_key + '/details'))
    }
    fs.writeFile("app/data/matches/allMatchesDetails.json", JSON.stringify(details), (err) => {
        if (err) console.error(err)
        else console.log("COMPLETE")
    })
}



async function updateApiData() {
    await updateAllEvents()
    console.log("allEvents.json COMPLETE")
    await updateEvents('allEventsInfo', '')
    console.log("allEventsInfo.json COMPLETE")
    await updateEvents('allEventsMatches', 'matches')
    await updateEvents('allEventsRankings', 'rankings')
    await updateEvents('allEventsRankings', 'rankings')
    await updateAllTeams()
    await updateTeamsMatches()

}


// async function updateAllTeamsMatches() {
//     let allTeams = fs.readFileSync('app/data/teams/allTeams.json')
//     let data = JSON.parse(allTeams)
//     let array = []
//     for (let i = 0; i < data.length; i++) {
//         array.push(await api.call('team/' + data[i].team_key + '/matches/1920'))
//     }
//     fs.writeFile("app/data/teams/allTeamsMatches.json", JSON.stringify(array), (err) => {
//         if (err) console.error(err)
//         else console.log("COMPLETE")
//     })
// }

// async function updateAllTeamsEvents() {
//     let allTeams = fs.readFileSync('app/data/teams/allTeams.json')
//     let data = JSON.parse(allTeams)
//     let array = []
//     for (let i = 0; i < data.length; i++) {
//         array.push(await api.call('team/' + data[i].team_key + '/events/1920'))
//     }
//     fs.writeFile("app/data/teams/allTeamsEvents.json", JSON.stringify(array), (err) => {
//         if (err) console.error(err)
//         else console.log("COMPLETE")
//     })
// }

