var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');
const { connect } = require('http2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Samus2647!',
    database: 'mydb'
});

var app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//the app function below directs the user to the login.html when
//the user goes to the port number for the site
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/login.html'));
});

//the app method below will validate the user login credientals
app.post('/auth', function(request, response) {
	var userName = request.body.username;
	var password = request.body.password;
	//console.log(userName);
	//console.log(password);
	if (userName && password) {
		
		connection.query('SELECT * FROM login WHERE userName = ? AND password = ?', [userName, password], function(error, results, fields) {
			console.log(results.length);
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = userName;
				//need to do something here.....
			} else {
				response.send('Incorrect Username and/or Password!');
				//response.sendFile(path.join(__dirname + '/login.html'));
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//happens whenever you are logged into the home page
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);//listening on port 3000