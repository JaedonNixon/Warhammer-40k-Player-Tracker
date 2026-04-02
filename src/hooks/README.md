# hooks/

Custom React hooks for data fetching and app-wide state management.

All data flows through these hooks — components never access Firestore directly (except modals that write data).

## Files

### `useAuth.tsx`
**Authentication context provider and hook.**
- Wraps the app with `AuthProvider` (in `index.tsx`)
- Listens to Firebase `onAuthStateChanged` for login/logout
- Checks if user is admin by looking up their email in Firestore `admins` collection
- Exports: `useAuth()` hook → `{ user, isAdmin, loading }`
- Used by: Navbar, App.tsx, PlayersPage, PlayerDetailPage, AdminPanelPage

### `usePlayers.ts`
**The most critical hook — computes all player stats at runtime.**
- Fetches `players` and `games` collections from Firestore in parallel
- Filters out soft-deleted players (`deleted: true`)
- For each player, recomputes W/L/D from the games collection (both total and per-army)
- Dynamically sets `player.theme` to their most-played army's faction
- Exports: `{ players, getPlayer, getLeaderboard, getTotalGames, getWinRate, getSortedArmies, loading }`
- **Key behavior:** `getLeaderboard()` pushes 0-game players to the bottom
- Used by: HomePage, PlayersPage, PlayerDetailPage, PlayerCard, PlayerProfile

### `useGames.ts`
**Fetches and resolves game data from Firestore.**
- Fetches both `games` and `players` collections to resolve player names
- Games store `player1Id`/`player2Id` (slug IDs); this hook resolves them to display names
- Exports: `{ games, getAllGames, getRecentGames, loading }`
- `getAllGames()` sorts by date descending; `getRecentGames(n)` returns the most recent N
- Used by: HomePage, GameHistoryPage, PlayerGameHistory

### `useTournaments.ts`
**Fetches tournament data from Firestore.**
- Simple fetch of the `tournaments` collection
- Exports: `{ tournaments, getTournamentStandings, loading }`
- `getTournamentStandings()` delegates to `getStandings()` from `data/tournaments.ts`
- Used by: TournamentPage, GameHistoryPage, HomePage

## Data Flow Diagram
```
Firestore "players" ──┐
                       ├──► usePlayers ──► computed Player[] with stats
Firestore "games"   ──┘
                       ├──► useGames   ──► Game[] with resolved names
Firestore "tournaments" ──► useTournaments ──► Tournament[]
Firestore "admins"     ──► useAuth ──► { user, isAdmin }
```
