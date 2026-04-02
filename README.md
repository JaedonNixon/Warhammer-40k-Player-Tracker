# Warhammer 40K Player Tracker ("Ham Tracker")

A React + TypeScript web app for tracking Warhammer 40K players, armies, game results, and tournaments among a friend group. Hosted on **GitHub Pages** with **Firebase** as the backend.

**Live URL:** https://JaedonNixon.github.io/Warhammer-40k-Player-Tracker

---

## Tech Stack

| Layer         | Technology                                      |
| ------------- | ----------------------------------------------- |
| Frontend      | React 19, TypeScript, React Router (HashRouter) |
| Backend / DB  | Firebase Firestore (NoSQL)                      |
| Auth          | Firebase Authentication (email/password)        |
| Charts        | Chart.js + react-chartjs-2                      |
| Hosting       | GitHub Pages (via `gh-pages` package)            |
| Styling       | Vanilla CSS (no Tailwind/CSS frameworks)        |

---

## Project Structure

```
src/
├── index.tsx              # Entry point — wraps App in HashRouter + AuthProvider
├── App.tsx                # Top-level routes, auth gate (login wall)
├── firebase.ts            # Firebase config & initialization (Firestore + Auth)
├── seedFirestore.ts       # One-time script to upload local data → Firestore
│
├── types/
│   └── index.ts           # Core TypeScript types: Player, Army, Faction, ThemeColors
│
├── data/                  # Type definitions + legacy seed data (NOT used at runtime)
│   ├── players.ts         # Player seed data + Player type (runtime reads from Firestore)
│   ├── games.ts           # Game/TurnScore interfaces (runtime reads from Firestore)
│   ├── tournaments.ts     # Tournament interfaces + getStandings() helper
│   └── units.ts           # Unit/Weapon profiles for the Army Builder (static, local)
│
├── hooks/                 # Custom React hooks — ALL data fetching lives here
│   ├── useAuth.tsx        # AuthContext provider — tracks logged-in user + admin/mod status
│   ├── usePlayers.ts      # Fetches players + games from Firestore, computes stats
│   ├── useGames.ts        # Fetches games from Firestore, resolves player names
│   └── useTournaments.ts  # Fetches tournaments from Firestore
│
├── components/
│   ├── Navbar.tsx          # Top navigation bar
│   ├── PlayerCard.tsx      # Player summary card (used on Players page)
│   ├── PlayerProfile.tsx   # Full player profile view
│   ├── PlayerGameHistory.tsx # Per-player game history list
│   ├── ArmyList.tsx        # Army listing within a player profile
│   ├── WinLossChart.tsx    # Chart.js doughnut chart for win/loss/draw
│   ├── AddPlayerModal.tsx  # Modal for adding new players (admin/mod, writes to Firestore)
│   ├── EditPlayerModal.tsx # Modal for editing/deleting players (admin/mod; delete is admin-only)
│   └── CustomSelect.tsx    # Styled dropdown select component
│
├── pages/
│   ├── LoginPage.tsx       # Email/password login form (Firebase Auth)
│   ├── HomePage.tsx        # Dashboard with leaderboard + recent games
│   ├── PlayersPage.tsx     # Grid of all player cards
│   ├── PlayerDetailPage.tsx # Individual player profile (route: /players/:id)
│   ├── GameHistoryPage.tsx # Tabbed view: Matches list + Tournament brackets
│   ├── GameDetailPage.tsx  # Individual game detail with turn-by-turn scoring
│   ├── TournamentPage.tsx  # Tournament standings & round results
│   ├── ArmyBuilderPage.tsx # Point-cost army list builder (uses local units.ts data)
│   ├── FactionsPage.tsx    # Browse factions and their units
│   ├── UnitDetailPage.tsx  # Individual unit stat card
│   └── AdminPanelPage.tsx  # Admin-only panel for managing Moderator accounts
│
├── styles/                 # One CSS file per page/component + themes
│   ├── themes.ts           # Faction → color mapping (every faction has a unique palette)
│   ├── App.css
│   ├── HomePage.css
│   ├── Login.css
│   ├── PlayerCard.css
│   ├── PlayerProfile.css
│   ├── GameHistory.css
│   ├── GameDetail.css
│   ├── Tournament.css
│   ├── ArmyBuilder.css
│   ├── Factions.css
│   ├── AddPlayerModal.css
│   ├── AdminPanel.css
│   └── CustomSelect.css
│
└── utils/
    └── factionBackgrounds.ts  # Maps army names → background image URLs

scripts/
├── seedFirestore.mjs      # Uploads seed data (players, games, tournaments) to Firestore
└── resetFirestore.mjs     # Wipes games/tournaments and zeros all player stats
```

