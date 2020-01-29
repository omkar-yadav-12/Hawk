const express = require('express');
const router = express.Router();
const moment = require('moment')
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('becrypt')


function initialize(passport, getUserByEmail) {
    const authenticateUer = (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: "No user with that email" })
        }

        try {
            if (await bcrypt.compare(password, userPassword)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password incorrect"})
            }
        } catch (e) {
            return done(e)
        }

    }
    passport.use(new LocalStrategy({usernameField: 'email'}),
    authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((user, done) => { })
}

module.exports = intitalize