//fetch the username of the current user for the welcome message
fetch('/username')
  .then((result) => result.text())
  .then((resultStr) => {
    document.getElementById('welcome-message').innerText = 'Welcome, ' + resultStr + '!';
  });