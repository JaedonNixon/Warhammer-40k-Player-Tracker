// Standalone seed script - run with: node scripts/seedFirestore.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

// ── PLAYERS ──
const players = [
  {
    id: "jaedon-nixon", name: "Jaedon Nixon", avatar: "⚔️", theme: "black-templars",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [{ name: "Black Templars", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "black-templars" }],
    joinedDate: "2026-03-26",
  },
  {
    id: "linden-hnatiuk", name: "Linden Hnatiuk", avatar: "🛡️", theme: "ultramarines",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [
      { name: "Ultramarines", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "ultramarines" },
      { name: "Adeptus Custodes", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "custodes" },
      { name: "Tyranids", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "tyranids" },
      { name: "Necrons", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "necrons" },
      { name: "Imperial Knights", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "imperial-knights" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "aidan-mahoney", name: "Aidan Mahoney", avatar: "🗡️", theme: "thousand-sons",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [
      { name: "Thousand Sons", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "thousand-sons" },
      { name: "Tzeentch Daemons", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "tzeentch-daemons" },
      { name: "Slaanesh Daemons", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "slaanesh-daemons" },
      { name: "Genestealer Cults", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "genestealer-cults" },
      { name: "Dark Angels", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "dark-angels" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "jordan-purcell", name: "Jordan Purcell", avatar: "🏰", theme: "imperial-fists",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [
      { name: "Imperial Fists", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "imperial-fists" },
      { name: "Astra Militarum", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "imperial-guard" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "dylan-downs", name: "Dylan Downs", avatar: "🪓", theme: "orks",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [
      { name: "Orks", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "orks" },
      { name: "Salamanders", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "salamanders" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "anderson-cole", name: "Anderson Cole", avatar: "🔥", theme: "khorne-daemons",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [
      { name: "Khorne Daemons", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "khorne-daemons" },
      { name: "World Eaters", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "world-eaters" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "aaron-dewapenaere", name: "Aaron Dewapenaere", avatar: "🐺", theme: "space-wolves",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [
      { name: "Space Wolves", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "space-wolves" },
      { name: "Emperor's Children", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "emperors-children" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "justin-paul", name: "Justin Paul", avatar: "🎯", theme: "tau",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [{ name: "T'au Empire", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "tau" }],
    joinedDate: "2026-03-26",
  },
  {
    id: "jeni-hnatiuk", name: "Jeni Hnatiuk", avatar: "🔔", theme: "sisters-of-battle",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [{ name: "Adepta Sororitas", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "sisters-of-battle" }],
    joinedDate: "2026-03-27",
  },
  {
    id: "ethan-pelley", name: "Ethan Pelley", avatar: "🗡️", theme: "dark-eldar",
    totalWins: 0, totalLosses: 0, totalDraws: 0,
    armies: [{ name: "Drukhari", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "dark-eldar" }],
    joinedDate: "2026-03-27",
  },
];

// ── GAMES ──
const games = [
  { id: 4, player1: "Linden Hnatiuk", player1Army: "Adeptus Custodes", player2: "Jordan Purcell", player2Army: "Imperial Fists", winner: "player1", date: "2026-03-20", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 20, player2Points: 12 },{ turn: 2, player1Points: 38, player2Points: 25 },{ turn: 3, player1Points: 55, player2Points: 40 },{ turn: 4, player1Points: 72, player2Points: 52 },{ turn: 5, player1Points: 90, player2Points: 65 }] },
  { id: 5, player1: "Aidan Mahoney", player1Army: "Thousand Sons", player2: "Linden Hnatiuk", player2Army: "Ultramarines", winner: "player1", date: "2026-03-18", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 18, player2Points: 10 },{ turn: 2, player1Points: 35, player2Points: 22 },{ turn: 3, player1Points: 52, player2Points: 38 },{ turn: 4, player1Points: 70, player2Points: 50 },{ turn: 5, player1Points: 88, player2Points: 63 }] },
  { id: 6, player1: "Linden Hnatiuk", player1Army: "Tyranids", player2: "Dylan Downs", player2Army: "Orks", winner: "draw", date: "2026-03-15", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 14, player2Points: 16 },{ turn: 2, player1Points: 30, player2Points: 32 },{ turn: 3, player1Points: 48, player2Points: 48 },{ turn: 4, player1Points: 62, player2Points: 60 },{ turn: 5, player1Points: 75, player2Points: 75 }] },
  { id: 7, player1: "Anderson Cole", player1Army: "Khorne Daemons", player2: "Linden Hnatiuk", player2Army: "Adeptus Custodes", winner: "player2", date: "2026-03-12", finalTurn: 4, turnScores: [{ turn: 1, player1Points: 22, player2Points: 28 },{ turn: 2, player1Points: 40, player2Points: 50 },{ turn: 3, player1Points: 55, player2Points: 68 },{ turn: 4, player1Points: 68, player2Points: 85 }] },
  { id: 8, player1: "Linden Hnatiuk", player1Army: "Necrons", player2: "Aaron Dewapenaere", player2Army: "Space Wolves", winner: "player1", date: "2026-03-10", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 16, player2Points: 10 },{ turn: 2, player1Points: 34, player2Points: 24 },{ turn: 3, player1Points: 52, player2Points: 38 },{ turn: 4, player1Points: 68, player2Points: 50 },{ turn: 5, player1Points: 84, player2Points: 61 }] },
  { id: 9, player1: "Justin Paul", player1Army: "T'au Empire", player2: "Linden Hnatiuk", player2Army: "Ultramarines", winner: "player1", date: "2026-03-07", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 25, player2Points: 14 },{ turn: 2, player1Points: 44, player2Points: 28 },{ turn: 3, player1Points: 60, player2Points: 42 },{ turn: 4, player1Points: 76, player2Points: 55 },{ turn: 5, player1Points: 92, player2Points: 68 }] },
  { id: 10, player1: "Linden Hnatiuk", player1Army: "Adeptus Custodes", player2: "Aidan Mahoney", player2Army: "Thousand Sons", winner: "player2", date: "2026-03-05", finalTurn: 4, turnScores: [{ turn: 1, player1Points: 10, player2Points: 20 },{ turn: 2, player1Points: 24, player2Points: 42 },{ turn: 3, player1Points: 38, player2Points: 60 },{ turn: 4, player1Points: 50, player2Points: 78 }], surrendered: "player1" },
  { id: 11, player1: "Linden Hnatiuk", player1Army: "Imperial Knights", player2: "Jordan Purcell", player2Army: "Astra Militarum", winner: "player1", date: "2026-03-02", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 18, player2Points: 8 },{ turn: 2, player1Points: 36, player2Points: 20 },{ turn: 3, player1Points: 55, player2Points: 35 },{ turn: 4, player1Points: 72, player2Points: 48 },{ turn: 5, player1Points: 88, player2Points: 58 }] },
  { id: 12, player1: "Dylan Downs", player1Army: "Salamanders", player2: "Linden Hnatiuk", player2Army: "Necrons", winner: "draw", date: "2026-02-28", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 15, player2Points: 15 },{ turn: 2, player1Points: 30, player2Points: 32 },{ turn: 3, player1Points: 46, player2Points: 46 },{ turn: 4, player1Points: 60, player2Points: 62 },{ turn: 5, player1Points: 72, player2Points: 72 }] },
  { id: 13, player1: "Linden Hnatiuk", player1Army: "Tyranids", player2: "Anderson Cole", player2Army: "World Eaters", winner: "player1", date: "2026-02-25", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 22, player2Points: 14 },{ turn: 2, player1Points: 40, player2Points: 30 },{ turn: 3, player1Points: 58, player2Points: 44 },{ turn: 4, player1Points: 74, player2Points: 56 },{ turn: 5, player1Points: 91, player2Points: 68 }] },
  { id: 14, player1: "Jeni Hnatiuk", player1Army: "Adepta Sororitas", player2: "Jaedon Nixon", player2Army: "Black Templars", winner: "player1", date: "2026-03-27", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 20, player2Points: 12 },{ turn: 2, player1Points: 38, player2Points: 26 },{ turn: 3, player1Points: 56, player2Points: 40 },{ turn: 4, player1Points: 74, player2Points: 52 },{ turn: 5, player1Points: 90, player2Points: 64 }] },
  { id: 15, player1: "Jeni Hnatiuk", player1Army: "Adepta Sororitas", player2: "Linden Hnatiuk", player2Army: "Adeptus Custodes", winner: "player1", date: "2026-03-26", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 18, player2Points: 14 },{ turn: 2, player1Points: 36, player2Points: 28 },{ turn: 3, player1Points: 55, player2Points: 42 },{ turn: 4, player1Points: 72, player2Points: 55 },{ turn: 5, player1Points: 88, player2Points: 67 }] },
  { id: 16, player1: "Aidan Mahoney", player1Army: "Thousand Sons", player2: "Jeni Hnatiuk", player2Army: "Adepta Sororitas", winner: "player2", date: "2026-03-25", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 15, player2Points: 20 },{ turn: 2, player1Points: 30, player2Points: 40 },{ turn: 3, player1Points: 44, player2Points: 58 },{ turn: 4, player1Points: 56, player2Points: 74 },{ turn: 5, player1Points: 68, player2Points: 91 }] },
  { id: 17, player1: "Jeni Hnatiuk", player1Army: "Adepta Sororitas", player2: "Jordan Purcell", player2Army: "Imperial Fists", winner: "player1", date: "2026-03-24", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 22, player2Points: 10 },{ turn: 2, player1Points: 42, player2Points: 24 },{ turn: 3, player1Points: 60, player2Points: 38 },{ turn: 4, player1Points: 78, player2Points: 50 },{ turn: 5, player1Points: 94, player2Points: 62 }] },
  { id: 18, player1: "Dylan Downs", player1Army: "Orks", player2: "Jeni Hnatiuk", player2Army: "Adepta Sororitas", winner: "player2", date: "2026-03-23", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 16, player2Points: 22 },{ turn: 2, player1Points: 32, player2Points: 42 },{ turn: 3, player1Points: 46, player2Points: 60 },{ turn: 4, player1Points: 58, player2Points: 76 },{ turn: 5, player1Points: 70, player2Points: 92 }] },
  { id: 19, player1: "Jeni Hnatiuk", player1Army: "Adepta Sororitas", player2: "Anderson Cole", player2Army: "Khorne Daemons", winner: "player1", date: "2026-03-22", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 24, player2Points: 16 },{ turn: 2, player1Points: 44, player2Points: 30 },{ turn: 3, player1Points: 62, player2Points: 44 },{ turn: 4, player1Points: 80, player2Points: 56 },{ turn: 5, player1Points: 95, player2Points: 66 }] },
  { id: 20, player1: "Aaron Dewapenaere", player1Army: "Space Wolves", player2: "Jeni Hnatiuk", player2Army: "Adepta Sororitas", winner: "player2", date: "2026-03-21", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 12, player2Points: 18 },{ turn: 2, player1Points: 26, player2Points: 36 },{ turn: 3, player1Points: 40, player2Points: 54 },{ turn: 4, player1Points: 52, player2Points: 72 },{ turn: 5, player1Points: 64, player2Points: 89 }] },
  { id: 21, player1: "Jeni Hnatiuk", player1Army: "Adepta Sororitas", player2: "Justin Paul", player2Army: "T'au Empire", winner: "player1", date: "2026-03-20", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 20, player2Points: 14 },{ turn: 2, player1Points: 40, player2Points: 28 },{ turn: 3, player1Points: 58, player2Points: 42 },{ turn: 4, player1Points: 76, player2Points: 54 },{ turn: 5, player1Points: 92, player2Points: 65 }] },
  { id: 22, player1: "Linden Hnatiuk", player1Army: "Ultramarines", player2: "Jordan Purcell", player2Army: "Imperial Fists", winner: "player1", date: "2026-02-20", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 18, player2Points: 12 },{ turn: 2, player1Points: 36, player2Points: 26 },{ turn: 3, player1Points: 54, player2Points: 40 },{ turn: 4, player1Points: 70, player2Points: 52 },{ turn: 5, player1Points: 86, player2Points: 63 }] },
  { id: 23, player1: "Anderson Cole", player1Army: "Khorne Daemons", player2: "Linden Hnatiuk", player2Army: "Ultramarines", winner: "player2", date: "2026-02-17", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 14, player2Points: 20 },{ turn: 2, player1Points: 28, player2Points: 38 },{ turn: 3, player1Points: 42, player2Points: 56 },{ turn: 4, player1Points: 54, player2Points: 72 },{ turn: 5, player1Points: 66, player2Points: 88 }] },
  { id: 24, player1: "Linden Hnatiuk", player1Army: "Ultramarines", player2: "Dylan Downs", player2Army: "Orks", winner: "player2", date: "2026-02-14", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 12, player2Points: 18 },{ turn: 2, player1Points: 26, player2Points: 36 },{ turn: 3, player1Points: 40, player2Points: 52 },{ turn: 4, player1Points: 52, player2Points: 68 },{ turn: 5, player1Points: 64, player2Points: 82 }] },
  { id: 25, player1: "Linden Hnatiuk", player1Army: "Ultramarines", player2: "Aidan Mahoney", player2Army: "Thousand Sons", winner: "player1", date: "2026-02-11", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 22, player2Points: 16 },{ turn: 2, player1Points: 42, player2Points: 30 },{ turn: 3, player1Points: 60, player2Points: 44 },{ turn: 4, player1Points: 76, player2Points: 56 },{ turn: 5, player1Points: 90, player2Points: 68 }] },
  { id: 26, player1: "Jaedon Nixon", player1Army: "Black Templars", player2: "Linden Hnatiuk", player2Army: "Ultramarines", winner: "player2", date: "2026-02-08", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 10, player2Points: 16 },{ turn: 2, player1Points: 22, player2Points: 34 },{ turn: 3, player1Points: 36, player2Points: 52 },{ turn: 4, player1Points: 48, player2Points: 70 },{ turn: 5, player1Points: 60, player2Points: 87 }] },
  { id: 27, player1: "Aaron Dewapenaere", player1Army: "Emperor's Children", player2: "Jaedon Nixon", player2Army: "Black Templars", winner: "player1", date: "2026-03-20", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 18, player2Points: 10 },{ turn: 2, player1Points: 36, player2Points: 24 },{ turn: 3, player1Points: 54, player2Points: 38 },{ turn: 4, player1Points: 72, player2Points: 50 },{ turn: 5, player1Points: 88, player2Points: 62 }] },
  { id: 28, player1: "Aaron Dewapenaere", player1Army: "Emperor's Children", player2: "Aidan Mahoney", player2Army: "Thousand Sons", winner: "player2", date: "2026-03-22", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 14, player2Points: 20 },{ turn: 2, player1Points: 28, player2Points: 40 },{ turn: 3, player1Points: 44, player2Points: 58 },{ turn: 4, player1Points: 56, player2Points: 74 },{ turn: 5, player1Points: 68, player2Points: 90 }] },
  { id: 29, player1: "Aaron Dewapenaere", player1Army: "Emperor's Children", player2: "Linden Hnatiuk", player2Army: "Ultramarines", winner: "player1", date: "2026-03-25", finalTurn: 5, turnScores: [{ turn: 1, player1Points: 20, player2Points: 14 },{ turn: 2, player1Points: 40, player2Points: 30 },{ turn: 3, player1Points: 58, player2Points: 46 },{ turn: 4, player1Points: 76, player2Points: 58 },{ turn: 5, player1Points: 92, player2Points: 70 }] },
];

