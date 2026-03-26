export interface Army {
  name: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  faction: Faction;
}

export type Faction =
  | "space-marines"
  | "orks"
  | "necrons"
  | "tyranids"
  | "chaos"
  | "eldar"
  | "tau"
  | "imperial-guard"
  | "death-guard"
  | "adeptus-mechanicus"
  | "sisters-of-battle"
  | "dark-eldar"
  | "grey-knights"
  | "custodes"
  | "world-eaters"
  | "leagues-of-votann"
  | "thousand-sons"
  | "adepta-sororitas"
  | "generic";

export interface Player {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  theme: Faction;
  totalWins: number;
  totalLosses: number;
  totalDraws: number;
  armies: Army[];
  joinedDate: string;
  bio?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  text: string;
  border: string;
  glow: string;
}
