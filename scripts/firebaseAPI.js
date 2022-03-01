//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBmdnDtyywzkngwSlUHj_ySN2ms8NBwKDU",
    authDomain: "comp1800-team07-app.firebaseapp.com",
    projectId: "comp1800-team07-app",
    storageBucket: "comp1800-team07-app.appspot.com",
    messagingSenderId: "936864780578",
    appId: "1:936864780578:web:7e0255aa63b1c4b954557b",
    measurementId: "G-YH41GEBZ2R"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();