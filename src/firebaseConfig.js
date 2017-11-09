import Firebase from 'firebase'

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyDlyjcJOei0310iL1uOIaEI1P4INYgYDUA",
  authDomain: "bookmarks-4cefd.firebaseapp.com",
  databaseURL: "https://bookmarks-4cefd.firebaseio.com",
  projectId: "bookmarks-4cefd",
  storageBucket: "bookmarks-4cefd.appspot.com",
  messagingSenderId: "683363154741"
};
  let firebaseApp = Firebase.initializeApp(config);
  let db = firebaseApp.database()

  export {firebaseApp , db};