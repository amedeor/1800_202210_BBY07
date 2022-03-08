let reportEmergencyButton = document.querySelector("#report-emergency-button");
let callSecurityButton = document.querySelector("#call-security-button");

reportEmergencyButton.addEventListener("click", e => {
  //if the user is logged in, redirect to the report.html page, else, redirect to login page
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.assign("login.html");
    } else {
      window.location.assign("report.html"); 
    }
  });
  
});

callSecurityButton.addEventListener("click", e => {
  window.open("tel:555-555-5555", "_self");
});


