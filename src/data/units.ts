/**
 * data/units.ts — Unit datasheet definitions for the Army Builder and Factions pages.
 *
 * Contains all unit profiles, weapons, abilities, and point costs used by:
 * - ArmyBuilderPage: Browsing unit catalog, adding to army lists
 * - FactionsPage: Listing units per faction
 * - UnitDetailPage: Full datasheet view for a single unit
 *
 * DATA IS STATIC — these are not fetched from Firestore.
 * New factions/units are added by extending the arrays and maps below.
 *
 * To add a new faction:
 * 1. Create a `<factionName>Units: Unit[]` array with unit definitions
 * 2. Add it to the `factionUnits` map
 * 3. Optionally add allied units to `alliedUnits` and `alliedFactionNames`
 */

/** A weapon profile (ranged or melee) on a unit datasheet. */
export interface WeaponProfile {
  name: string;          // Weapon name, e.g. "Bolt rifle"
  range: string;         // Range value, e.g. "24\"" or "Melee"
  attacks: string;       // Number of attacks, e.g. "2" or "D6"
  skill: string;         // BS or WS, e.g. "3+" or "N/A" for auto-hitting
  strength: number;      // Strength value
  ap: number;            // Armour Penetration modifier (negative = better)
  damage: string;        // Damage per attack, e.g. "1" or "D6"
  keywords?: string[];   // Weapon special rules, e.g. ["Melta 2", "Heavy"]
}

/** Core stat line for a unit (movement, toughness, save, wounds, leadership, OC). */
export interface UnitProfile {
  movement: string;      // Movement distance, e.g. "6\""
  toughness: number;     // Toughness value
  save: string;          // Armour save, e.g. "3+"
  wounds: number;        // Wounds per model
  leadership: string;    // Leadership value, e.g. "6+"
  oc: number;            // Objective Control value
}

/**
 * A complete unit datasheet definition.
 * Keywords drive categorization in the Army Builder:
 * - "Character" → Characters section
 * - "Battleline" → Battleline section
 * - "Epic Hero" → Unique restriction (only one copy per army)
 * - "Dedicated Transport" → Transports section
 *
 * The `points` array supports multi-size units (e.g. 5 models = 80pts, 10 = 160pts).
 */
export interface Unit {
  id: string;                                    // Unique slug ID, e.g. "intercessor-squad"
  name: string;                                  // Display name
  faction: string;                               // Faction display name, e.g. "Ultramarines"
  keywords: string[];                            // All unit keywords (drive categorization + rules)
  profile: UnitProfile;                          // Core stat line
  rangedWeapons: WeaponProfile[];                // Ranged weapon options
  meleeWeapons: WeaponProfile[];                 // Melee weapon options
  abilities: string[];                           // Special abilities text
  points: { models: number; cost: number }[];    // Point costs per model count option
  modelCount: { min: number; max: number };      // Valid model count range
}

// ══════════════════════════════════════════════════════════════
// FACTION UNIT ARRAYS — One array per faction with unit datasheets
// ══════════════════════════════════════════════════════════════

