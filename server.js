var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');
const { connect } = require('http2');
var user; //will be used for inserting info into the virus table
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Samus2647!',
    database: "userInfo"
});

var app = express();
app.use(express.static(__dirname));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//the app function below directs the user to the login.html when
//the user goes to the port number for the site
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, 'views', '/login.html'));
});

//the app method below will validate the user login credientals
app.post('/login', function(request, response) {

	//creating the table if it does not exist
	var sql = "CREATE TABLE if not exists login(first_name varchar(30), last_name varchar(30), username varchar(30) not null, password varchar(30))";
	connection.query(sql, function(err, result){
					
		if(err){throw err;}
	});

	if (request.body.username && request.body.password) {
		
		connection.query('SELECT * FROM login WHERE userName = ? AND password = ?', [request.body.username, request.body.password], function(error, results, fields) {
			console.log(results.length);
			if (results.length > 0) {
				user = request.body.username;
				return response.sendFile(path.join(__dirname, 'views', 'homepage.html'));//must return for this method to work. Will redirect to the simulator.html
			} else {
				//response.send('Incorrect Username and/or Password!');
				response.redirect('/');
			}			
			response.end();
		});
	} else {
		//response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/homepage', function(request, response){
	return response.sendFile(path.join(__dirname, 'views', 'homepage.html'));//must return for this method to work. Will redirect to the simulator.html
});

app.get('/scripts/outbreak/outbreak.js', function(request, response){
	console.log(request.params);
});

//method is used for registering a new user
app.post('/register', function(request, response){
	var username = request.body.username;
	var passWord = request.body.password;
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;

	//creating the table if it does not exist
	var sql = "CREATE TABLE if not exists login(first_name varchar(30), last_name varchar(30), username varchar(30) not null, password varchar(30), PRIMARY KEY (username))";
	connection.query(sql, function(err, result){
					
		if(err){throw err;}
	});

	sql = "CREATE TABLE if not exists virus(virusName varchar(50) not null, infectionRate int, deathRate int, threshold int, weeks int, username varchar(30), FOREIGN KEY (username) REFERENCES login(username))";
	connection.query(sql, function(err, result){
					
		if(err){throw err;}
	});

	if(username && passWord)
	{
		connection.query('SELECT * FROM login WHERE userName = ?', [username], function(error, results, fields) {
			console.log(results.length);

			if (results.length > 0) {
				console.log("ERROR: username already exists!");
				//response.sendFile(path.join(__dirname, 'views', '/simulator.html'));
				//return response.sendFile(path.join(__dirname, 'views', 'homepage.html'));//must return for this method to work. Will redirect to the simulator.html
				response.redirect('/');
			} 
			else {
				user = username;
				var sql = "INSERT INTO login (first_name, last_name, userName, password) VALUES('"+firstname+"', '"+lastname+"','"+username+"', '"+passWord+"')";
				connection.query(sql, function(err, result){
					
					if(err){throw err;}
					return response.sendFile(path.join(__dirname, 'views', 'homepage.html'));//must return for this method to work. Will redirect to the simulator.html
				});
			}	
		});
	}
});


app.get('/Simulation', function(request, response){

	return response.sendFile(path.join(__dirname, 'views', 'simulator.html'));//going to the simulation page
});

app.get('/Register', function(request, response){

	return response.sendFile(path.join(__dirname, 'views', 'register.html'));//must return for this method to work. Will redirect to the simulator.html	
})

app.get('/BackToLogin', function(request, response){
	return response.sendFile(path.join(__dirname, 'views', 'login.html'));//must return for this method to work. Will redirect to the simulator.html	
})

//getting data for the disease saved by the user.
app.post('/', function(request, response){

	var diseaseName = request.body.diseaseName;
	var infectRate = request.body.infRate;
	var deathRate = request.body.deathRate;
	var threshold = request.body.threshold;


	var sql = "INSERT INTO virus (virusName, infectionRate, deathRate, threshold, username) VALUES('"+diseaseName+"','"+infectionRate+"','"+deathRate+"', '"+threshold+"', '"+user+"')";
	connection.query(sql, function(err, result){
		if(err){throw err;}
		else{console.log("virus saved");}
	});

})
app.listen(3000);//listening on port 3000
console.log("Server running on port 3000!");