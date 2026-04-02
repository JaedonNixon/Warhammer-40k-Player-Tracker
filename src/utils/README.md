# utils/

Utility functions and lookup tables that don't depend on React state or hooks.

## Files

### `factionBackgrounds.ts`
**Central registry for faction visual assets.**

Maps every faction slug (from `types/index.ts`) to a background image in `public/images/factions/`, and provides helper functions to resolve army names and player data into the correct image URL and CSS positioning.

| Export | Purpose |
|---|---|
| `factionBackgrounds` | `Partial<Record<Faction, string>>` — Faction slug → image URL |
| `getArmyBackground(name)` | Army display name → image URL (or null) |
| `getFavoriteArmyBackground(armies)` | Player's army list → top army's image URL |
| `getFavoriteArmyImagePosition(armies)` | Player's army list → CSS `object-position` for the image |

**Key detail:** A hidden `armyNameToFaction` lookup handles aliases (e.g. both "Drukhari" and "Dark Eldar" resolve to `dark-eldar`).

## Used By
- `PlayerCard` — Card background image
- `PlayerProfile` — Profile header background
- `FactionsPage` — Faction grid tiles
- `PlayerDetailPage` — Detail page header
