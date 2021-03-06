var express = require('express');
var router = express.Router();
const db = require('../db');
const simul = require('../controllers/simulation');
const fetch = require('node-fetch')
const headers = {
    'Content-Type': 'application/json',
    'X-TOA-KEY': 'afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8',
    'X-Application-Origin': 'hawk',
}
const { API } = require('@the-orange-alliance/api');
const api = new API("afeb37ef9fbd75eb154868d60b312be1ba893163518a2607937d3f64a88dedf8", "hawk");
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
router.post('/simulation=?', checkAuthenticated, (req, res) => {
    simul.opr(req, res)
});
router.get('/simSel', checkAuthenticated, (req, res) => {
    db.get(null, "team", null, null, null, "team_number", function (err, results) {
        return res.render('simulation/simulSelect.ejs', {
            results: results,
        });
    })
});



router.get('/testCreation', checkAuthenticated, (req, res) => {
    return res.render('simulation/createTourney')
})
router.get('/eventSimulation/:event_name', (req, res) => {
    simul.tourneyConfigure(req, res)
})

router.get('/simulation', checkAuthenticated, (req, res) => {
    return res.redirect('simSel');
});
router.get('/simSel', checkAuthenticated, (req, res) => {
    db.get(null, "team", null, null, null, "team_number", function (err, results) {
        return res.render('simulation/simulSelect.ejs', {
            results: results,
        });
    })

});
router.post('/configure=?', checkAuthenticated, (req, res) => {
    simul.configure(req, res)
})


module.exports = router;