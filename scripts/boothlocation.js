var currentUser;

firebase.auth().onAuthStateChanged(user => {

      if (user) {

            currentUser = db.collection("users").doc(user.uid);     

            document.getElementById("main").addEventListener("click");

            location.href = "main.html";

    } else { 

            console.log("No user is signed in");

            location.href = "index.html"; }

});