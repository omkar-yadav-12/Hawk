import {sort, call} from './api.js'

window.onload = async function () {
    let event_name = location.pathname.substring(17)
    if (localStorage.getItem(event_name) == null || localStorage.getItem(event_name) == undefined) {
        // Make api calls for all the information about the event and the teams in the event
        let allEvents = await call('event');
        let event = await call('event/' + event_name + '/matches')
        this.console.log(event[0])
        let rankings = await call('event/' + event_name + '/rankings')
        let events = await call('event/' + event_name)
        let teams = await call('event/' + event_name + '/teams')
        console.log(events[0]['start_date'])
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
        //for (obj in event) array.push([event[obj]['red_score'], event[obj]['blue']])
        for (let i = 0; i < teams.length; i++) {
            let data = await call('team/' + teams[i]['team_key'] + '/results/1920')
            // let data = await apis.call('team/' + teams[i]['teamKey'] + '/results/1920')
            teams_array.push(sort(allEvents, data))

        }

        //console.log(teams_array[0])
        for (obj in teams_array) {
            let opr = 0;
            let wins = 0;
            let losses = 0;
            let ties = 0;
            for (let i = teams_array[obj].length - 1; i >= 0; i--) {
                let tourney = await allEvents.find(element => element['event_key'] == teams_array[obj][i]['event_key'])
                if (tourney == undefined || tourney['start_date'] >= events[0]['start_date']) teams_array[obj].splice(i, 1)
            }
            let x = 0;
            let y = teams_array[obj].length
            if (teams_array[obj].length > 2) {
                x = teams_array[obj].length - 2
                y = 2
            }
            // final league tournaments have ten additional matches added on from the past, so account for this in the rankings data here by calculating actual matches that were played 
            for (let i = x; i < teams_array[obj].length; i++) {
                //if (q === 0) console.log(teams_array[obj][i])
                this.console.log(teams_array[obj][i])
                if (teams_array[obj][i]['wins'] + teams_array[obj][i]['losses'] + teams_array[obj][i]['ties'] > 9) {
                    let matches = await call('event/' + teams_array[obj][i]['event_key'] + '/matches')

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
            this.console.log(teams_array[obj][0]['team_key'] + " " + opr + " " + wins + " " + losses + " " + ties)
            team_data.push([teams_array[obj][0]['team_key'], Math.round(opr / y * 100.0) / 100.0, Math.round((wins + .5 * ties) / (wins + losses + ties) * 1000.0) / 1000.0])
        }
        console.log(team_data)
        for (let i = 0; i < event.length; i++) {
            if (event[i]['match_name'].indexOf('Quals') != -1) {
                simulated_matches.push([Math.round((team_data.find(element => element[0] == event[i]['participants'][0]['team_key'])[1] +
                    team_data.find(element => element[0] == event[i]['participants'][1]['team_key'])[1]) * 100.0) / 100.0,
                Math.round((team_data.find(element => element[0] == event[i]['participants'][0]['team_key'])[2] +
                    team_data.find(element => element[0] == event[i]['participants'][1]['team_key'])[2]) * 100.0) / 100.0,
                Math.round((team_data.find(element => element[0] == event[i]['participants'][2]['team_key'])[1] +
                    team_data.find(element => element[0] == event[i]['participants'][3]['team_key'])[1]) * 100.0) / 100.0,
                Math.round((team_data.find(element => element[0] == event[i]['participants'][2]['team_key'])[2] +
                    team_data.find(element => element[0] == event[i]['participants'][3]['team_key'])[2]) * 100.0) / 100.0])
            }
        }
        console.log(simulated_matches[0])
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
        console.log(team_matches[0])
        // count the wins and losses of the simulated tournament
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
        for (obj in rankings) {
            let data = teams.find(element => element['team_key'] == rankings[obj]['team_key'])
            rankings[obj]['wins_'] = data['wins_']
            rankings[obj]['losses_'] = data['losses_']
            rankings[obj]['ties_'] = data['ties_']
        }
        // calculate win percentage
        for (let i = 0; i < team_matches.length; i++) {
            let x = 100 * team_matches[i][0] / (team_matches[i][0] + team_matches[i][1])
            let y = 100 * team_matches[i][1] / (team_matches[i][0] + team_matches[i][1])
            console.log(x + " " + y)
            team_matches[i][0] = Math.round(x * 100.0) / 100.0
            team_matches[i][1] = Math.round(y * 100.0) / 100.0
        }
        // calculate accuracy of the simulation
        let accuracy = 0;
        for (let i = 0; i < team_matches.length; i++) {
            if (team_matches[i][0] > team_matches[i][1] && event[i]['red_score'] > event[i]['blue_score']) accuracy++
            else if (team_matches[i][0] < team_matches[i][1] && event[i]['red_score'] < event[i]['blue_score']) accuracy++
            else continue;
        }
        // final league tournaments have ten additional matches added on from the past, so account for this in the rankings data here by calculating actual matches that were played 
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
        accuracy /= team_matches.length
        accuracy = Math.round(accuracy * 10000.0) / 100.0
        console.log(accuracy)
        let sim = {
            "event": event,
            "sim_matches": simulated_matches,
            "team_matches": team_matches,
            "rankings": rankings,
            "accuracy": accuracy
        }
        // Save the data in local storage
        localStorage.setItem(event_name, JSON.stringify(sim))
        location.reload()
    }

}