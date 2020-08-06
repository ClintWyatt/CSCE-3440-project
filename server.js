var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
const fs = require('fs');

var user = ''; //holds the username of the current user
var app = express();
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
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

//the app method below will validate the user login credientals
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
				if (results.length > 0) {
					user = request.body.username;
					return response.sendFile(path.join(__dirname, 'views', 'homepage.html')); //must return for this method to work. Will redirect to the simulator.html
				} else {
					//response.send('Incorrect Username and/or Password!');
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
	connection.query('SELECT * FROM virus WHERE virusName = ? AND userName = ?', [ diseaseName, user ], function(
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
			console.log(user);
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
				user +
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

//method is used for registering a new user
app.post('/register', function(request, response) {
	var username = request.body.username;
	var passWord = request.body.password;
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;
	
	if ((username && passWord) && (firstname && lastname)) {
		//creating the table if it does not exist
		var sql =
			'CREATE TABLE if not exists login(first_name varchar(30), last_name varchar(30), username varchar(30) not null, password varchar(30), PRIMARY KEY (username))';
		connection.query(sql, function(err, result) {
			if (err) {
				throw err;
			}
		});

		sql =
			'CREATE TABLE if not exists virus(virusName varchar(50) not null, infectionRate int, deathRate int,' +
			'threshold int, weeks int, username varchar(30), FOREIGN KEY (username) REFERENCES login(username))';
		connection.query(sql, function(err, result) {
			if (err) {
				throw err;
			}
		});
		
		//store premade diseases if not stored already
		connection.query('SELECT * FROM virus WHERE username = "antivaxer"', [], function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length != 3) {
					connection.query('INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username, weeks) VALUES("Covid-19", 30, 10, 2, "antivaxer", 52)');
					connection.query('INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username, weeks) VALUES("Ebola", 50, 20, 2, "antivaxer", 52)');
					connection.query('INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username, weeks) VALUES("Bubonic Plague", 65, 45, 2, "antivaxer", 52)');
					console.log('stores diseases');
				}
			}
		});

		connection.query('SELECT * FROM login WHERE userName = ?', [ username ], function(error, results, fields) {
			
			if (results.length > 0) {
				console.log('ERROR: username already exists!');
				response.redirect('/');
			} else {
				user = username;
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
					return response.sendFile(path.join(__dirname, 'views', 'homepage.html')); //must return for this method to work. Will redirect to the simulator.html
				});
			}
		});
	}else{response.redirect('/Register');}
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
/*routing to pages end */

/*get requests */
//used to get all of the viruses from the database
app.get('/virusData', function(request, response) {
	connection.query('SELECT * FROM virus WHERE username = ? OR username = "antivaxer"', [ user ], function(
		error,
		results
	) {
		response.send(results); //sending back all the viruses to the simulation page
	});
});

//method sends the username to the homepage, which will result in "Welcome username (in the userInfo table)"
app.get('/username', function(request, response) {
	if (user == '') {
		response.send('?');
	} else {
		response.send(user);
	}
});

app.get('/scripts/outbreak/outbreak.js', function(request, response) {
	console.log(request.params);
});

/*get requests end */

app.listen(3000); //listening on port 3000
console.log('Server running on port 3000!');
