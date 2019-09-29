'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
let mysql = require('mysql');
const db = require('./db');
var now = moment();
const app = express();

function register() {
console.log("Done");
 alert("Return back to login and enter your username and password");
};


router.get('/', (req, res) => {
  
  return res.render('register.ejs', {
    title: `Register « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});

module.exports = router;
