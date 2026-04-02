# pages/

Top-level route components. Each file corresponds to one URL route defined in `App.tsx`.

## Route Map

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Dashboard with stats, recent battles |
| `/players` | `PlayersPage` | Player roster grid with sorting |
| `/players/:id` | `PlayerDetailPage` | Full player profile |
| `/history` | `GameHistoryPage` | Match list + tournament viewer (tabbed) |
| `/history/:id` | `GameDetailPage` | Single game detail with turn-by-turn scoring |
| `/tournament` | `TournamentPage` | Latest tournament standings + rounds |
| `/army-builder` | `ArmyBuilderPage` | Interactive army list builder with datasheets |
| `/factions` | `FactionsPage` | Faction browser — select faction, see unit cards |
| `/factions/:faction/:unitId` | `UnitDetailPage` | Full unit datasheet |
| `/admin` | `AdminPanelPage` | Admin account management (guarded) |
| *(no route — shown when logged out)* | `LoginPage` | Email/password auth gate |

## Key Patterns

- **Auth gating**: `LoginPage` is shown when `user` is null (in App.tsx). `AdminPanelPage` uses `<Navigate>` to redirect non-admins.
- **Data access**: Pages consume data via hooks (`usePlayers`, `useGames`, `useTournaments`, `useAuth`). Only modals write to Firestore directly.
- **Loading states**: Every page that uses hooks shows a centered "Loading..." while data is being fetched.
- **Faction theming**: Player-related pages use `getThemeColors()` for dynamic faction-colored styling.
- **Faction art**: Game cards and detail pages use `getArmyBackground()` for background images.

## Files

### `HomePage.tsx`
Hero section with aggregate stats + 3 most recent battle cards.

### `PlayersPage.tsx`
Grid of PlayerCard components with sort dropdown. Admin "Add Player" button.

### `PlayerDetailPage.tsx`
Reads `:id` param, renders PlayerProfile. Admin "Edit Player" opens EditPlayerModal.

### `GameHistoryPage.tsx`
Two tabs: "Matches" (all games as cards) and "Tournaments" (dropdown selector + standings/rounds).

### `GameDetailPage.tsx`
Battle report: faction art, matchup header, turn-by-turn scoring table, notes placeholder.

### `TournamentPage.tsx`
Dedicated single-tournament view for the latest tournament. Standings + round results.

### `ArmyBuilderPage.tsx`
Two-panel layout: unit catalog (left) → your army list (right). Supports datasheets, allied units, Epic Hero uniqueness, and running points total.

### `FactionsPage.tsx`
Simple faction browser. Dropdown → unit card grid → links to UnitDetailPage.

### `UnitDetailPage.tsx`
Full unit datasheet: stat line, weapon tables, abilities, keywords, points options.

### `LoginPage.tsx`
Auth gate. Sign in / sign up form using Firebase email/password auth.

### `AdminPanelPage.tsx`
Admin-only. Manage admin accounts (add/remove by email). Guarded with `<Navigate>`.
