/**
 * resetFirestore.mjs — Firestore data reset script
 *
 * Wipes all game and tournament data from Firestore and resets
 * every player's stats (W/L/D) and per-army stats back to zero.
 * Players themselves are NOT deleted — only their stats are zeroed.
 *
 * Run with: node scripts/resetFirestore.mjs
 *
 * WARNING: This is destructive and irreversible. All game history
 * and tournament data will be permanently deleted.
 */
// One-time script to wipe games, reset player stats, and remove tournaments.
// Run with: node scripts/resetFirestore.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
const db = getFirestore(app);

async function reset() {
  console.log("Resetting Firestore...\n");

  // Delete all games
  const gamesSnap = await getDocs(collection(db, "games"));
  for (const d of gamesSnap.docs) {
    await deleteDoc(doc(db, "games", d.id));
    console.log("  Deleted game:", d.id);
  }

  // Delete all tournaments
  const tournamentsSnap = await getDocs(collection(db, "tournaments"));
  for (const d of tournamentsSnap.docs) {
    await deleteDoc(doc(db, "tournaments", d.id));
    console.log("  Deleted tournament:", d.id);
  }

  // Reset all player stats to 0
  const playersSnap = await getDocs(collection(db, "players"));
  for (const d of playersSnap.docs) {
    const player = d.data();
    const resetArmies = (player.armies || []).map((a) => ({
      ...a,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
    }));
    await updateDoc(doc(db, "players", d.id), {
      totalWins: 0,
      totalLosses: 0,
      totalDraws: 0,
      armies: resetArmies,
    });
    console.log("  Reset player:", player.name);
  }

  console.log("\nDone! All games and tournaments wiped, player stats reset to 0.");
  process.exit(0);
}

reset().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
