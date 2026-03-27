export interface Army {
  name: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  faction: Faction;
}

export type Faction =
  // Space Marine Chapters
  | "space-marines"
  | "black-templars"
  | "dark-angels"
  | "ultramarines"
  | "imperial-fists"
  | "space-wolves"
  | "iron-hands"
  | "raven-guard"
  | "salamanders"
  | "white-scars"
  | "deathwatch"
  | "grey-knights"
  // Imperium
  | "custodes"
  | "imperial-guard"
  | "adeptus-mechanicus"
  | "sisters-of-battle"
  | "adepta-sororitas"
  | "imperial-knights"
  // Chaos
  | "chaos"
  | "death-guard"
  | "world-eaters"
  | "thousand-sons"
  | "emperors-children"
  | "chaos-knights"
  | "nurgle"
  | "nurgle-daemons"
  | "khorne"
  | "khorne-daemons"
  | "slaanesh"
  | "slaanesh-daemons"
  | "tzeentch"
  | "tzeentch-daemons"
  // Xenos
  | "orks"
  | "necrons"
  | "tyranids"
  | "eldar"
  | "dark-eldar"
  | "tau"
  | "harlequins"
  | "ynnari"
  | "genestealer-cults"
  | "leagues-of-votann"
  // Generic
  | "generic";

export interface Player {
  id: string;
  accountId: number;
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
