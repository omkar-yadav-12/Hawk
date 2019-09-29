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

module.exports = connection;