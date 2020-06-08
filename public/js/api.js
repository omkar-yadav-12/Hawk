const fetchData = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-TOA-KEY': 'afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8',
        'X-Application-Origin': 'hawk'
    }
}
function sort(teams, data) {
    for (let i = 0; i < data.length; i++) {
        //console.log(teams.find(element => element['event_key'] == teams['event_key'])['start_date'])
        let event = teams.find(element => element['event_key'] == data[i]['event_key'])
        if (event == undefined) data[i]['date'] = 0
        else data[i]['date'] = event['start_date']
    }
    data = data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    return data
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
    while (true) {
        let response = await fetch("https://theorangealliance.org/api/" + link, fetchData)
        if (response.status == 429) {
            await delay(3600)
            continue;
        }
        let data = await response.json();
        return data
    }
}

export {sort, delay, call}