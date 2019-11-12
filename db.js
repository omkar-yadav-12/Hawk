const express = require('express');
const router = express.Router();
const moment = require('moment');
//var now = moment().format('LL');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Hawk'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to Database!');
});

exports.register = function (f, l, g, e, t, p) {
  connection.query("INSERT INTO hawk.user (first_name, last_name, grade, email, team, password, create_time) VALUES ('" + f + "','" + l + "','" + g + "','" + e + "','" + t + "','" + p + "', NOW());");
}

module.exports = connection;