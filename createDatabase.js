
var mysql = require('mysql');

//set the user name and password to what is on your machine if it is not the string for user or password
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Samus2647!',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql database");
  connection.query("CREATE DATABASE userInfo", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
