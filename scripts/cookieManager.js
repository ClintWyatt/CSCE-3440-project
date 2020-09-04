function getUsernameCookie() {
  var i = document.cookie.indexOf("username");
  var value = "";

  if (i != -1) {
    i += 9; //get start index of cookie value

    while (i < document.cookie.length && document.cookie[i] != ";") {
      value += document.cookie[i];
      i++;
    }
  }

  return decodeURIComponent(value);
}

//check if a user is logged in or not, redirect to appropriate page
function checkLoggedIn() {
  if (window.location.pathname == "/" || window.location.pathname == "/Register") {
    if (getUsernameCookie() != "") {
      window.location.pathname = "/Homepage";
    }
  } else {
    if (getUsernameCookie() == "") {
      window.location.pathname = "/";
    }
  }
}

//when browser exits, clear all cookies
window.onbeforeunload = () => {
  document.cookie = "";
};

checkLoggedIn();
