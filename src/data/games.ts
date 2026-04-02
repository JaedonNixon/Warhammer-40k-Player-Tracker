/**
 * data/games.ts — Game data interfaces and legacy stub exports.
 *
 * IMPORTANT: All game data is stored in Firestore (collection: "games").
 * This file only defines the TypeScript interfaces (TurnScore, Game)
 * used across the app. The empty array exports below are legacy stubs
 * kept for backward compatibility — the real data fetching happens
 * in the useGames hook.
 *
 * Firestore document structure matches the Game interface exactly.
 * Each game doc is keyed by String(game.id).
 */

/**
 * Represents a single turn's score snapshot in a game.
 * Each game has an array of TurnScores tracking cumulative points per turn.
 */
export interface TurnScore {
  turn: number;                // Turn number (1-5 typically)
  player1Points: number;       // Player 1's cumulative victory points at this turn
  player2Points: number;       // Player 2's cumulative victory points at this turn
}

/**
 * Represents a completed (or in-progress) game between two players.
 * Stored in Firestore "games" collection.
 *
 * Player linking uses ID-based references (player1Id, player2Id) that
 * match Player.id values. The player1/player2 display name fields are
 * resolved at runtime by the useGames hook from the players collection.
 */
export interface Game {
  id: number;                                   // Unique numeric game ID
  player1Id: string;                            // Player 1's Player.id (Firestore doc ID)
  player1: string;                              // Player 1's display name (resolved at runtime)
  player1Army: string;                          // Army display name, e.g. "Dark Angels"
  player2Id: string;                            // Player 2's Player.id (Firestore doc ID)
  player2: string;                              // Player 2's display name (resolved at runtime)
  player2Army: string;                          // Army display name, e.g. "Ultramarines"
  winner: "player1" | "player2" | "draw";       // Who won the game
  date: string;                                 // ISO date string, e.g. "2026-03-25"
  finalTurn: number;                            // Last turn played (game may end early on surrender)
  turnScores: TurnScore[];                      // Per-turn scoring breakdown
  surrendered?: "player1" | "player2";          // Which player surrendered (if applicable)
}

// ── Legacy stubs ─────────────────────────────────────────────────
// These are empty — real game data comes from Firestore via useGames hook.
export const games: Game[] = [];
export const getRecentGames = (count: number = 3): Game[] => [];
export const getAllGames = (): Game[] => [];
