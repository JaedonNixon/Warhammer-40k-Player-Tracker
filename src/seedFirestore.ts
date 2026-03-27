// One-time script to seed Firestore with existing local data.
// Run with: npx ts-node --compiler-options '{"module":"commonjs"}' src/seedFirestore.ts
// Or via the browser — see instructions below.

import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { players } from "./data/players";
import { games } from "./data/games";
import { tournaments } from "./data/tournaments";

async function seed() {
  console.log("Seeding Firestore...\n");

  // Upload players
  for (const player of players) {
    await setDoc(doc(db, "players", player.id), JSON.parse(JSON.stringify(player)));
    console.log(`✅ Player: ${player.name}`);
  }

  // Upload games
  for (const game of games) {
    await setDoc(doc(db, "games", String(game.id)), JSON.parse(JSON.stringify(game)));
    console.log(`✅ Game #${game.id}`);
  }

  // Upload tournaments
  for (const tournament of tournaments) {
    await setDoc(doc(db, "tournaments", tournament.id), JSON.parse(JSON.stringify(tournament)));
    console.log(`✅ Tournament: ${tournament.name}`);
  }

  console.log("\n🎉 Done! All data uploaded to Firestore.");
}

seed().catch(console.error);
