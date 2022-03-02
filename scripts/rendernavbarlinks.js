let loggedOutLinks = document.querySelectorAll(".logged-out");
let loggedInLinks = document.querySelectorAll(".logged-in");
let loggedInLinksLoggedOutLinks = document.querySelectorAll(".logged-in-logged-out")

console.log(loggedOutLinks);
console.log(loggedInLinks);

function renderNavBarLinks(user) {
  //if user is logged in, show the logged-in links
  if (user) {
    for (let i = 0; i < loggedInLinks.length; i++) {
      console.log(loggedInLinks[i].innerText);
      loggedInLinks[i].style.display = "block";
    }
    for (let i = 0; i < loggedOutLinks.length; i++) {
      console.log(loggedOutLinks[i].innerText);
      loggedOutLinks[i].style.display = "none";
    }
    //show the links that are for both a logged out and logged in user
    for (let i = 0; i < loggedInLinksLoggedOutLinks.length; i++) {
      console.log(loggedInLinksLoggedOutLinks[i].innerText);
      loggedInLinksLoggedOutLinks[i].style.display = "block";
    }
  } else {
    //if user is not logged in, do not show the logged-in links
    for (let i = 0; i < loggedInLinks.length; i++) {
      console.log(loggedInLinks[i].innerText);
      loggedInLinks[i].style.display = "none";
    }
    for (let i = 0; i < loggedOutLinks.length; i++) {
      console.log(loggedOutLinks[i].innerText);
      loggedOutLinks[i].style.display = "block";
    }
    //show the links that are for both a logged out and logged in user
    for (let i = 0; i < loggedInLinksLoggedOutLinks.length; i++) {
      console.log(loggedInLinksLoggedOutLinks[i].innerText);
      loggedInLinksLoggedOutLinks[i].style.display = "block";
    }
  }
}