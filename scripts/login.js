let logoLink = document.querySelector("#logo-link");

//if a user is not logged in and they click on the navbar logo, direct them to login.html
//if a user is logged in and they click on the navbar logo, direct them to main.html
logoLink.addEventListener("click", e => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location = "index.html";
    }
    else if (user) {
      window.location = "main.html"
    }
  });
})