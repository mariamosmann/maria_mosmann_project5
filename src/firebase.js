import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCkB-bW5_beElbEWyN3miha9Brx0dPwnzg",
    authDomain: "youcandoit-8dbb9.firebaseapp.com",
    databaseURL: "https://youcandoit-8dbb9.firebaseio.com",
    projectId: "youcandoit-8dbb9",
    storageBucket: "",
    messagingSenderId: "62711312744"
};
firebase.initializeApp(config);

export default firebase;
