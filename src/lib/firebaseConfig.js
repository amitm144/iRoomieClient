import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7CTeJuVQcIl1Z7WHuyfXrVJbeqlAgJ54",
  authDomain: "iroomiechat.firebaseapp.com",
  projectId: "iroomiechat",
  storageBucket: "iroomiechat.appspot.com",
  messagingSenderId: "114668253591",
  appId: "1:114668253591:web:1f2b0c83fa856c21c994d2",
  measurementId: "G-L0BK7CLK72"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, database, analytics, googleProvider };