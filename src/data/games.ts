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
    id: 4,
    player1: "Linden Hnatiuk",
    player1Army: "Adeptus Custodes",
    player2: "Jordan Purcell",
    player2Army: "Imperial Fists",
    winner: "player1",
    date: "2026-03-20",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 20, player2Points: 12 },
      { turn: 2, player1Points: 38, player2Points: 25 },
      { turn: 3, player1Points: 55, player2Points: 40 },
      { turn: 4, player1Points: 72, player2Points: 52 },
      { turn: 5, player1Points: 90, player2Points: 65 },
    ],
  },
  {
    id: 5,
    player1: "Aidan Mahoney",
    player1Army: "Thousand Sons",
    player2: "Linden Hnatiuk",
    player2Army: "Ultramarines",
    winner: "player1",
    date: "2026-03-18",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 18, player2Points: 10 },
      { turn: 2, player1Points: 35, player2Points: 22 },
      { turn: 3, player1Points: 52, player2Points: 38 },
      { turn: 4, player1Points: 70, player2Points: 50 },
      { turn: 5, player1Points: 88, player2Points: 63 },
    ],
  },
  {
    id: 6,
    player1: "Linden Hnatiuk",
    player1Army: "Tyranids",
    player2: "Dylan Downs",
    player2Army: "Orks",
    winner: "draw",
    date: "2026-03-15",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 14, player2Points: 16 },
      { turn: 2, player1Points: 30, player2Points: 32 },
      { turn: 3, player1Points: 48, player2Points: 48 },
      { turn: 4, player1Points: 62, player2Points: 60 },
      { turn: 5, player1Points: 75, player2Points: 75 },
    ],
  },
  {
    id: 7,
    player1: "Anderson Cole",
    player1Army: "Khorne Daemons",
    player2: "Linden Hnatiuk",
    player2Army: "Adeptus Custodes",
    winner: "player2",
    date: "2026-03-12",
    finalTurn: 4,
    turnScores: [
      { turn: 1, player1Points: 22, player2Points: 28 },
      { turn: 2, player1Points: 40, player2Points: 50 },
      { turn: 3, player1Points: 55, player2Points: 68 },
      { turn: 4, player1Points: 68, player2Points: 85 },
    ],
  },
  {
    id: 8,
    player1: "Linden Hnatiuk",
    player1Army: "Necrons",
    player2: "Aaron Dewapenaere",
    player2Army: "Space Wolves",
    winner: "player1",
    date: "2026-03-10",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 16, player2Points: 10 },
      { turn: 2, player1Points: 34, player2Points: 24 },
      { turn: 3, player1Points: 52, player2Points: 38 },
      { turn: 4, player1Points: 68, player2Points: 50 },
      { turn: 5, player1Points: 84, player2Points: 61 },
    ],
  },
  {
    id: 9,
    player1: "Justin Paul",
    player1Army: "T'au Empire",
    player2: "Linden Hnatiuk",
    player2Army: "Ultramarines",
    winner: "player1",
    date: "2026-03-07",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 25, player2Points: 14 },
      { turn: 2, player1Points: 44, player2Points: 28 },
      { turn: 3, player1Points: 60, player2Points: 42 },
      { turn: 4, player1Points: 76, player2Points: 55 },
      { turn: 5, player1Points: 92, player2Points: 68 },
    ],
  },
  {
    id: 10,
    player1: "Linden Hnatiuk",
    player1Army: "Adeptus Custodes",
    player2: "Aidan Mahoney",
    player2Army: "Thousand Sons",
    winner: "player2",
    date: "2026-03-05",
    finalTurn: 4,
    turnScores: [
      { turn: 1, player1Points: 10, player2Points: 20 },
      { turn: 2, player1Points: 24, player2Points: 42 },
      { turn: 3, player1Points: 38, player2Points: 60 },
      { turn: 4, player1Points: 50, player2Points: 78 },
    ],
    surrendered: "player1",
  },
  {
    id: 11,
    player1: "Linden Hnatiuk",
    player1Army: "Imperial Knights",
    player2: "Jordan Purcell",
    player2Army: "Astra Militarum",
    winner: "player1",
    date: "2026-03-02",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 18, player2Points: 8 },
      { turn: 2, player1Points: 36, player2Points: 20 },
      { turn: 3, player1Points: 55, player2Points: 35 },
      { turn: 4, player1Points: 72, player2Points: 48 },
      { turn: 5, player1Points: 88, player2Points: 58 },
    ],
  },
  {
    id: 12,
    player1: "Dylan Downs",
    player1Army: "Salamanders",
    player2: "Linden Hnatiuk",
    player2Army: "Necrons",
    winner: "draw",
    date: "2026-02-28",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 15, player2Points: 15 },
      { turn: 2, player1Points: 30, player2Points: 32 },
      { turn: 3, player1Points: 46, player2Points: 46 },
      { turn: 4, player1Points: 60, player2Points: 62 },
      { turn: 5, player1Points: 72, player2Points: 72 },
    ],
  },
  {
    id: 13,
    player1: "Linden Hnatiuk",
    player1Army: "Tyranids",
    player2: "Anderson Cole",
    player2Army: "World Eaters",
    winner: "player1",
    date: "2026-02-25",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 22, player2Points: 14 },
      { turn: 2, player1Points: 40, player2Points: 30 },
      { turn: 3, player1Points: 58, player2Points: 44 },
      { turn: 4, player1Points: 74, player2Points: 56 },
      { turn: 5, player1Points: 91, player2Points: 68 },
    ],
  },
  {
    id: 14,
    player1: "Jeni Hnatiuk",
    player1Army: "Adepta Sororitas",
    player2: "Jaedon Nixon",
    player2Army: "Black Templars",
    winner: "player1",
    date: "2026-03-27",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 20, player2Points: 12 },
      { turn: 2, player1Points: 38, player2Points: 26 },
      { turn: 3, player1Points: 56, player2Points: 40 },
      { turn: 4, player1Points: 74, player2Points: 52 },
      { turn: 5, player1Points: 90, player2Points: 64 },
    ],
  },
  {
    id: 15,
    player1: "Jeni Hnatiuk",
    player1Army: "Adepta Sororitas",
    player2: "Linden Hnatiuk",
    player2Army: "Adeptus Custodes",
    winner: "player1",
    date: "2026-03-26",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 18, player2Points: 14 },
      { turn: 2, player1Points: 36, player2Points: 28 },
      { turn: 3, player1Points: 55, player2Points: 42 },
      { turn: 4, player1Points: 72, player2Points: 55 },
      { turn: 5, player1Points: 88, player2Points: 67 },
    ],
  },
  {
    id: 16,
    player1: "Aidan Mahoney",
    player1Army: "Thousand Sons",
    player2: "Jeni Hnatiuk",
    player2Army: "Adepta Sororitas",
    winner: "player2",
    date: "2026-03-25",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 15, player2Points: 20 },
      { turn: 2, player1Points: 30, player2Points: 40 },
      { turn: 3, player1Points: 44, player2Points: 58 },
      { turn: 4, player1Points: 56, player2Points: 74 },
      { turn: 5, player1Points: 68, player2Points: 91 },
    ],
  },
  {
    id: 17,
    player1: "Jeni Hnatiuk",
    player1Army: "Adepta Sororitas",
    player2: "Jordan Purcell",
    player2Army: "Imperial Fists",
    winner: "player1",
    date: "2026-03-24",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 22, player2Points: 10 },
      { turn: 2, player1Points: 42, player2Points: 24 },
      { turn: 3, player1Points: 60, player2Points: 38 },
      { turn: 4, player1Points: 78, player2Points: 50 },
      { turn: 5, player1Points: 94, player2Points: 62 },
    ],
  },
  {
    id: 18,
    player1: "Dylan Downs",
    player1Army: "Orks",
    player2: "Jeni Hnatiuk",
    player2Army: "Adepta Sororitas",
    winner: "player2",
    date: "2026-03-23",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 16, player2Points: 22 },
      { turn: 2, player1Points: 32, player2Points: 42 },
      { turn: 3, player1Points: 46, player2Points: 60 },
      { turn: 4, player1Points: 58, player2Points: 76 },
      { turn: 5, player1Points: 70, player2Points: 92 },
    ],
  },
  {
    id: 19,
    player1: "Jeni Hnatiuk",
    player1Army: "Adepta Sororitas",
    player2: "Anderson Cole",
    player2Army: "Khorne Daemons",
    winner: "player1",
    date: "2026-03-22",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 24, player2Points: 16 },
      { turn: 2, player1Points: 44, player2Points: 30 },
      { turn: 3, player1Points: 62, player2Points: 44 },
      { turn: 4, player1Points: 80, player2Points: 56 },
      { turn: 5, player1Points: 95, player2Points: 66 },
    ],
  },
  {
    id: 20,
    player1: "Aaron Dewapenaere",
    player1Army: "Space Wolves",
    player2: "Jeni Hnatiuk",
    player2Army: "Adepta Sororitas",
    winner: "player2",
    date: "2026-03-21",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 12, player2Points: 18 },
      { turn: 2, player1Points: 26, player2Points: 36 },
      { turn: 3, player1Points: 40, player2Points: 54 },
      { turn: 4, player1Points: 52, player2Points: 72 },
      { turn: 5, player1Points: 64, player2Points: 89 },
    ],
  },
  {
    id: 21,
    player1: "Jeni Hnatiuk",
    player1Army: "Adepta Sororitas",
    player2: "Justin Paul",
    player2Army: "T'au Empire",
    winner: "player1",
    date: "2026-03-20",
    finalTurn: 5,
    turnScores: [
      { turn: 1, player1Points: 20, player2Points: 14 },
      { turn: 2, player1Points: 40, player2Points: 28 },
      { turn: 3, player1Points: 58, player2Points: 42 },
      { turn: 4, player1Points: 76, player2Points: 54 },
      { turn: 5, player1Points: 92, player2Points: 65 },
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
