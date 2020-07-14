var express = require('express');
var router = express.Router();
const api = require('../controllers/api')
const fs = require('fs')
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
router.get('/api/event/:event_key/matches', checkAuthenticated, async(req, res) => {
    let matches = fs.readFileSync('app/data/events/allEventsMatches.json')
    matches = JSON.parse(matches)
    matches = matches.find(element => element[0].event_key == req.params.event_key)
    res.render('api/matchApi.ejs', {array: matches})
});
router.get('/api/event/:event_key/rankings', checkAuthenticated,async(req, res) => {
    let rankings = fs.readFileSync('app/data/events/allEventsRankings.json')
    rankings = JSON.parse(rankings)
    rankings = rankings.find(element => element[0].event_key == req.params.event_key)
    res.render('api/eventRankings.ejs', {json: rankings})
});

router.get('/teamApi/:search', checkAuthenticated, (req, res) => {
        res.render('api/teamApi', {
            teams: api.search(req.params.search),
            name: req.params.search
    })


});
router.get('/gettt',checkAuthenticated, (req, res) => {
    return res.render('api/tournamentApi.ejs', {
        keyword: '',
        array: []
    });
});
router.get('/api/event/:event_name/:match_key', async (req, res) => {
    let details = fs.readFileSync('app/data/matches/allMatchesDetails.json')
    details = JSON.parse(details)
    let json = details.find(element => element[0].match_key == req.params.match_key)
    res.render('api/matchView', {
        data: api.match(json[0])
    })
})


router.get('/api/team/search/:results', (req, res) => {
    api.results(req, res)
});
router.get("/update", checkAuthenticated, function (req, res) {
    api.updateOPR(res)
})
router.get('/apiData',checkAuthenticated, (req, res) => {
    return res.render('api/apiData')
});
router.get('/simulAdd',checkAuthenticated, (req, res) => {
    return res.render('api/simulAdd.ejs', {
        length: 0,
        test: [[]],
        data: [""],
        name: [["", ""]],
        results: [["", "", "", "", "", "", ""]],
        key: ""
    })
});
router.get('/api/team/search',checkAuthenticated, (req, res) => {
    api.teamSearch(res)
})
router.get('/generate',checkAuthenticated, (req, res) => {
    return res.render('api/othersimul')
});
router.get('/api/event/:keyword',checkAuthenticated, (req, res) => {
        res.render('api/tournamentApi.ejs', {
            array: api.keyword(req.params.keyword),
            keyword: req.params.keyword
        })
});
router.get('/api/:key/1920/matches', (req, res) => {
    api.teamMatches(req, res)
});
router.get('/api/:key/1920/events', checkAuthenticated,(req, res) => {
    api.teamEvents(req, res)
});
router.get('/teamApi',checkAuthenticated, (req, res) => {
    res.render('api/teamApi', {
        teams: [],
        name: ""
    })

});
router.get('teamEvent/:eventKey', checkAuthenticated,(req, res) => {
    res.render('/api/event/' + req.params.eventKey)
})

router.get('/team/add/:value',checkAuthenticated, (req, res) => {
    api.add(req, res)
})
// router.get("/updateOPR", checkAuthenticated, function (req, res) {
//     api.updateOPR(res)
// });

// router.get("/updateWLT", checkAuthenticated, function (req, res) {
//     api.updateWLT(res)
// })





module.exports = router
