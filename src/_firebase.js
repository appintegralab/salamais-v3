import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'
import "firebase/compat/auth"

firebase.initializeApp({
    apiKey: "AIzaSyC_QSAB-P4MSRe9QY8vT64i3-C-vrEMMc4",
    authDomain: "appintegra-d8424.firebaseapp.com",
    databaseURL: "https://appintegra-d8424-default-rtdb.firebaseio.com",
    projectId: "appintegra-d8424",
    storageBucket: "appintegra-d8424.appspot.com",
    messagingSenderId: "549034408889",
    appId: "1:549034408889:web:7bb99a3385bcc59c1b5468"
});

const db = firebase.firestore();
export { db }

function initAuth() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            //console.log("user auth ok");
            user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                //console.log("idToken",idToken.substr(0,30));
                //console.log("idToken",idToken);
            }).catch(function (error) {
                // Handle error
                //console.log("error",error);
            });
        } else {
            // No user is signed in.
        }
    });

    firebase.auth().signInWithEmailAndPassword("appintegra.lab@gmail.com", "miroma")
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            //console.log("userCredential.user ok",userCredential.user);
            console.log("userCredential.user ok");
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            //console.log("erro",error);
        });
}

initAuth();