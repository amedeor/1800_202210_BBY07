// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var user = authResult.user;                            
        if (authResult.additionalUserInfo.isNewUser) {         
            db.collection("users").doc(user.uid).set({         
                    name: user.displayName,                   
                    email: user.email                          
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("main.html");       
                })
                .catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
        } else {
            return true;
        }
        return false;
    },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

 //render navbar links depending on if the user is logged in our logged out
  auth.onAuthStateChanged(user => {
    if (user) {
      renderNavBarLinks(user);
    } else {
      renderNavBarLinks(user);
    }
  });


  // first check if the #firebaseui-auth-container element is on the page
  const firebaseuiAuthContainer = document.querySelector("#firebaseui-auth-container");

  //render the firebase authentication widget if the container to hold it exists
  if (firebaseuiAuthContainer !== null) {
    ui.start('#firebaseui-auth-container', uiConfig);
  };
  
//signout the user 
let signout = document.querySelector("#signout");

signout.addEventListener("click", e => {
  e.preventDefault();
  //signoutOut is an asynchronous function
  auth.signOut().then(() => {
    console.log("User has been sign out out successfully."); //will only display in console if window.location.assign("signout.html"); is not used
    window.location.assign("signout.html");  
  }).catch( () => {
    console.log("Error, could not sign out user.");
  });
});

