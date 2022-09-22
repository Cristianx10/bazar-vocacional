import * as firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyCYsCDt_sP6I9ILrDGDVj7tH1oGdWM5zEQ",
    authDomain: "bazarvocacional.firebaseapp.com",
    projectId: "bazarvocacional",
    storageBucket: "bazarvocacional.appspot.com",
    messagingSenderId: "741986682098",
    appId: "1:741986682098:web:0f172921af9800951a7c6b"
};

// Initialize Firebase
var Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;