// ── TOURNAMENTS ──
const tournaments = [
  {
    id: "tournament-1",
    name: "Warhammer 40K Crusade I",
    date: "2026-03-27",
    status: "completed",
    totalRounds: 3,
    players: [
      { name: "Linden Hnatiuk", army: "Adeptus Custodes" },
      { name: "Aidan Mahoney", army: "Thousand Sons" },
      { name: "Jordan Purcell", army: "Imperial Fists" },
      { name: "Dylan Downs", army: "Orks" },
      { name: "Anderson Cole", army: "Khorne Daemons" },
      { name: "Jaedon Nixon", army: "Black Templars" },
    ],
    rounds: [
      { round: 1, matches: [
        { id: 1, player1: "Linden Hnatiuk", player1Army: "Adeptus Custodes", player2: "Jaedon Nixon", player2Army: "Black Templars", winner: "Linden Hnatiuk", score1: 82, score2: 65 },
        { id: 2, player1: "Aidan Mahoney", player1Army: "Thousand Sons", player2: "Anderson Cole", player2Army: "Khorne Daemons", winner: "Aidan Mahoney", score1: 91, score2: 74 },
        { id: 3, player1: "Jordan Purcell", player1Army: "Imperial Fists", player2: "Dylan Downs", player2Army: "Orks", winner: "Dylan Downs", score1: 68, score2: 77 },
      ]},
      { round: 2, matches: [
        { id: 4, player1: "Linden Hnatiuk", player1Army: "Adeptus Custodes", player2: "Aidan Mahoney", player2Army: "Thousand Sons", winner: "Aidan Mahoney", score1: 70, score2: 85 },
        { id: 5, player1: "Dylan Downs", player1Army: "Orks", player2: "Jordan Purcell", player2Army: "Imperial Fists", winner: "Jordan Purcell", score1: 62, score2: 79 },
        { id: 6, player1: "Jaedon Nixon", player1Army: "Black Templars", player2: "Anderson Cole", player2Army: "Khorne Daemons", winner: "Jaedon Nixon", score1: 88, score2: 71 },
      ]},
      { round: 3, matches: [
        { id: 7, player1: "Aidan Mahoney", player1Army: "Thousand Sons", player2: "Jordan Purcell", player2Army: "Imperial Fists", winner: "Aidan Mahoney", score1: 93, score2: 72 },
        { id: 8, player1: "Linden Hnatiuk", player1Army: "Adeptus Custodes", player2: "Jaedon Nixon", player2Army: "Black Templars", winner: "Linden Hnatiuk", score1: 84, score2: 67 },
        { id: 9, player1: "Dylan Downs", player1Army: "Orks", player2: "Anderson Cole", player2Army: "Khorne Daemons", winner: "Dylan Downs", score1: 80, score2: 58 },
      ]},
    ],
  },
];

// ── SEED FUNCTION ──
async function seed() {
  console.log("Seeding Firestore...\n");

  for (const player of players) {
    await setDoc(doc(db, "players", player.id), player);
    console.log("  Player:", player.name);
  }

  for (const game of games) {
    await setDoc(doc(db, "games", String(game.id)), game);
    console.log("  Game #" + game.id);
  }

  for (const tournament of tournaments) {
    await setDoc(doc(db, "tournaments", tournament.id), tournament);
    console.log("  Tournament:", tournament.name);
  }

  console.log("\nDone! All data uploaded to Firestore.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding:", err);
  process.exit(1);
});
