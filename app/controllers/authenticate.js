const LocalStrategy = require("passport-local").Strategy
const db = require('../db')
const bcrypt = require('bcrypt')
function intialize(passport) {
    let authenticateUser =async (email, password, done) => {
        // let user = getUserByEmail(email)
        db.get(null, "user", ["email"], [JSON.stringify(email)], null, null, function(err, user) {
            check(password, user)
        })
        let check = async(password, user) => {
            if (user.length === 0) {
                return done(null, false, { message: 'No user with this email' })
            }
                if (await bcrypt.compare(password, user[0].password)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Password incorrect' })
                }
            
        }
        
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => {
        console.log("Serialize")
        done(null, user[0].email)
    })
    passport.deserializeUser((id, done) => {
        console.log("DeSerialize")
        db.get(null, "user" , ["email"], [JSON.stringify(id)], null, null, function(err, results) {
            return done(null, results[0])
        })
        
    })
}



// db.get(null, "user", null, null, null, null, function(err, results) {
//     for (var obj in results) {
//         db.update("user", [""])
//     }
// })


module.exports = intialize