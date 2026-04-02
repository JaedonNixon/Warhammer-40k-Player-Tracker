/**
 * firebase.ts — Firebase SDK initialization
 *
 * Initializes the Firebase app with the "ham-tracker" project config
 * and exports the Firestore database and Auth instances.
 *
 * All other files that need Firestore or Auth import from here:
 *   import { db, auth } from "../firebase";
 *
 * Firebase project: ham-tracker (Spark/free plan)
 * Services used: Firestore (database), Auth (email/password)
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_1HnNT_lqPdAcJJMdZlcFAGy2E9CG_mg",
  authDomain: "ham-tracker.firebaseapp.com",
  projectId: "ham-tracker",
  storageBucket: "ham-tracker.firebasestorage.app",
  messagingSenderId: "107548547385",
  appId: "1:107548547385:web:89ce26f0cfcb56a4afb0e8",
  measurementId: "G-06JMDQS7RM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
