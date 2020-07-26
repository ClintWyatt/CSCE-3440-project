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
app.use(express.static(__dirname));

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
    response.sendFile(path.join(__dirname, 'views', '/login.html'));
});

/*
app.get('/views', function(request, response){
	response.sendFile(path.join(__dirname + '../views/htmlTable.html'));
});
*/

//the app method below will validate the user login credientals
app.post('/login', function(request, response) {
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
				//response.sendFile(path.join(__dirname, 'views', '/htmlTable.html'));
				return response.sendFile(path.join(__dirname, 'views', 'homepage.html'));//must return for this method to work. Will redirect to the htmlTable.html
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

//happens whenever you are logged into the home page
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
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

	if(username && passWord)
	{
		connection.query('SELECT * FROM login WHERE userName = ?', [username], function(error, results, fields) {
			console.log(results.length);

			if (results.length > 0) {
				console.log("ERROR: username already exists!");
				//response.sendFile(path.join(__dirname, 'views', '/htmlTable.html'));
				//return response.sendFile(path.join(__dirname, 'views', 'homepage.html'));//must return for this method to work. Will redirect to the htmlTable.html
				response.redirect('/');
			} 
			else {
				var sql = "INSERT INTO login (first_name, last_name, userName, password) VALUES('"+firstname+"', '"+lastname+"','"+username+"', '"+passWord+"')";
				connection.query(sql, function(err, result){
					
					if(err){throw err;}
					return response.sendFile(path.join(__dirname, 'views', 'homepage.html'));//must return for this method to work. Will redirect to the htmlTable.html
				});
			}	
		});
	}
});


app.get('/Simulation', function(request, response){

	return response.sendFile(path.join(__dirname, 'views', 'htmlTable.html'));//going to the simulation page
});

app.get('/Register', function(request, response){

	return response.sendFile(path.join(__dirname, 'views', 'register.html'));//must return for this method to work. Will redirect to the htmlTable.html	
})

app.get('/BackToLogin', function(request, response){
	return response.sendFile(path.join(__dirname, 'views', 'login.html'));//must return for this method to work. Will redirect to the htmlTable.html	
})
app.listen(3000);//listening on port 3000
console.log("Server running on port 3000!");