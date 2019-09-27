const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('login.ejs', {
    title: `Log In « ${process.env.APP_NAME}`,
    gtag: process.env.GTAG,
    dev: process.env.DEV === 'true',
    appName: process.env.APP_NAME
  });
});

module.exports = router;
