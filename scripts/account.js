auth.onAuthStateChanged(user => {
  if (!user) {
    window.location = 'login.html'
  }
});

function populateAccountInfo() {
  auth.onAuthStateChanged(user => {
    if (user) {
      userInfo = db.collection("users").doc(user.uid);
      
      userInfo.get()
        .then(userDoc => {
          let name = userDoc.data().name;
          let email = userDoc.data().email;

          let nameInput = document.querySelector("#name");
          let emailInput = document.querySelector("#email");

          nameInput.setAttribute("value", name);
          emailInput.setAttribute("value", email)
        });
      }
  })
}

populateAccountInfo();



