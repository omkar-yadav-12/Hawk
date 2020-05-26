var express = require('express');
var router = express.Router();
const moment = require('moment')
const db = require('../db');
const scout = require('../controllers/scout')
global.ID;
global.ID = "omyad21@icstudents.org";
global.validate;
global.validate = true;

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

router.get('/scouttt', (req, res) => {
    return res.render('scout/scout.ejs', {
        alert: " "
    });
});

router.post('/scout=?', checkAuthenticated, (req, res) => {
    scout.insert(req, res)
});

router.get('/scoutEdit/delete/:dataId', checkAuthenticated, (req, res) => {
    db.delete("scout_data", ["id"], [req.params.dataId], null, function (err, results) {
        if (err) console.log("ERROR");
        else return res.redirect('/scoutingData')
    })
});


router.get('/scoutView/:dataId', checkAuthenticated, (req, res) => {
    db.get(null, "scout_data", ["id"], [req.params.dataId], null, null, function (err, results) {
        return res.render('scout/scoutttView.ejs', {
            results: scout.scoutView(results),
        });
    })
});

router.post('/scoutttEdit/update/:dataId', checkAuthenticated, (req, res) => {
    //db.query("UPDATE hawk.scout_data SET team_number = '" + req.body.team_num + "', move_auto = '" + req.body.MF + "', sense_auto = '" + req.body.SS + "', over_auto = '" + req.body.PDZ + "', collect_auto = '" + req.body.CS + "', place_auto = '" + req.body.FS + "', found_auto_d = '" + req.body.expand1 + "', sense_auto_d = '" + req.body.expand2 + "', add_auto_d = '" + req.body.expand3 + "', found_teleop = '" + req.body.expand4 + "', collect_teleop = '" + req.body.add_auto + "', palce_teleop = '" + req.body.MF_ + "', found_teleop_d = '" + req.body.CS_ + "', stone_teleop_d = '" + req.body.FS_ + "', add_teleop_d = '" + req.body.expand_1 + "', found_end = '" + req.body.expand_2 + "', in_end = '" + req.body.additional_teleop + "', over_end = '" + req.body.MF_EG + "', place_end = '" + req.body.SS_EG + "', found_end_d = '" + req.body.PDZ_EG + "', parki_end_d = '" + req.body.FS_EG + "', stones_end_d = '" + req.body.expand__1 + "', add_end_d = '" + req.body.expand__2 + "', fr = '" + req.body.expand__3 + "', r1n = '" + req.body.additional_end + "', r2n = '" + req.body.R2N + "', returned_auto = '" + req.body.ReturnedAuto + "', placed_auto = '" + req.body.PlacedAuto + "', delivered = '" + req.body.delivered_number + "', tallest_sky = '" + req.body.tallest_skyscraper + "', returned_drs = '" + req.body.returned_name + "', placed_drs = '" + req.body.placed + "', found_moved = '" + req.body.found + "', cap1 = '" + req.body.Capstone1 + "', cap2 = '" + req.body.Capstone2 + "', parked1 = '" + req.body.Parked1 + "', parked2 = '" + req.body.Parked2 + "', r1n = '" + req.body.robot1_level + "', r2n = '" + req.body.robot2_level + "', minor = '" + req.body.minor + "', major = '" + req.body.major + "', team1_0 = '" + req.body.team1_0 + "', team1_1 = '" + req.body.team1_1 + "', team1_2 = '" + req.body.team1_2 + "', team2_0 = '" + req.body.team2_0 + "', team2_1 = '" + req.body.team2_1 + "', team2_2 = '" + req.body.team2_2 + "'WHERE id = " + req.params.dataId);
    return res.redirect('/scoutingData')
});

router.get('/scoutEdit/:dataId', checkAuthenticated, (req, res) => {
    scout.scoutEdit(res, req.params.dataId)
});

router.get('/scoutingData', checkAuthenticated, (req, res) => {
    scout.scoutingData(res)
})
router.get('/scout', checkAuthenticated, (req, res) => {
    scout.scout(global.validate, res)
});

router.get('/add/:num', checkAuthenticated, (req, res) => {
    scout.add(res, req.params.num)
})

router.post('/create=?', checkAuthenticated, (req, res) => {
    return res.redirect('/add/' + req.body.game_num)
})

module.exports = router