"use strict";
exports.__esModule = true;
exports.FirebaseInit = void 0;
var firebase = require("firebase/app");
var FirebaseData = undefined;
var FirebaseInit = function () {
    if (FirebaseData === undefined) {
        var firebaseConfig = {
            apiKey: "AIzaSyCYsCDt_sP6I9ILrDGDVj7tH1oGdWM5zEQ",
            authDomain: "bazarvocacional.firebaseapp.com",
            projectId: "bazarvocacional",
            storageBucket: "bazarvocacional.appspot.com",
            messagingSenderId: "741986682098",
            appId: "1:741986682098:web:0f172921af9800951a7c6b"
        };
        // Initialize Firebase
        FirebaseData = firebase.initializeApp(firebaseConfig);
    }
    return FirebaseData;
};
exports.FirebaseInit = FirebaseInit;
exports["default"] = exports.FirebaseInit;
