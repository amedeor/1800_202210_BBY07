auth.onAuthStateChanged(user => {
  //need to check that the user is not on the report.html page or it will repeatedly try to redirect to report.html if user is logged in
  if (user && window.location.pathname !== "/report.html") {
    window.location.assign("report.html");
  } else if (user === null) {
    window.location.assign("login.html"); 
  } else {
    //do nothing 
  }
});