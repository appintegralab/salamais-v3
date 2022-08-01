import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'
import "firebase/compat/auth"
import { ref } from "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//const tkc = 'eyJhcGlLZXkiOiJBSXphU3lEcUhuQWRUclZjOWVSRmYyVldMNndPR1JoWE5abHhieVUiLCJhdXRoRG9tYWluIjoic2FsYW1haXMuZmlyZWJhc2VhcHAuY29tIiwiZGF0YWJhc2VVUkwiOiJodHRwczovL3NhbGFtYWlzLWRlZmF1bHQtcnRkYi5maXJlYmFzZWlvLmNvbSIsInByb2plY3RJZCI6InNhbGFtYWlzIiwic3RvcmFnZUJ1Y2tldCI6InNhbGFtYWlzLmFwcHNwb3QuY29tIiwibWVzc2FnaW5nU2VuZGVySWQiOiI0MzI1NTIwNTkyMzYiLCJhcHBJZCI6IjE6NDMyNTUyMDU5MjM2OndlYjpmYzhmN2UzMGIwMzE0NjcxZTA5YTcxIiwibWVhc3VyZW1lbnRJZCI6IkctTEtLRDBZODBFMSJ9'
const tkc = 'eyJhcGlLZXkiOiJBSXphU3lCb2xLX1NDWE5aeGRYbnF6UXhQQVpPel9Ld3phTmxLTDAiLCJhdXRoRG9tYWluIjoicHJqLXNhbGFtYWlzLXByZC5maXJlYmFzZWFwcC5jb20iLCJkYXRhYmFzZVVSTCI6Imh0dHBzOi8vcHJqLXNhbGFtYWlzLXByZC1kZWZhdWx0LXJ0ZGIuZmlyZWJhc2Vpby5jb20iLCJwcm9qZWN0SWQiOiJwcmotc2FsYW1haXMtcHJkIiwic3RvcmFnZUJ1Y2tldCI6InByai1zYWxhbWFpcy1wcmQuYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6Ijc1MzI3ODUyODgyNiIsImFwcElkIjoiMTo3NTMyNzg1Mjg4MjY6d2ViOmJhOWRlZGYxMGFjMzUyMWZjMmY0MDMifQ=='
const cfg = JSON.parse(atob(tkc))
//console.log(cfg);
firebase.initializeApp(cfg);

const db = firebase.firestore();
const rdb = firebase.database();
const storage = firebase.storage();

function snapToArray(snap) {
    if (snap.val() == null) return []
    let vet = [], data = snap.val()
    for (let i in data) {
        vet.push(data[i])
    }
    return(vet);
}

const rdbmode = "prod" //"dev" //"prod"
const paths = {
    "prod": "/salamais/",
    "dev": "/salamais-dev/"
}
const rdbref = (path) => { return ref(rdb,paths[rdbmode]+path) }

export { db, rdb, storage, snapToArray, rdbmode, rdbref }

//function initAuth() {
//    firebase.auth().onAuthStateChanged(function (user) {
//        if (user) {
//            // User is signed in.
//            //console.log("user auth ok");
//            user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
//                // Send token to your backend via HTTPS
//                // ...
//                //console.log("idToken",idToken.substr(0,30));
//                //console.log("idToken",idToken);
//            }).catch(function (error) {
//                // Handle error
//                //console.log("error",error);
//            });
//        } else {
//            // No user is signed in.
//        }
//    });
//    let ue = atob('YXBwaW50ZWdyYS5sYWJAZ21haWwuY29t')
//    let up = atob('YW1vcmE5N2lu')
//    firebase.auth().signInWithEmailAndPassword(ue, up)
//        .then((userCredential) => {
//            // Signed in
//            var user = userCredential.user;
//            //console.log("userCredential.user ok",userCredential.user);
//            //console.log("userCredential.user ok");
//            // ...
//        })
//        .catch((error) => {
//            var errorCode = error.code;
//            var errorMessage = error.message;
//            console.log("erro",error);
//            console.log("errorMessage",errorMessage);
//        });
//}
//
//initAuth();