$.get('/username', function(results) {
    document.getElementById('welcome-message').innerText = 'Welcome, ' + results + '!';
});
