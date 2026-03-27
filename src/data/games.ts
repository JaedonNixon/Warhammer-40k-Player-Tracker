export interface TurnScore {
  turn: number;
  player1Points: number;
  player2Points: number;
}

export interface Game {
  id: number;
  player1Id: string;
  player1: string;
  player1Army: string;
  player2Id: string;
  player2: string;
  player2Army: string;
  winner: "player1" | "player2" | "draw";
  date: string;
  finalTurn: number;
  turnScores: TurnScore[];
  surrendered?: "player1" | "player2"; // Who surrendered (if applicable)
}

// Games data is now stored in Firestore. This file only exports the Game interface.
export const games: Game[] = [];

export const getRecentGames = (count: number = 3): Game[] => {
  return [];
};

export const getAllGames = (): Game[] => {
  return [];
};
