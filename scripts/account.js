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
          var userName = userDoc.data().name;
          var userEmail = userDoc.data().email;

          let nameInput = document.querySelector("#name");
          let emailInput = document.querySelector("#email");

          nameInput.setAttribute("value", userName);
          emailInput.setAttribute("value", userEmail)
        });
    }
  })
}

populateAccountInfo();

const edit = document.getElementById("edit");
const save = document.getElementById("save");

edit.addEventListener("click", editUserInfo);
save.addEventListener("click", saveUserInfo);

function editUserInfo() {
  document.getElementById("account-information-fields").disabled = false;
}

function saveUserInfo() {
  userEmail = document.getElementById("email").value;
  userName = document.getElementById("name").value;

  userInfo.update({
    name: userName,
    email: userEmail
  })
  .then(() => {
    console.log("Document successfully updated!");
  })

  document.getElementById('account-information-fields').disabled = true;
}