/** Ultramarines faction units (Space Marines chapter). */
export const ultramarinesUnits: Unit[] = [
  {
    id: "intercessor-squad",
    name: "Intercessor Squad",
    faction: "Ultramarines",
    keywords: ["Infantry", "Battleline", "Grenades", "Imperium", "Tacticus", "Intercessor Squad"],
    profile: {
      movement: "6\"",
      toughness: 4,
      save: "3+",
      wounds: 2,
      leadership: "6+",
      oc: 2,
    },
    rangedWeapons: [
      {
        name: "Bolt pistol",
        range: "12\"",
        attacks: "1",
        skill: "3+",
        strength: 4,
        ap: 0,
        damage: "1",
        keywords: ["Pistol"],
      },
      {
        name: "Bolt rifle",
        range: "24\"",
        attacks: "2",
        skill: "3+",
        strength: 4,
        ap: -1,
        damage: "1",
        keywords: ["Assault", "Heavy"],
      },
      {
        name: "Auto bolt rifle",
        range: "24\"",
        attacks: "3",
        skill: "3+",
        strength: 4,
        ap: 0,
        damage: "1",
        keywords: ["Assault"],
      },
      {
        name: "Stalker bolt rifle",
        range: "36\"",
        attacks: "1",
        skill: "3+",
        strength: 4,
        ap: -2,
        damage: "2",
        keywords: ["Heavy"],
      },
    ],
    meleeWeapons: [
      {
        name: "Close combat weapon",
        range: "Melee",
        attacks: "3",
        skill: "3+",
        strength: 4,
        ap: 0,
        damage: "1",
      },
      {
        name: "Astartes chainsword",
        range: "Melee",
        attacks: "4",
        skill: "3+",
        strength: 4,
        ap: -1,
        damage: "1",
      },
      {
        name: "Power weapon",
        range: "Melee",
        attacks: "3",
        skill: "3+",
        strength: 5,
        ap: -2,
        damage: "1",
      },
      {
        name: "Power fist",
        range: "Melee",
        attacks: "2",
        skill: "3+",
        strength: 8,
        ap: -2,
        damage: "2",
      },
      {
        name: "Thunder hammer",
        range: "Melee",
        attacks: "2",
        skill: "4+",
        strength: 8,
        ap: -2,
        damage: "2",
        keywords: ["Devastating Wounds"],
      },
    ],
    abilities: [
      "Oath of Moment (Faction)",
      "Battleline — Add 1 to the OC characteristic of models in this unit while it is within range of an objective marker you control.",
    ],
    points: [
      { models: 5, cost: 80 },
      { models: 10, cost: 160 },
    ],
    modelCount: { min: 5, max: 10 },
  },
  {
    id: "roboute-guilliman",
    name: "Roboute Guilliman",
    faction: "Ultramarines",
    keywords: ["Monster", "Character", "Epic Hero", "Unique", "Imperium", "Primarch", "Roboute Guilliman"],
    profile: {
      movement: "8\"",
      toughness: 6,
      save: "2+",
      wounds: 10,
      leadership: "5+",
      oc: 4,
    },
    rangedWeapons: [
      {
        name: "Hand of Dominion (shooting)",
        range: "24\"",
        attacks: "6",
        skill: "2+",
        strength: 6,
        ap: -1,
        damage: "2",
        keywords: ["Rapid Fire 3"],
      },
    ],
    meleeWeapons: [
      {
        name: "Emperor's Sword — strike",
        range: "Melee",
        attacks: "6",
        skill: "2+",
        strength: 8,
        ap: -3,
        damage: "2",
        keywords: ["Devastating Wounds"],
      },
      {
        name: "Emperor's Sword — sweep",
        range: "Melee",
        attacks: "14",
        skill: "2+",
        strength: 6,
        ap: -2,
        damage: "1",
      },
      {
        name: "Hand of Dominion (melee)",
        range: "Melee",
        attacks: "6",
        skill: "2+",
        strength: 10,
        ap: -3,
        damage: "3",
      },
    ],
    abilities: [
      "Oath of Moment (Faction)",
      "Author of the Codex: At the start of your Command phase, you gain 1CP.",
      "Supreme Strategist: Once per phase, you can re-roll one Hit roll, one Wound roll, one Damage roll, or one saving throw made for a friendly Adeptus Astartes model.",
      "Armour of Fate: The first time this model is destroyed, roll one D6 at the end of the phase. On a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy models, with 6 wounds remaining.",
      "Invulnerable Save: 4+",
    ],
    points: [
      { models: 1, cost: 350 },
    ],
    modelCount: { min: 1, max: 1 },
  },
];

// ══════════════════════════════════════════════════════════════
// ALLIED UNIT ARRAYS — Units from allied factions that can be taken
// ══════════════════════════════════════════════════════════════

/** Imperial Knights allied units available to Imperium factions. */
export const imperiumAlliedUnits: Unit[] = [
  {
    id: "armiger-warglaive",
    name: "Armiger Warglaive",
    faction: "Imperial Knights",
    keywords: ["Vehicle", "Walker", "Battleline", "Imperium", "Armiger", "Armiger Warglaive"],
    profile: {
      movement: "12\"",
      toughness: 8,
      save: "3+",
      wounds: 12,
      leadership: "7+",
      oc: 8,
    },
    rangedWeapons: [
      {
        name: "Meltagun",
        range: "12\"",
        attacks: "1",
        skill: "3+",
        strength: 9,
        ap: -4,
        damage: "D6",
        keywords: ["Melta 2"],
      },
      {
        name: "Thermal spear",
        range: "24\"",
        attacks: "2",
        skill: "3+",
        strength: 12,
        ap: -4,
        damage: "D6",
        keywords: ["Melta 4"],
      },
    ],
    meleeWeapons: [
      {
        name: "Reaper chainsword — strike",
        range: "Melee",
        attacks: "4",
        skill: "3+",
        strength: 10,
        ap: -3,
        damage: "3",
      },
      {
        name: "Reaper chainsword — sweep",
        range: "Melee",
        attacks: "8",
        skill: "3+",
        strength: 8,
        ap: -2,
        damage: "1",
      },
    ],
    abilities: [
      "Bondsman: While a model with this ability is within 12\" of a friendly Questoris or Dominus model, each time this model makes an attack, you can re-roll the Hit roll of 1.",
      "Impetuous Glory: Each time this model makes a Charge move, until the end of the turn, melee weapons equipped by this model have the [LANCE] ability.",
    ],
    points: [
      { models: 1, cost: 150 },
      { models: 2, cost: 300 },
    ],
    modelCount: { min: 1, max: 2 },
  },
];

