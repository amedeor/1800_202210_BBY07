auth.onAuthStateChanged(user => {
  if (user) {
    window.location.assign("reporthistory.html");
  } else {
    window.location.assign("login.html"); 
  }
});