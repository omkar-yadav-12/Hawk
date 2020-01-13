
// var express = require('express');
// var router = express.Router();
// const db = require('../db');
// const user = require('./controllers/users');
// const moment = require('moment');
// const fs = require('fs');
// const Json2csvParser = require('json2csv').Parser;
// const calendarController = require('./controllers/calendar');
// const score = require('./controllers/score');
// const http = require('http');
// const https = require('https');
// const simal = require('./controllers/simulation');
// const fetch = require('node-fetch')



// router.get('/api/:key/1920/matches', (req, res) => {

//     fetch('http://theorangealliance.org/api/team/' + req.params.key + '/matches/1920', {
//       method: 'get',
//       headers,
//     })
//       .then(res => res.json())
//       .then(match => {
//         res.send(match)
//       });
//   });
  
//   router.get('/api/:key/1920/events', (req, res) => {
  
//     fetch('http://theorangealliance.org/api/team/' + req.params.key + '/events/1920', {
//       method: 'get',
//       headers,
//     })
//       .then(res => res.json())
//       .then(match => {
//         res.send(match)
//       });
//   });
//   router.get('/teamApi', (req, res) => {
  
//     res.render('api/teamApi', {
//       teams: [],
//       name: ""
//     })
  
//   });
//   router.get('/teamApi/:search', (req, res) => {
//     fetch('http://theorangealliance.org/api/team/', {
//       method: 'get',
//       headers,
//     })
//       .then(res => res.json())
//       .then(team => {
//         let teams = [];
  
//         for (obj in team) if (team[obj].team_key.includes(req.params.search)) teams.push(team[obj])
//         for (let i = 0; i < teams.length; i++) if (teams[i].team_name_short === null) teams[i].team_name_short = teams[i].team_name_long
//         console.log(teams[0].team_key)
//         res.render('api/teamApi', {
//           teams: teams,
//           name: req.params.search
//         })
  
//       });
//   })
  
//   router.get('/apiData', (req, res) => {
//     return res.render('api/apiData')
//   });