/** Emperor's Children faction units (Chaos Space Marines). */
export const emperorsChildrenUnits: Unit[] = [
  {
    id: "noise-marines",
    name: "Noise Marines",
    faction: "Emperor's Children",
    keywords: ["Infantry", "Chaos", "Slaanesh", "Noise Marines"],
    profile: {
      movement: "6\"",
      toughness: 4,
      save: "3+",
      wounds: 2,
      leadership: "6+",
      oc: 2,
    },
    rangedWeapons: [
      {
        name: "Bolt pistol",
        range: "12\"",
        attacks: "1",
        skill: "3+",
        strength: 4,
        ap: 0,
        damage: "1",
        keywords: ["Pistol"],
      },
      {
        name: "Boltgun",
        range: "24\"",
        attacks: "2",
        skill: "3+",
        strength: 4,
        ap: 0,
        damage: "1",
      },
      {
        name: "Sonic blaster",
        range: "24\"",
        attacks: "3",
        skill: "3+",
        strength: 5,
        ap: 0,
        damage: "1",
        keywords: ["Assault"],
      },
      {
        name: "Blastmaster — single frequency",
        range: "48\"",
        attacks: "3",
        skill: "3+",
        strength: 9,
        ap: -2,
        damage: "3",
        keywords: ["Heavy"],
      },
      {
        name: "Blastmaster — varied frequency",
        range: "36\"",
        attacks: "6",
        skill: "3+",
        strength: 6,
        ap: -1,
        damage: "1",
        keywords: ["Assault"],
      },
      {
        name: "Doom siren",
        range: "12\"",
        attacks: "D6",
        skill: "N/A",
        strength: 6,
        ap: -1,
        damage: "1",
        keywords: ["Torrent"],
      },
    ],
    meleeWeapons: [
      {
        name: "Close combat weapon",
        range: "Melee",
        attacks: "3",
        skill: "3+",
        strength: 4,
        ap: 0,
        damage: "1",
      },
      {
        name: "Astartes chainsword",
        range: "Melee",
        attacks: "4",
        skill: "3+",
        strength: 4,
        ap: -1,
        damage: "1",
      },
    ],
    abilities: [
      "Dark Pacts (Faction)",
      "Reckless Abandon: Each time this unit makes a Normal move, it can move an additional 3\" if it moves toward the closest enemy unit.",
    ],
    points: [
      { models: 5, cost: 75 },
      { models: 10, cost: 150 },
    ],
    modelCount: { min: 5, max: 10 },
  },
];

/** Chaos Knights allied units available to Chaos factions. */
export const chaosKnightsAlliedUnits: Unit[] = [
  {
    id: "war-dog-stalker",
    name: "War Dog Stalker",
    faction: "Chaos Knights",
    keywords: ["Vehicle", "Walker", "Battleline", "Chaos", "War Dog", "War Dog Stalker"],
    profile: {
      movement: "12\"",
      toughness: 8,
      save: "3+",
      wounds: 12,
      leadership: "7+",
      oc: 8,
    },
    rangedWeapons: [
      {
        name: "Daemonbreath spear",
        range: "24\"",
        attacks: "2",
        skill: "3+",
        strength: 12,
        ap: -4,
        damage: "D6",
        keywords: ["Melta 4"],
      },
      {
        name: "Avenger chaincannon",
        range: "24\"",
        attacks: "12",
        skill: "3+",
        strength: 6,
        ap: -1,
        damage: "1",
      },
    ],
    meleeWeapons: [
      {
        name: "Slaughterclaw — strike",
        range: "Melee",
        attacks: "4",
        skill: "3+",
        strength: 10,
        ap: -3,
        damage: "3",
      },
      {
        name: "Slaughterclaw — sweep",
        range: "Melee",
        attacks: "8",
        skill: "3+",
        strength: 8,
        ap: -2,
        damage: "1",
      },
    ],
    abilities: [
      "Stalker: Each time this model makes a ranged attack that targets a unit that is Below Half-strength, add 1 to the Hit roll.",
      "Harbinger of Dread (Aura): While an enemy unit is within 12\" of this model, each time that unit takes a Battle-shock test, subtract 1 from the result.",
    ],
    points: [
      { models: 1, cost: 150 },
      { models: 2, cost: 300 },
    ],
    modelCount: { min: 1, max: 2 },
  },
];

// ══════════════════════════════════════════════════════════════
// FACTION LOOKUP MAPS — Used by ArmyBuilderPage and FactionsPage
// ══════════════════════════════════════════════════════════════

/** Maps faction display names to their available unit arrays. */
export const factionUnits: Record<string, Unit[]> = {
  "Ultramarines": ultramarinesUnits,
  "Emperor's Children": emperorsChildrenUnits,
};

/** Maps faction display names to their available allied unit arrays. */
export const alliedUnits: Record<string, Unit[]> = {
  "Ultramarines": imperiumAlliedUnits,
  "Emperor's Children": chaosKnightsAlliedUnits,
};

/** Maps faction display names to the label shown for their allied section. */
export const alliedFactionNames: Record<string, string> = {
  "Ultramarines": "Imperium Allies",
  "Emperor's Children": "Chaos Knights Allies",
};
