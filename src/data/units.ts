export interface WeaponProfile {
  name: string;
  range: string;       // e.g. "24\"" or "Melee"
  attacks: string;
  skill: string;       // BS or WS, e.g. "3+"
  strength: number;
  ap: number;
  damage: string;
  keywords?: string[];
}

export interface UnitProfile {
  movement: string;
  toughness: number;
  save: string;
  wounds: number;
  leadership: string;
  oc: number;
}

export interface Unit {
  id: string;
  name: string;
  faction: string;
  keywords: string[];
  profile: UnitProfile;
  rangedWeapons: WeaponProfile[];
  meleeWeapons: WeaponProfile[];
  abilities: string[];
  points: { models: number; cost: number }[];
  modelCount: { min: number; max: number };
}

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
      "Battleline — this unit counts as having the Objective Control (OC) characteristic of its models increased by 1 while it is within range of an objective marker you control.",
    ],
    points: [
      { models: 5, cost: 80 },
      { models: 10, cost: 160 },
    ],
    modelCount: { min: 5, max: 10 },
  },
];

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

export const factionUnits: Record<string, Unit[]> = {
  "Ultramarines": ultramarinesUnits,
  "Emperor's Children": emperorsChildrenUnits,
};

export const alliedUnits: Record<string, Unit[]> = {
  "Ultramarines": imperiumAlliedUnits,
  "Emperor's Children": chaosKnightsAlliedUnits,
};

export const alliedFactionNames: Record<string, string> = {
  "Ultramarines": "Imperium Allies",
  "Emperor's Children": "Chaos Knights Allies",
};
