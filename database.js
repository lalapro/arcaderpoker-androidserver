const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfeJUbf7LoN7IMIFp7zbE50QK6lMDeTR8",
  authDomain: "arcade-poker.firebaseapp.com",
  databaseURL: "https://arcade-poker.firebaseio.com/",
  // storageBucket: "highscore.appspot.com"
};

firebase.initializeApp(firebaseConfig);

var database = {};

database.fbFriends = firebase.database().ref('/fbfriends');
database.highscores = firebase.database().ref('/highscore');
database.gameRooms = firebase.database().ref('/gameRooms');
database.blitzGame = firebase.database().ref('/blitzGame');
database.uniquePlayers = firebase.database().ref('/uniquePlayers');

module.exports = database;
