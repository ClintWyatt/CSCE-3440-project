var mysql = require('mysql');
const path = require('path');
const fs = require('fs');

//get MySQL password from file
MySQL_password = fs.readFileSync(path.join(__dirname, 'MySQL-password.txt'), 'utf-8');

//set the user name and password to what is on your machine if it is not the string for user or password
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: MySQL_password
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected to mysql database');
	connection.query('CREATE DATABASE userInfo', function(err, result) {
		if (err) throw err;
		console.log('Database created');
	});
});
