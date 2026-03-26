import { Faction } from "../types";

// Map factions to their background images
// Used for player cards and profile backgrounds
export const factionBackgrounds: Partial<Record<Faction, string>> = {
  // Space Marine Chapters
  "black-templars": `${process.env.PUBLIC_URL}/images/factions/black-templars-bg.webp`,
  "dark-angels": `${process.env.PUBLIC_URL}/images/factions/dark-angels-bg.webp`,
  "ultramarines": `${process.env.PUBLIC_URL}/images/factions/ultramarines-bg.jpg`,
  "imperial-fists": `${process.env.PUBLIC_URL}/images/factions/imperial-fists-bg.jpg`,
  "space-wolves": `${process.env.PUBLIC_URL}/images/factions/space-wolves-bg.jpg`,
  "iron-hands": `${process.env.PUBLIC_URL}/images/factions/iron-hands-bg.jpg`,
  "raven-guard": `${process.env.PUBLIC_URL}/images/factions/raven-guard-bg.jpg`,
  "salamanders": `${process.env.PUBLIC_URL}/images/factions/salamanders-bg.jpg`,
  "white-scars": `${process.env.PUBLIC_URL}/images/factions/white-scars-bg.jpg`,
  "deathwatch": `${process.env.PUBLIC_URL}/images/factions/deathwatch-bg.avif`,
  "grey-knights": `${process.env.PUBLIC_URL}/images/factions/grey-knights-bg.jpg`,
  // Imperium
  "custodes": `${process.env.PUBLIC_URL}/images/factions/custodes-bg.jpg`,
  "imperial-guard": `${process.env.PUBLIC_URL}/images/factions/imperial-guard-bg.jpg`,
  "adeptus-mechanicus": `${process.env.PUBLIC_URL}/images/factions/adeptus-mechanicus-bg.jpg`,
  "sisters-of-battle": `${process.env.PUBLIC_URL}/images/factions/adepta-sororitas-bg.jpg`,
  "adepta-sororitas": `${process.env.PUBLIC_URL}/images/factions/adepta-sororitas-bg.jpg`,
  "imperial-knights": `${process.env.PUBLIC_URL}/images/factions/imperial-knights-bg.avif`,
  // Chaos
  "death-guard": `${process.env.PUBLIC_URL}/images/factions/death-guard-bg.jpg`,
  "world-eaters": `${process.env.PUBLIC_URL}/images/factions/world-eaters-bg.jpg`,
  "thousand-sons": `${process.env.PUBLIC_URL}/images/factions/thousand-sons-bg.jpg`,
  "chaos-knights": `${process.env.PUBLIC_URL}/images/factions/chaos-knights-bg.jpg`,
  "nurgle": `${process.env.PUBLIC_URL}/images/factions/nurgle-bg.jpg`,
  "nurgle-daemons": `${process.env.PUBLIC_URL}/images/factions/nurgle-bg.jpg`,
  "khorne": `${process.env.PUBLIC_URL}/images/factions/khorne-bg.jpg`,
  "khorne-daemons": `${process.env.PUBLIC_URL}/images/factions/khorne-daemons-bg.webp`,
  "slaanesh": `${process.env.PUBLIC_URL}/images/factions/slaanesh-bg.jpg`,
  "slaanesh-daemons": `${process.env.PUBLIC_URL}/images/factions/slaanesh-bg.jpg`,
  "tzeentch": `${process.env.PUBLIC_URL}/images/factions/tzeentch-bg.jpg`,
  "tzeentch-daemons": `${process.env.PUBLIC_URL}/images/factions/tzeentch-bg.jpg`,
  // Xenos
  "orks": `${process.env.PUBLIC_URL}/images/factions/orks-bg.jpg`,
  "necrons": `${process.env.PUBLIC_URL}/images/factions/necrons-bg.jpg`,
  "tyranids": `${process.env.PUBLIC_URL}/images/factions/tyranids-bg.jpg`,
  "tau": `${process.env.PUBLIC_URL}/images/factions/tau-bg.jpg`,
  "dark-eldar": `${process.env.PUBLIC_URL}/images/factions/dark-eldar-bg.jpg`,
  "harlequins": `${process.env.PUBLIC_URL}/images/factions/harlequins-bg.jpg`,
  "ynnari": `${process.env.PUBLIC_URL}/images/factions/ynnari-bg.webp`,
  "genestealer-cults": `${process.env.PUBLIC_URL}/images/factions/genestealer-cults-bg.avif`,
};

// Get the background image for a player's favorite (most-played) army
export function getFavoriteArmyBackground(armies: { gamesPlayed: number; faction: Faction }[]): string | null {
  if (armies.length === 0) return null;
  const topArmy = [...armies].sort((a, b) => b.gamesPlayed - a.gamesPlayed)[0];
  return factionBackgrounds[topArmy.faction] || null;
}
