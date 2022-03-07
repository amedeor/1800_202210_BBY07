//check if the user is logged in, if not, redirect to the login.html page
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location = 'login.html'
  } 
});

//get a reference to the HTML form
const emergencyReportForm = document.querySelector("#emergency-report-form");

//save report data
emergencyReportForm.addEventListener("submit", e => {
 //prevents the default action of reloading the page after clicking the submit button
  e.preventDefault(); 

  const signedInUser = auth.currentUser;
  const signedInUserId = signedInUser.uid;
  console.log(signedInUserId);

  //go to the correct user document by referencing to the user's uid
  const userDocument = db.collection("users").doc(signedInUserId);
  console.log(userDocument);

  //get the reports collection of the current user
  const reports = userDocument.collection("reports");

  reports.add({
    description: emergencyReportForm.phoneNumber.value,
    severity: emergencyReportForm.severity.value
  });

})