---

## Database Architecture (Firebase Firestore)

**All runtime data lives in Firestore.** The `src/data/` files are only used for TypeScript interfaces and as the original seed source. The app **never reads** from local data files at runtime (except `units.ts` for the Army Builder, which is static game rules data).

### Firestore Collections

#### `players` (document ID = player slug, e.g. `"jaedon-nixon"`)
```typescript
{
  id: string;           // Same as document ID (slug)
  accountId: number;    // Unique numeric ID (auto-incremented when adding players)
  name: string;         // Display name
  nickname?: string;    // Optional nickname
  avatar: string;       // Emoji avatar (e.g. "⚔️")
  theme: Faction;       // Faction key for theming (e.g. "black-templars")
  totalWins: number;    // Base values (stats are recomputed at runtime from games)
  totalLosses: number;
  totalDraws: number;
  armies: Army[];       // Array of armies the player owns
  joinedDate: string;   // ISO date string
  bio?: string;         // Optional bio text
  deleted?: boolean;    // Soft-delete flag (filtered out in usePlayers)
  deletedAt?: string;   // ISO timestamp of deletion
}
```

#### `games` (document ID = string of game number)
```typescript
{
  id: number;
  player1Id: string;        // Player slug (references players collection)
  player1: string;          // Display name (resolved at query time)
  player1Army: string;      // Army name used (e.g. "Black Templars")
  player2Id: string;
  player2: string;
  player2Army: string;
  winner: "player1" | "player2" | "draw";
  date: string;             // ISO date string
  finalTurn: number;        // Last turn played
  turnScores: TurnScore[];  // Per-turn scoring breakdown
  surrendered?: "player1" | "player2";  // Who surrendered (if applicable)
}
```

#### `tournaments` (document ID = tournament slug)
```typescript
{
  id: string;
  name: string;
  date: string;
  status: "upcoming" | "in-progress" | "completed";
  totalRounds: number;
  players: { name: string; army: string }[];
  rounds: SwissRound[];    // Array of rounds, each with an array of matches
}
```

#### `admins` (document ID = email address)
```typescript
{
  role: "admin"   // Presence in this collection grants Moderator privileges
}
```

> **Note:** Despite the collection name `admins`, documents here represent **Moderator** accounts. The true Admin is a single hardcoded email (see Auth section below).

---

## Authentication & Authorization

- **Firebase Auth** with email/password sign-in
- The app is **login-walled** — unauthenticated users see only the login page

### Role System (Admin vs Moderator)

There are two elevated roles:

| Role | How it's assigned | Capabilities |
|------|-------------------|-------------|
| **Admin** | Hardcoded in `useAuth.tsx` (`jaedonnixon19@gmail.com`) — cannot be changed at runtime | All Mod powers **plus** access to the Admin Panel, player deletion, and changing player Account IDs |
| **Moderator** | Added via the Admin Panel (stored in the `admins` Firestore collection) | Add / edit players, log new games, general elevated access |

