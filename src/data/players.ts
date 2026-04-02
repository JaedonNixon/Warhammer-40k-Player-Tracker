/**
 * data/players.ts — Seed/reference data for initial player roster.
 *
 * This file contains the original player data used to seed Firestore.
 * The live app reads players from Firestore (collection: "players") via
 * the usePlayers hook — this file is kept as a reference and for use
 * by the seed scripts (scripts/seedFirestore.mjs).
 *
 * Each player object matches the Player interface from types/index.ts.
 * New players are added via the AddPlayerModal component (admin only),
 * which writes directly to Firestore.
 */
import { Player } from "../types";

/** Seed data — original player roster used for initial Firestore upload. */
export const players: Player[] = [
  {
    id: "jaedon-nixon",
    accountId: 1,
    name: "Jaedon Nixon",
    avatar: "⚔️",
    theme: "black-templars",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "Black Templars", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "black-templars" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "linden-hnatiuk",
    accountId: 2,
    name: "Linden Hnatiuk",
    avatar: "🛡️",
    theme: "ultramarines",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
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
    id: "aidan-mahoney",
    accountId: 3,
    name: "Aidan Mahoney",
    avatar: "🗡️",
    theme: "thousand-sons",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
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
    id: "jordan-purcell",
    accountId: 4,
    name: "Jordan Purcell",
    avatar: "🏰",
    theme: "imperial-fists",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "Imperial Fists", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "imperial-fists" },
      { name: "Astra Militarum", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "imperial-guard" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "dylan-downs",
    accountId: 5,
    name: "Dylan Downs",
    avatar: "🪓",
    theme: "orks",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "Orks", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "orks" },
      { name: "Salamanders", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "salamanders" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "anderson-cole",
    accountId: 6,
    name: "Anderson Cole",
    avatar: "🔥",
    theme: "khorne-daemons",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "Khorne Daemons", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "khorne-daemons" },
      { name: "World Eaters", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "world-eaters" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "aaron-dewapenaere",
    accountId: 7,
    name: "Aaron Dewapenaere",
    avatar: "🐺",
    theme: "space-wolves",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "Space Wolves", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "space-wolves" },
      { name: "Emperor's Children", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "emperors-children" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "justin-paul",
    accountId: 8,
    name: "Justin Paul",
    avatar: "🎯",
    theme: "tau",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "T'au Empire", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "tau" },
    ],
    joinedDate: "2026-03-26",
  },
  {
    id: "jeni-hnatiuk",
    accountId: 9,
    name: "Jeni Hnatiuk",
    avatar: "🔔",
    theme: "sisters-of-battle",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "Adepta Sororitas", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "sisters-of-battle" },
    ],
    joinedDate: "2026-03-27",
  },
  {
    id: "ethan-pelley",
    accountId: 10,
    name: "Ethan Pelley",
    avatar: "🗡️",
    theme: "dark-eldar",
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    armies: [
      { name: "Drukhari", gamesPlayed: 0, wins: 0, losses: 0, draws: 0, faction: "dark-eldar" },
    ],
    joinedDate: "2026-03-27",
  },
];
