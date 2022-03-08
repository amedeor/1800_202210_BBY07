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

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location = 'login.html'
  }
});

let reportEmergencyButton = document.querySelector("#report-emergency-button");

reportEmergencyButton.addEventListener("click", e => {
  window.location = "report.html";
})

let callSecurityButton = document.querySelector("#call-security-button");

callSecurityButton.addEventListener("click", e => {
  window.open("tel:555-555-5555", "_self");
});