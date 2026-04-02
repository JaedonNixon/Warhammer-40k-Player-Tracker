# data/

Static data definitions, seed data, and TypeScript interfaces for game entities.

## Important Note
**Most live data comes from Firestore, not these files.** These files serve as:
1. TypeScript interface definitions (used everywhere via imports)
2. Seed/reference data for initial Firestore population
3. Static unit datasheets (units.ts is the only file with data actively used at runtime)

## Files

### `games.ts`
- **Interfaces:** `TurnScore`, `Game`
- **Purpose:** Defines the shape of game records. Games are stored in Firestore (`games` collection) and fetched via `useGames` hook.
- **Legacy exports:** Empty `games[]`, `getRecentGames()`, `getAllGames()` stubs — real data comes from Firestore.

### `players.ts`
- **Interface:** Uses `Player` from `types/index.ts`
- **Purpose:** Seed data array of the original 10 players. Used by seed scripts to populate Firestore. Not read at runtime — live player data comes from Firestore via `usePlayers` hook.

### `tournaments.ts`
- **Interfaces:** `SwissMatch`, `SwissRound`, `SwissStanding`, `Tournament`
- **Key function:** `getStandings(tournament)` — computes final standings from round results. Sorts by match points (W×3 + D×1) then point differential.
- **Seed data:** One completed tournament ("Warhammer 40K Crusade I") with 6 players and 3 rounds.

### `units.ts`
- **Interfaces:** `WeaponProfile`, `UnitProfile`, `Unit`
- **Purpose:** Static unit datasheets used by Army Builder and Factions pages. **This IS actively read at runtime** (not from Firestore).
- **Current factions:** Ultramarines (2 units), Emperor's Children (1 unit)
- **Allied units:** Imperium (Armiger Warglaive), Chaos Knights (War Dog Stalker)
- **Lookup maps:**
  - `factionUnits` — faction name → unit array
  - `alliedUnits` — faction name → allied unit array
  - `alliedFactionNames` — faction name → allied section label

## Firestore Collections
| Collection | Source of truth | Seed file |
|------------|----------------|-----------|
| `players` | Firestore | `players.ts` |
| `games` | Firestore | (added via app) |
| `tournaments` | Firestore | `tournaments.ts` |
| `admins` | Firestore | (managed via Admin Panel) |
