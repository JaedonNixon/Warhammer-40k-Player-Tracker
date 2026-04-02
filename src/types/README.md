# types/

Central TypeScript type definitions for the entire Ham Tracker application.

## Files

### `index.ts`
The single source of truth for all shared interfaces and types:

| Type | Purpose |
|------|---------|
| `Army` | A player's army — faction, name, and win/loss/draw stats |
| `Faction` | Union type of ~40 valid faction slugs (e.g. `"ultramarines"`, `"black-templars"`) |
| `Player` | A registered player with profile info, armies, and aggregated stats |
| `ThemeColors` | 8-color palette used for per-faction UI theming |

## Key Relationships

- **`Faction`** is used everywhere: player themes, army associations, background image lookups, and theme color lookups.
- **`Player.theme`** is dynamically set at runtime to the faction of the player's most-played army (see `usePlayers` hook).
- **`Player` stats** (`totalWins`, `totalLosses`, `totalDraws`) and **`Army` stats** are recomputed at runtime from the `games` Firestore collection — the stored Firestore values are seeds/defaults.
- **`ThemeColors`** is defined here but the actual color data lives in `styles/themes.ts`.

## Usage
```ts
import { Player, Army, Faction, ThemeColors } from "../types";
```
