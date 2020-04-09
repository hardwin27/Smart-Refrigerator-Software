import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDZy_mTeXBeZ6Bak0TCOeMxP3kGxFyjLkM",
    authDomain: "smartrefrigerator-595c6.firebaseapp.com",
    databaseURL: "https://smartrefrigerator-595c6.firebaseio.com",
    projectId: "smartrefrigerator-595c6",
    storageBucket: "smartrefrigerator-595c6.appspot.com",
    messagingSenderId: "58166985637",
    appId: "1:58166985637:web:bca2a463ad795fa02b9e4c",
    measurementId: "G-G8Z6P1DQMF"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;