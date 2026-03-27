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

export const factionUnits: Record<string, Unit[]> = {
  "Ultramarines": ultramarinesUnits,
};
