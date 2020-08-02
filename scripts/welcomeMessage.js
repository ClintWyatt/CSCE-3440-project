//retrieve the username of the current user for the welcome message
$.get('/username', function(results) {
    document.getElementById('welcome-message').innerText = 'Welcome, ' + results + '!';
});
