/**
 * types/index.ts — Central TypeScript type definitions for the entire app.
 *
 * All interfaces and types used across components, hooks, pages, and utilities
 * are defined here. This is the single source of truth for data shapes.
 *
 * KEY CONCEPTS:
 * - Player: A registered user with armies, stats, and profile info.
 * - Army: A specific faction army owned by a player, with win/loss tracking.
 * - Faction: A union type of all valid Warhammer 40K faction identifiers (slug format).
 * - ThemeColors: Per-faction color palette used for dynamic UI theming.
 */

/**
 * Represents a single army owned by a player.
 * Each player can have multiple armies (one per faction they play).
 * Stats (gamesPlayed, wins, losses, draws) are computed at runtime
 * by usePlayers hook from the games collection — the Firestore doc
 * stores base values that get overwritten by computed data.
 */
export interface Army {
  name: string;           // Display name, e.g. "Ultramarines", "Black Templars"
  gamesPlayed: number;    // Total games played with this army (computed from games)
  wins: number;           // Wins with this army (computed from games)
  losses: number;         // Losses with this army (computed from games)
  draws: number;          // Draws with this army (computed from games)
  faction: Faction;       // Faction identifier slug, e.g. "ultramarines"
}

/**
 * Union type of all supported Warhammer 40K faction identifiers.
 * Used as keys for theme colors, background images, and army association.
 * Format: lowercase-kebab-case slugs.
 */
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
  // Generic fallback
  | "generic";

/**
 * Represents a player in the tracker system.
 * Stored in Firestore collection "players" with doc ID = player.id.
 *
 * NOTE: totalWins, totalLosses, totalDraws, and per-army stats are
 * recomputed at runtime by the usePlayers hook from the games collection.
 * The Firestore document stores base/seed values.
 */
export interface Player {
  id: string;             // Unique slug ID, e.g. "jaedon-nixon" (also Firestore doc ID)
  accountId: number;      // Numeric display ID shown in UI, e.g. #1, #2
  name: string;           // Full display name
  nickname?: string;      // Optional nickname shown in quotes
  avatar: string;         // Emoji avatar, e.g. "⚔️"
  theme: Faction;         // Faction used for UI theming (dynamically set to most-played army)
  totalWins: number;      // Total wins across all armies (computed at runtime)
  totalLosses: number;    // Total losses across all armies (computed at runtime)
  totalDraws: number;     // Total draws across all armies (computed at runtime)
  armies: Army[];         // List of armies this player owns
  joinedDate: string;     // ISO date string, e.g. "2026-03-26"
  bio?: string;           // Optional player biography
}

/**
 * Color palette for per-faction UI theming.
 * Each faction has a unique theme applied to cards, profiles, and accents.
 * Defined in styles/themes.ts and looked up via getThemeColors(faction).
 */
export interface ThemeColors {
  primary: string;        // Main faction color (headings, borders, names)
  secondary: string;      // Darker shade for gradients
  accent: string;         // Highlight/contrast color
  background: string;     // Page-level background tint
  cardBg: string;         // Card background color
  text: string;           // Text color on themed backgrounds
  border: string;         // Border color
  glow: string;           // Glow/shadow color for hover effects
}
