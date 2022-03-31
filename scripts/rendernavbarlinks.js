let loggedOutLinks = document.querySelectorAll(".logged-out");
let loggedInLinks = document.querySelectorAll(".logged-in");
let loggedInLinksLoggedOutLinks = document.querySelectorAll(".logged-in-logged-out")

//console.log(loggedOutLinks);
//console.log(loggedInLinks);

function renderNavBarLinks(user) {
  //if user is logged in, show the logged-in links
  if (user) {
    for (let i = 0; i < loggedInLinks.length; i++) {
      //console.log(loggedInLinks[i].innerText);
      loggedInLinks[i].classList.remove("none-display");
      loggedInLinks[i].classList.remove("hide-link");
      loggedInLinks[i].classList.add("block-display");
    }
    for (let i = 0; i < loggedOutLinks.length; i++) {
      //console.log(loggedOutLinks[i].innerText);
      loggedOutLinks[i].classList.add("none-display");
    }
    //show the links that are for both a logged out and logged in user
    for (let i = 0; i < loggedInLinksLoggedOutLinks.length; i++) {
      //console.log(loggedInLinksLoggedOutLinks[i].innerText);
      loggedInLinksLoggedOutLinks[i].classList.remove("none-display");
      loggedInLinksLoggedOutLinks[i].classList.remove("hide-link");
      loggedInLinksLoggedOutLinks[i].classList.add("block-display");
    }
  } else {
    //if user is not logged in, do not show the logged-in links
    for (let i = 0; i < loggedInLinks.length; i++) {
      //console.log(loggedInLinks[i].innerText);
      loggedInLinks[i].classList.add("none-display");
    }
    for (let i = 0; i < loggedOutLinks.length; i++) {
      //console.log(loggedOutLinks[i].innerText);
      loggedOutLinks[i].classList.remove("none-display");
      loggedOutLinks[i].classList.remove("hide-link");
      loggedOutLinks[i].classList.add("block-display");
    }
    //show the links that are for both a logged out and logged in user
    for (let i = 0; i < loggedInLinksLoggedOutLinks.length; i++) {
      //console.log(loggedInLinksLoggedOutLinks[i].innerText);
      loggedInLinksLoggedOutLinks[i].classList.remove("none-display");
      loggedInLinksLoggedOutLinks[i].classList.remove("hide-link");
      loggedInLinksLoggedOutLinks[i].classList.add("block-display");
    }
  }
}
