import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9TBdjRULzo9kcxa86da5NCHE9T3N0CqY",
  authDomain: "planeat-937bc.firebaseapp.com",
  databaseURL: "https://planeat-937bc-default-rtdb.firebaseio.com",
  projectId: "planeat-937bc",
  storageBucket: "planeat-937bc.appspot.com",
  messagingSenderId: "117453608626",
  appId: "1:117453608626:web:9cf82bff3265b41b3d1bab",
  measurementId: "G-L4J4NBQXGL"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
