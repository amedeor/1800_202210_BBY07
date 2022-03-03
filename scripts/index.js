let reportEmergencyButton = document.querySelector("#report-emergency-button");
let contactSecurityButton = document.querySelector("#call-security-button");

reportEmergencyButton.addEventListener("click", e => {
  //if the user is logged in, redirect to the report.html page, else, redirect to login page
  auth.onAuthStateChanged(user => {
    if (user) {
      window.location.assign("report.html");
    } else {
      window.location.assign("login.html"); 
    }
  });
  
});

// contactSecurityButton.addEventListener("click", e => {
//   window.open("tel:555-555-5555", "_self");
// });


