auth.onAuthStateChanged(user => {
  //need to check that the user is not on the reporthistory.html page or it will repeatedly try to redirect to reporthistory.html if user is logged in
  if (user && window.location.pathname !== "/reporthistory.html") {
    window.location.assign("reporthistory.html");
  } else if (user === null) {
    window.location.assign("login.html"); 
  } else {
    //do nothing 
  }
});