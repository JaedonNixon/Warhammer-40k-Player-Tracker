# src/

Root source directory for the React application.

## Root Files

| File | Purpose |
|---|---|
| `App.tsx` | Root component — auth gating + route definitions |
| `index.tsx` | Entry point — renders React tree with HashRouter + AuthProvider |
| `index.css` | Base typography (Barlow body, Cinzel headings, dark background) |
| `firebase.ts` | Firebase SDK init — exports `db` (Firestore) and `auth` (Auth) |
| `seedFirestore.ts` | One-time script to upload seed data from `data/` to Firestore |
| `App.css` | Legacy/duplicate — actual styles are in `styles/App.css` |
| `App.test.tsx` | CRA default test (smoke test) |
| `react-app-env.d.ts` | CRA TypeScript environment declarations |
| `reportWebVitals.ts` | CRA performance reporting (unused) |
| `setupTests.ts` | Jest/Testing Library setup |

## Subdirectories

| Directory | Contents |
|---|---|
| `components/` | Reusable UI components (Navbar, PlayerCard, modals, etc.) |
| `pages/` | Route-level page components (one per URL route) |
| `hooks/` | Custom React hooks (useAuth, usePlayers, useGames, useTournaments) |
| `data/` | TypeScript data interfaces and seed data |
| `types/` | Shared TypeScript interfaces (Player, Army, Faction, ThemeColors) |
| `styles/` | All CSS files + faction theme registry (themes.ts) |
| `utils/` | Utility functions (faction background image mapping) |

## Architecture Overview
```
index.tsx
  └─ HashRouter → AuthProvider → App.tsx
       ├─ Not logged in → LoginPage
       └─ Logged in → Navbar + <Routes>
            ├─ /              → HomePage
            ├─ /players       → PlayersPage
            ├─ /players/:id   → PlayerDetailPage
            ├─ /history       → GameHistoryPage
            ├─ /history/:id   → GameDetailPage
            ├─ /tournament    → TournamentPage
            ├─ /army-builder  → ArmyBuilderPage
            ├─ /factions      → FactionsPage
            ├─ /factions/:f/:u→ UnitDetailPage
            └─ /admin         → AdminPanelPage (admin only)
```
