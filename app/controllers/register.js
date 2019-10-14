'use strict';
const moment = require('moment');
exports.register = function(req,res){
    var today = moment();
    var user={
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "email":req.body.email,
      "password":req.body.password,
      "created":today,
      "grade":req.body.grade,
      "team": req.body.team
    }
    connection.query('INSERT INTO user SET ?',user, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
    });
  }