var express = require('express');
var router = express.Router();
const moment = require('moment')
const db = require('../db');
const score = require('../controllers/score')

global.validate;
global.validate = true;

function check(value) {
    if (value == undefined) return 0
    if (value == 'on') return (1)
    else return (0);
}

function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }

router.post('/dataEdit/update/:dataId', checkAuthenticated, (req, res) => {
    db.query("UPDATE hawk.score_data SET team1_name = '" + req.body.team_one + "', team2_name = '" + req.body.team_two + "', event_name = '" + req.body.event_name + "', match_num = '" + req.body.match + "', field_num = '" + req.body.field + "', skystone1 = '" + check(req.body.skystone1) + "', skystone2 = '" + check(req.body.skystone2) + "', skystone3 = '" + check(req.body.skystone3) + "', skystone4 = '" + check(req.body.skystone4) + "', skystone5 = '" + check(req.body.skystone5) + "', skystone6 = '" + check(req.body.skystone6) + "', stone1 = '" + check(req.body.stone1) + "', stone2 = '" + check(req.body.stone2) + "', stone3 = '" + check(req.body.stone3) + "', stone4 = '" + check(req.body.stone4) + "', stone5 = '" + check(req.body.stone5) + "', stone6 = '" + check(req.body.stone6) + "', none1 = '" + check(req.body.none1) + "', none2 = '" + check(req.body.none2) + "', none3 = '" + check(req.body.none3) + "', none4 = '" + check(req.body.none4) + "', none5 = '" + check(req.body.none5) + "', none6 = '" + check(req.body.none6) + "', frs = '" + check(req.body.FRS) + "', fr = '" + check(req.body.FS) + "' , r1n = " + check(req.body.R1N) + " , r2n = " + check(req.body.R2N) + ", returned_auto = '" + req.body.ReturnedAuto + "', placed_auto = '" + req.body.PlacedAuto + "', delivered = '" + req.body.delivered_number + "', tallest_sky = '" + req.body.tallest_skyscraper + "', returned_drs = '" + req.body.returned_name + "', placed_drs = '" + req.body.placed + "', found_moved = '" + check(req.body.found) + "', cap1 = '" + check(req.body.Capstone1) + "', cap2 = '" + check(req.body.Capstone2) + "', parked1 = '" + check(req.body.Parked1) + "', parked2 = '" + check(req.body.Parked2) + "', r1n = '" + req.body.robot1_level + "', r2n = '" + req.body.robot2_level + "', minor = '" + req.body.minor + "', major = '" + req.body.major + "', team1_0 = '" + check(req.body.team1_0) + "', team1_1 = '" + check(req.body.team1_1) + "', team1_2 = '" + check(req.body.team1_2) + "', team2_0 = '" + check(req.body.team2_0) + "', team2_1 = '" + check(req.body.team2_1) + "', team2_2 = '" + check(req.body.team2_2) + "'WHERE id = " + req.params.dataId);
    db.query("UPDATE score_data SET r1n = " + check(req.body.R1N) + " , r2n = " + check(req.body.R2N) + " WHERE id = " + req.params.dataId)
    return res.redirect('/scoringData')
});

router.post('/score=?', checkAuthenticated, (req, res) => {
    score.scoreSend(req, res)
});

router.get('/dataEdit/delete/:dataId', checkAuthenticated, (req, res) => {
    score.delete(req.params.dataId, res)
});

router.get('/dataView/:dataId', checkAuthenticated, (req, res) => {
    score.dataView(req.params.dataId, res)
});

router.get('/Test/:dataId', checkAuthenticated, (req, res) => {
    score.test(req.params.dataId, res)
});

router.get('/dataEdit/:dataId', checkAuthenticated, (req, res) => {
    score.dataEdit(req.params.dataId, res)
});

router.get('/score', checkAuthenticated, (req, res) => {
    return res.render('score.ejs', {
    });
});


router.get('/scoreBlue', checkAuthenticated, (req, res) => {
    score.score(req, res, true)
});

router.get('/scoreRed', checkAuthenticated, (req, res) => {
    score.score(req, res, false)
});


router.get('/scoringData', checkAuthenticated, (req, res) => {
    score.scoringData(res)
  });

module.exports = router