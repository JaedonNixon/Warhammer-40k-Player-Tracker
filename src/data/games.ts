export interface TurnScore {
  turn: number;
  player1Points: number;
  player2Points: number;
}

export interface Game {
  id: number;
  player1: string;
  player1Army: string;
  player2: string;
  player2Army: string;
  winner: "player1" | "player2" | "draw";
  date: string;
  finalTurn: number;
  turnScores: TurnScore[];
  surrendered?: "player1" | "player2"; // Who surrendered (if applicable)
}

// Placeholder games data - replace with real game records
export const games: Game[] = [
  {
    id: 1,
    player1: "Player 1",
    player1Army: "Army Name",
    player2: "Player 2",
    player2Army: "Army Name",
    winner: "player1",
    date: "2026-03-26",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 15, player2Points: 10 },
      { turn: 2, player1Points: 32, player2Points: 28 },
      { turn: 3, player1Points: 48, player2Points: 42 },
      { turn: 4, player1Points: 65, player2Points: 55 },
      { turn: 5, player1Points: 85, player2Points: 72 },
    ],
  },
  {
    id: 2,
    player1: "Player 1",
    player1Army: "Army Name",
    player2: "Player 2",
    player2Army: "Army Name",
    winner: "player2",
    date: "2026-03-25",
    finalTurn: 4,
    turnScores: [
      { turn: 1, player1Points: 8, player2Points: 18 },
      { turn: 2, player1Points: 22, player2Points: 38 },
      { turn: 3, player1Points: 35, player2Points: 55 },
      { turn: 4, player1Points: 48, player2Points: 75 },
    ],
    surrendered: "player1", // Player 1 surrendered on turn 4
  },
  {
    id: 3,
    player1: "Player 1",
    player1Army: "Army Name",
    player2: "Player 2",
    player2Army: "Army Name",
    winner: "draw",
    date: "2026-03-24",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 12, player2Points: 12 },
      { turn: 2, player1Points: 28, player2Points: 30 },
      { turn: 3, player1Points: 45, player2Points: 44 },
      { turn: 4, player1Points: 60, player2Points: 58 },
      { turn: 5, player1Points: 70, player2Points: 70 },
    ],
  },
];

export const getRecentGames = (count: number = 3): Game[] => {
  return [...games]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getAllGames = (): Game[] => {
  return [...games].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
