const express = require('express');
const router = express.Router();
const moment = require('moment')
const LocalStrategy = require("passport-local").Strategy
const db = require('../db')
const bcrypt = require('bcrypt')
const passport = require('passport')


exports.register = async function (req, res) {
    try {
        let hash = await bcrypt.hash(req.body.password, 10)
        let array = [["first_name", "last_name", "grade", "email", "team", "password",  "create_time"], [req.body.first_name, req.body.last_name, req.body.grade, req.body.email, req.body.team, hash]]
        db.insert("user", array[0], array[1], true, function (err, results) {
            if (err) console.log("error");
            return res.redirect('/login');
        })
    } catch {
        res.redirect('/register')
    }
}




//module.exports = intitalize