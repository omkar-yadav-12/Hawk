
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

var arrayToColumns = function(columns, values, ao) {
  let a
  if (ao) a = "AND"
  else a = "OR"
  let arr = ""
  for (let i = 0; i < columns.length; i++) {
    if (i != columns.length - 1) arr += (columns[i] +  " = " + values[i] + " " + a + " ")
    else arr += (columns[i] +  " = " + values[i])
  }
  return arr;
}

var updates = function(columns, values) {
  let arr = ""
  for (let i = 0; i < columns.length; i++) {
      if (i != columns.length - 1) arr += (columns[i] + " = " + values[i] + ",")
      else arr += (columns[i] + " = " + values[i])
  }
  return arr
}

var insertStatement = function(values) {
  let string = ""
  console.log(values[0])
  for (let i = 0; i < values.length; i++) {
    if (values[i] == "NOW()") string += (values[i] + ",")
    else if (i != values.length-1) string += ("'" + values[i] + "',")
    else string += ("'" + values[i] + "'")

  } 
  console.log(string)
  return string
}

var register = function (f, l, g, e, t, p) {
  connection.query("INSERT INTO hawk.user (first_name, last_name, grade, email, team, password, create_time) VALUES ('" + f + "','" + l + "','" + g + "','" + e + "','" + t + "','" + p + "', NOW());");
}
//var result = [];
connection.insert = function (table, columns, values, now, callback) {
  let date = "";
  if (now) date = ",NOW()"
  let array = insertStatement(values)
  console.log("INSERT INTO " + table + " (" + String(columns) + ") VALUES (" + array + date + ")")
  connection.query("INSERT INTO " + table + " (" + String(columns) + ") VALUES (" + array + date + ")", (err, results) => {
    if (err) return (callback(err, null))
    else callback(null, true)
  })
}
connection.get = function (array, table, columns, values, boolean, order, callback) {
  if (array != null && columns != null) {
    let array1 = arrayToColumns(columns, values, boolean)
    let orderString = "";
    if (order != null) orderString = " ORDER BY " + order;
    connection.query("SELECT " + String(array) + " FROM " + table + " WHERE "  + array1 + orderString, (err, results) => {
      console.log(results[0])
      if (err) return(callback(err, null))
      
      else callback(null, results)
  })
  } else if (array!= null && values == null) {
    let orderString = "";
    if (order != null) orderString = " ORDER BY " + order;
    console.log("SELECT " + String(array) + " FROM " + table + orderString)
    connection.query("SELECT " + String(array) + " FROM " + table + orderString, (err, results) => {
      if (err) return(callback(err, null))
      else callback(null, results)
    })
  } else if (columns != null) {
    let array = arrayToColumns(columns, values, boolean)
    let orderString = "";
    if (order != null) orderString = " ORDER BY " + order;
    console.log("SELECT *  FROM " + table + " WHERE "  + array + orderString)
    connection.query("SELECT *  FROM " + table + " WHERE "  + array + orderString, (err, results) => {
      if (err) return(callback(err, null))
      else callback(null, results)
    })
  } else {
    let orderString = "";
    if (order != null) orderString = " ORDER BY " + order;
    console.log("SELECT * from " + table + orderString)
    connection.query("SELECT * from " + table + orderString,  (err, results) => {
      if (err) return(callback(err, null))
      else callback(null, results)
    })
  }
  
}

connection.update = function (table, column1, value1, column2, value2, boolean, callback) {
  let arr = column2 + " = " + value2;
  if (boolean != null) arr = arrayToColumns(column2, value2, boolean)
  let arr1 = updates(column1, value1)
  console.log("UPDATE " + table + " SET " + arr1 + " WHERE " + arr)
  connection.query("UPDATE " + table + " SET " + arr1 + " WHERE " + arr, (err, results) => {
    if (err) return(callback(err, null))
    else callback(null, true)
  })
}
 
connection.delete = function (table, columns, values, boolean, callback) {
    let array = arrayToColumns(columns, values, boolean)
    console.log(array)
    connection.query("DELETE FROM " + table + " WHERE " + array, (err, results) => {
        if (err) return(callback(err, null))
        else callback(null, true)
    })
} 

module.exports = connection;