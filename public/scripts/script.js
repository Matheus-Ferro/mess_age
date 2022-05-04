import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJsS0IVUVTnZvrrS0gI2NV-nA44NRDb_s",
  authDomain: "mess-age.firebaseapp.com",
  projectId: "mess-age",
  storageBucket: "mess-age.appspot.com",
  messagingSenderId: "645887429492",
  appId: "1:645887429492:web:0afe6cf4e9504115593a21",
  measurementId: "G-Y0XFPE0GJR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const db = firebase.firestore();
const MESS = "message";

export var documents = [];

export function add_message_to_documents(codename, msg, date, formatted_date) {
  db.collection(MESS)
    .add({
      codename: codename,
      msg: msg,
      date: date,
      formatted_date: formatted_date,
    })
    .then(() => load_documents())
    .catch((error) => {
      console.log(error);
    });
}

export async function load_documents() {
  documents = [];
  const querySnapshot = await db
    .collection("message")
    .orderBy("date", "desc")
    .get();
  const docSnapshots = querySnapshot.docs;
  for (var i in docSnapshots) {
    const doc = docSnapshots[i].data();
    documents.push(doc);
    console.log(documents);
  }
  return true;
}
load_documents();

export function on_snapshot() {
  db.collection(MESS).onSnapshot((snapshot) => {
    load_documents();
    return true;
  });
}
