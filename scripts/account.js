auth.onAuthStateChanged(user => {
  if (user) {
    window.location.assign("account.html");
  } else {
    window.location.assign("login.html"); 
  }
});