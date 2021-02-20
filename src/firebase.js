import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCTI0Jk2GSZQ4QQuiwNrwJWJcwxVjzGgsk",
  authDomain: "message-app-5bb73.firebaseapp.com",
  projectId: "message-app-5bb73",
  storageBucket: "message-app-5bb73.appspot.com",
  messagingSenderId: "901132971289",
  appId: "1:901132971289:web:2e8562295f504e5ffaa988",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
