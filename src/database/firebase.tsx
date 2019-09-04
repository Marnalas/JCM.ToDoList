import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyA4fwvQ5X08tFAuJwfuRf67pCcrisnOuBI",
  authDomain: "jcm-todolist.firebaseapp.com",
  databaseURL: "https://jcm-todolist.firebaseio.com",
  projectId: "jcm-todolist",
  storageBucket: "jcm-todolist.appspot.com",
  messagingSenderId: "469109205281",
  appId: "1:469109205281:web:10fdc57511fcf7f4"
});
const toDosCollection = firebase.firestore().collection("toDos");

export { toDosCollection };
