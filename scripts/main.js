function insertName() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {                                                                 
          // Do something for the current logged-in user here: 
          console.log(user.uid);
          //go to the correct user document by referencing to the user uid
          currentUser = db.collection("users").doc(user.uid);
          //get the document for current user.
          currentUser.get()
          .then(userDoc => {
            console.log(userDoc);
             let userName = userDoc.data().name;
             console.log(userName);
             //method #1:  insert with html only
             document.querySelector("#name-goes-here").innerText = userName;    //using javascript
             //method #2:  insert using jquery
             //$("#name-goes-here").text(user_Name);                         //using jquery
          })
      } else {
          // No user is signed in.
      }
  });
}

insertName();

auth.onAuthStateChanged(user => {
  //need to check that the user is not on the main.html page or it will repeatedly try to redirect to main.html if user is logged in
  if (user && window.location.pathname !== "/main.html") {
    window.location.assign("main.html");
  } else if (user === null) {
    window.location.assign("login.html"); 
  } else {
    //do nothing 
  }
});


