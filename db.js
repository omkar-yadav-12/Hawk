const express = require('express');
const router = express.Router();
const moment = require('moment');

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

exports.users = function () {
  return(connection.query("SELECT username FROM `Hawk`.`user`;"));
}

exports.register = function(grade) {
  connection.query("INSERT INTO hawk.new_table (idnew_table) VALUES ("+grade+")");
}


//console.log(connection.query("SELECT * FROM Hawk.user LIMIT 0, 1000"));

