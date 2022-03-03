auth.onAuthStateChanged(user => {
  //need to check that the user is not on the account.html page or it will repeatedly try to redirect to account.html if user is logged in
  if (user && window.location.pathname !== "/account.html") {
    window.location.assign("account.html");
  } else if (user === null) {
    window.location.assign("login.html"); 
  } else {
    //do nothing 
  }
});