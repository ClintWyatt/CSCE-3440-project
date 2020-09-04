var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

var app = express();
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser());

//get MySQL password from file
var MySQL_password = fs.readFileSync(path.join(__dirname, 'MySQL-password.txt'), 'utf-8');

//set up MySQL connection variable
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: MySQL_password,
    database: 'userInfo'
});

/*post requests */

//the app method below will validate the user login credientals. Post request from login form
app.post('/login', function(request, response) {
	//creating the table if it does not exist
	var sql =
		'CREATE TABLE if not exists login(first_name varchar(30), last_name varchar(30), username varchar(30) not null, password varchar(30))';
	connection.query(sql, function(err, result) {
		if (err) {
			throw err;
		}
	});

	if (request.body.username && request.body.password) {
		connection.query(
			'SELECT * FROM login WHERE userName = ? AND password = ?',
			[ request.body.username, request.body.password ],
			function(error, results, fields) {
				if (results.length > 0 && !(request.body.username.toLowerCase() == 'antivaxer')) {
					response.cookie('username', request.body.username);
					return response.sendFile(path.join(__dirname, 'views', 'homepage.html')); //must return for this method to work. Will redirect to the simulator.html
				} else {
					response.redirect('/');
				}
			}
		);
	}
	else{response.redirect('/');}
});

//Inserting a virus into the database
app.post('/virusData', function(request, response) {
	var diseaseName = request.body.disease;
	var infectionRate = request.body.infRate;
	var deathRate = request.body.deathRate;
	var threshold = request.body.threshold;
	var weeks = request.body.numWeeks;

	//checking to see if the virus is already in the database
	connection.query('SELECT * FROM virus WHERE virusName = ? AND userName = ?', [ diseaseName, getUsernameFromRequest(request) ], function(
		error,
		results,
		fields
	) {
		//if the virus is already in the data base, do not insert the virus info
		console.log(results.length);
		if (results.length > 0) {
			console.log('ERROR: virus already exist in the database. ');
		} else {
			//virus does not exist in the database yet
			var sql =
				"INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username, weeks) VALUES('" +
				diseaseName +
				"','" +
				infectionRate +
				"','" +
				deathRate +
				"', '" +
				threshold +
				"', '" +
				getUsernameFromRequest(request) +
				"', '" +
				weeks +
				"')";
			connection.query(sql, function(err, result) {
				if (err) {
					throw err;
				} else {
					console.log('virus saved');
				}
			});
		}
	});
});

//post request method is used for registering a new user. Post request from registration form
app.post('/register', function(request, response) {
	var username = request.body.username;
	var passWord = request.body.password;
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;
	
	if ((username && passWord) && (firstname && lastname)) {
		//creating the table for loging in if it does not exist
		var sql =
			'CREATE TABLE if not exists login(first_name varchar(30), last_name varchar(30), username varchar(30) not null, password varchar(30), PRIMARY KEY (username))';
		connection.query(sql, function(err, result) {
			if (err) {
				throw err;
			}
		});
		sql =
			'CREATE TABLE if not exists virus(virusName varchar(50) not null, infectionRate int, deathRate int,' +
			'threshold int, weeks int, username varchar(30), FOREIGN KEY (username) REFERENCES login(username))';//creating a table that represents the viruses for a user
		connection.query(sql, function(err, result) {
			if (err) {
				throw err;
			}
		});

		//store premade diseases if not stored already. May need to create a special virus table for the 3 special viruses in the future.
		//this code will run only once whenever the user registers an account for the first time
		connection.query('SELECT * FROM virus WHERE username = "antivaxer"', [], function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length == 0) { //empty results
					connection.query('INSERT INTO login (first_name, last_name, userName, password) VALUES("N/A", "N/A", "antivaxer", "N/A")'); //create antivaxer user
					connection.query('INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username, weeks) VALUES("Covid-19", 30, 10, 2, "antivaxer", 52)');
					connection.query('INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username, weeks) VALUES("Ebola", 50, 20, 2, "antivaxer", 52)');
					connection.query('INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username, weeks) VALUES("Bubonic Plague", 65, 45, 2, "antivaxer", 52)');
				}
			}
		});

		//checking to see if the username is already in the database
		connection.query('SELECT * FROM login WHERE userName = ?', [ username ], function(error, results, fields) {
			
			if (results.length > 0) {//case the username is in the database
				console.log('ERROR: username already exists!');
				response.redirect('/');//send user to the login page
			} else {//create new user
				var sql =
					"INSERT INTO login (first_name, last_name, userName, password) VALUES('" +
					firstname +
					"', '" +
					lastname +
					"','" +
					username +
					"', '" +
					passWord +
					"')";
				connection.query(sql, function(err, result) {
					if (err) {
						throw err;
					}
					response.cookie('username', username);
					return response.sendFile(path.join(__dirname, 'views', 'homepage.html')); //Redirects the user to homepage.html
				});
			}
		});
	} else {response.redirect('/Register');}//send user back to the registration page
});

/*post requests end */

/* routing to other pages */
app.get('/homepage', function(request, response) {
	return response.sendFile(path.join(__dirname, 'views', 'homepage.html')); //must return for this method to work. Will redirect to the simulator.html
});

//directs the user to the login page when they enter the url "localhost:3000"
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, 'views', '/login.html'));
});

app.get('/Simulation', function(request, response) {
	return response.sendFile(path.join(__dirname, 'views', 'simulator.html')); //going to the simulation page
});

app.get('/Register', function(request, response) {
	return response.sendFile(path.join(__dirname, 'views', 'register.html')); //must return for this method to work. Will redirect to the simulator.html
});

app.get('/BackToLogin', function(request, response) {
	return response.sendFile(path.join(__dirname, 'views', 'login.html')); //must return for this method to work. Will redirect to the simulator.html
});

app.get('/About', function(request, response) {
	return response.sendFile(path.join(__dirname, 'views', 'about.html')); //must return for this method to work. Will redirect to the simulator.html
});

app.get('/Logout', function(request, response) {
	response.clearCookie('username');
	response.redirect('/BackToLogin');
})

/*routing to pages end */

/*get requests */
//used to get ALL of the user's viruses from the database
app.get('/virusData', function(request, response) {
	connection.query('SELECT * FROM virus WHERE username = ? OR username = "antivaxer"', [ getUsernameFromRequest(request) ], function(
		error,
		results
	) {
		response.send(results); //sending back all the viruses to the simulation page
	});
});

//used to get ONE of the user's viruses from the database
app.get('/virusData/:virusName', function(request, response) {
	connection.query('SELECT * FROM virus WHERE (username = ? OR username = "antivaxer") AND virusName = ?', [ getUsernameFromRequest(request), request.params.virusName ], function(
		error,
		results
	) {
		response.send(results); //sending back all the viruses to the simulation page
	});
});

app.get('/scripts/outbreak/outbreak.js', function(request, response) {
	console.log(request.params);
});

/*get requests end */

//returns the value of the username cookie
function getUsernameFromRequest(request) {
	return request.cookies[Object.keys(request.cookies)[0]];
}

app.listen(3000); //listening on port 3000
console.log('Server running on port 3000!');
