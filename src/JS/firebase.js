// src/JS/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push, onChildAdded } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrGfH-eo2fR4Qobt323iyBgb7W0_H-JBI",
  authDomain: "forauth-c0341.firebaseapp.com",
  projectId: "forauth-c0341",
  storageBucket: "forauth-c0341.appspot.com",
  messagingSenderId: "1033039048133",
  appId: "1:1033039048133:web:91dd963e2044899507efac",
  measurementId: "G-LP6Q80MXNQ",
  databaseURL: "https://forauth-c0341-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { database, ref, set, onValue, push, onChildAdded, auth };
