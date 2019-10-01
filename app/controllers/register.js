'use strict';
const express = require('express');
const router = express.Router();
const db = require("./db");

function register() {
  var firstName = document.getElementById("first_name");
  alert("Return back to login page and enter your username and password.");
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