- Admin always has `isMod = true`, so all Mod-gated features work for the Admin too.
- The Admin Panel (`/admin`) is accessible **only** to the hardcoded Admin account.
- **Deleting a player** is a soft-delete — sets `deleted: true` on the document. The `usePlayers` hook filters these out. Game history data is preserved.
- **Sensitive operations** (delete player, change account ID) require re-authentication by entering credentials again in the modal.

---

## How Stats Are Computed

Player stats (wins, losses, draws, per-army breakdowns) are **not stored statically** — they are **recomputed at runtime** in the `usePlayers` hook:

1. Fetch all players and all games from Firestore
2. For each player, iterate through all games to find matches involving that player
3. Tally wins/losses/draws overall and per-army
4. Dynamically set each player's `theme` to match their most-played army's faction

This means adding/removing games automatically updates all player stats without needing to update player documents.

---

## Theming System

Each faction has a unique color palette defined in `src/styles/themes.ts`:
- `primary`, `secondary`, `accent` — main colors
- `background`, `cardBg` — dark background tones
- `text`, `border`, `glow` — text and decoration colors

The theme is applied dynamically per-player based on their faction. Player profile pages, cards, and detail views all adapt their colors to the player's faction.

Background artwork for game cards uses `src/utils/factionBackgrounds.ts` which maps army names to image URLs.

---

## Routing

Uses **HashRouter** (required for GitHub Pages since it doesn't support client-side routing with clean URLs).

| Route                           | Page               | Description                       |
| ------------------------------- | ------------------ | --------------------------------- |
| `/`                             | HomePage           | Leaderboard + recent games        |
| `/players`                      | PlayersPage        | All players grid                  |
| `/players/:id`                  | PlayerDetailPage   | Individual player profile         |
| `/history`                      | GameHistoryPage    | Matches + Tournaments tabs        |
| `/history/:id`                  | GameDetailPage     | Single game turn-by-turn detail   |
| `/tournament`                   | TournamentPage     | Tournament standings              |
| `/army-builder`                 | ArmyBuilderPage    | Build army lists with point costs |
| `/factions`                     | FactionsPage       | Browse factions and their units   |
| `/factions/:faction/:unitId`    | UnitDetailPage     | Individual unit stat sheet        |
| `/admin`                        | AdminPanelPage     | Admin account management          |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start
```

The app connects to the production Firebase project (`ham-tracker`) in all environments. There is no separate dev Firestore instance.

---

## Deployment

The app is deployed to GitHub Pages via the `gh-pages` package:

```bash
# Build + deploy in one command
npm run deploy
```

This runs:
1. `npm run build` — creates optimized production bundle in `/build`
2. `gh-pages -d build` — pushes the `/build` folder to the `gh-pages` branch

The `homepage` field in `package.json` controls the base URL path:
```json
"homepage": "https://JaedonNixon.github.io/Warhammer-40k-Player-Tracker"
```

---

## Firebase Project Details

| Setting            | Value                                      |
| ------------------ | ------------------------------------------ |
| Project ID         | `ham-tracker`                              |
| Auth Domain        | `ham-tracker.firebaseapp.com`              |
| Storage Bucket     | `ham-tracker.firebasestorage.app`          |

The Firebase config is in `src/firebase.ts`. The API key is a client-side key (safe to commit — Firebase security rules protect the data).

---

## Key Design Decisions

1. **Firestore as single source of truth** — all player, game, and tournament data lives in Firestore. The `src/data/` files are legacy seed data only.
2. **Runtime stat computation** — player stats are computed from games on each page load, ensuring consistency without complex data sync logic.
3. **Soft deletes** — players are never hard-deleted, preserving game history integrity.
4. **Faction-based theming** — every page adapts its color scheme to the relevant faction for an immersive 40K feel.
5. **Static unit data** — the Army Builder uses hardcoded unit profiles in `units.ts` (not in Firestore) since these are game rules that don't change per-user.
6. **Re-authentication for destructive actions** — deleting players and changing account IDs require the admin to re-enter their password as a safety measure.
