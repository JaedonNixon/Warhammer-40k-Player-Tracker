# components/

Reusable UI components used across multiple pages.

## Files

### `Navbar.tsx`
**Top navigation bar — persistent across all routes.**
Links to Home, Players, History, Tournament, Army Builder, Factions. Shows an ADMIN badge + logout button when authenticated as admin. Hamburger menu for mobile.

### `PlayerCard.tsx`
**Compact player summary card.**
Displays rank, faction background, name/nickname, W/L/D counters, win-rate bar, total games, and army count. Used in PlayersPage roster grid and HomePage leaderboard. Entire card is a `<Link>` to `/players/:id`.

### `PlayerProfile.tsx`
**Full player detail view.**
Shown on PlayerDetailPage. Top-to-bottom: faction background → banner (name, bio, join date, account ID) → stat counters → two-column grid (Battle History + Army Roster). Contains an admin-only "Edit Player" button.

### `PlayerGameHistory.tsx`
**Vertical list of a player's past games.**
Embedded inside PlayerProfile. Each game card shows result (VICTORY/DEFEAT/DRAW), date, turn count, matchup (player vs opponent with armies and scores). Links to `/history/:gameId` for full game detail.

### `ArmyList.tsx`
**Ranked army roster for a single player.**
Embedded inside PlayerProfile. Shows each army sorted by games played, with per-army W/L/D stats, win rate, and a proportional bar chart. Each army gets its own faction-themed colors.

### `WinLossChart.tsx`
**Doughnut chart (Chart.js) showing W/L/D breakdown.**
Uses react-chartjs-2. Currently NOT rendered anywhere in the app (was previously used in player profiles). Available for future use.

### `CustomSelect.tsx`
**Styled dropdown replacement for `<select>`.**
Dark/gold themed dropdown with click-outside-to-close and hover highlighting. Used in GameHistoryPage and ArmyBuilderPage for sort/filter controls.

### `AddPlayerModal.tsx`
**Modal for creating a new player (admin-only).**
Collects name, avatar emoji, and faction selections. Auto-generates slug ID and increments accountId. Writes to Firestore `players` collection.

### `EditPlayerModal.tsx`
**Modal for editing/deleting a player (admin-only).**
Three views:
1. **Edit** — Change name, add/remove factions (factions with game history are locked 🔒)
2. **Change Account ID** — Requires admin re-auth, checks for uniqueness
3. **Delete Player** — Soft-delete (`deleted: true`), requires admin re-auth

## Key Patterns
- **Theme colors**: Most components call `getThemeColors(player.theme)` for dynamic faction-based styling
- **Faction backgrounds**: PlayerCard and PlayerProfile use `getFavoriteArmyBackground()` to show the top army's image
- **Modal pattern**: Both modals use overlay + stopPropagation for click-outside-to-close
- **Data access**: Components read from hooks (usePlayers, useGames), never directly from Firestore (except AddPlayerModal/EditPlayerModal which write)
