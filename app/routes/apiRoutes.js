var express = require('express');
var router = express.Router();
const db = require('../db');
const year = 1920
const apis = require('../controllers/api')
const { API } = require('@the-orange-alliance/api');
const api = new API("afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8", "hawk");
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
router.get('/api/:team', async(req, res) => {
    res.send(await api.getTeamEvents(req.params.team, year))
});

router.get('/api/event/:event_name/matches',checkAuthenticated, async(req, res) => {
    res.render('api/matchApi.ejs', {array: await api.getEventMatches(req.params.event_name)})
});
router.get('/api/event/:event_name/rankings',checkAuthenticated, async(req, res) => {
    res.render('api/eventRankings.ejs', {json: await api.getEventRankings(req.params.event_name)})
});

router.get('/teamApi/:search', checkAuthenticated, (req, res) => {
    api.getTeams().then((teams) => {
        res.render('api/teamApi', {
            teams: apis.search(teams, req.params.search),
            name: req.params.search
        })
    })


});
router.get('/gettt',checkAuthenticated, (req, res) => {
    return res.render('api/tournamentApi.ejs', {
        keyword: '',
        array: []
    });
});
router.get('/api/event/:event_name/:match_key',checkAuthenticated, async (req, res) => {
    let json = await apis.call("match/" + req.params.match_key + "/details")
    res.render('api/matchView', {
        data: apis.match(json[0])
    })
})


router.get('/api/team/search/:results',checkAuthenticated, (req, res) => {
    apis.results(req, res)
});
router.get("/update", checkAuthenticated, function (req, res) {
    apis.updateOPR(res)
})
router.get('/apiData',checkAuthenticated, (req, res) => {
    return res.render('api/apiData')
});
router.get('/simalAdd',checkAuthenticated, (req, res) => {
    return res.render('api/simalAdd.ejs', {
        length: 0,
        test: [[]],
        data: [""],
        name: [["", ""]],
        results: [["", "", "", "", "", "", ""]]
    })
});
router.get('/api/team/search',checkAuthenticated, (req, res) => {
    apis.teamSearch(res)
})
router.get('/other',checkAuthenticated, (req, res) => {
    return res.render('api/otherSimal')
});
router.get('/api/event/:keyword',checkAuthenticated, (req, res) => {
    api.getEvents().then((events) => {
        res.render('api/tournamentApi.ejs', {
            array: apis.keyword(events, req.params.keyword),
            keyword: req.params.keyword
        })
    })
});
router.get('/api/:key/1920/matches',checkAuthenticated, (req, res) => {
    apis.teamMatches(req, res)
});
router.get('/api/:key/1920/events', checkAuthenticated,(req, res) => {
    apis.teamEvents(req, res)
});
router.get('/teamApi',checkAuthenticated, (req, res) => {
    res.render('api/teamApi', {
        teams: [],
        name: ""
    })

});
router.get('teamEvent/:eventKey', (req, res) => {
    res.render('/api/event/' + req.params.eventKey)
})

router.get('/team/add/:value',checkAuthenticated, (req, res) => {
    apis.add(req, res)
})
// router.get("/updateOPR", checkAuthenticated, function (req, res) {
//     apis.updateOPR(res)
// });

// router.get("/updateWLT", checkAuthenticated, function (req, res) {
//     apis.updateWLT(res)
// })





module.exports = router
