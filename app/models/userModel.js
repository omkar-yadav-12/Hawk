
const express = require('express');
const router = express.Router();
const db = require('/Users/omkaryadav/Documents/GitHub/Hawk/db.js');
exports.userList = function () {
    db.query("SELECT * FROM `Hawk`.`user`", function(err, results) {
        if (err) throw err;
        else {
            return(results);
        }
    });
}



