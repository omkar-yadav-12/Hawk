const express = require('express');
const router = express.Router();
const moment = require('moment')
const startWeek = moment().startOf('month').week();
const endWeek = moment().endOf('month').week();


let calendar = []
for(var week = startWeek; week<endWeek;week++){
  calendar.push({
    week:week,
    days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
  })
}
console.log(calendar);