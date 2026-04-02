# styles/

All CSS files and the TypeScript theme registry. The app uses vanilla CSS (no preprocessor).

## Design System
- **Font**: Cinzel (serif, loaded via Google Fonts in `public/index.html`)
- **Primary accent**: Gold `#ffd600`
- **Background**: Dark `#1a1a1f`
- **Text**: Light grey/white `#e0e0e0`
- **Status colors**: Green `#4caf50` (wins), Red `#f44336` (losses), Orange `#ff9800` (draws)

## Files

| File | Used By | Purpose |
|---|---|---|
| `themes.ts` | PlayerCard, PlayerProfile, ArmyList, etc. | 35+ faction color palettes (ThemeColors) + `getThemeColors()` |
| `App.css` | App.tsx (global) | CSS reset, body, navbar, page headers, players grid, admin/mod badge |
| `HomePage.css` | HomePage | Hero section, stats counters, recent battles list |
| `PlayerCard.css` | PlayerCard | Compact card: avatar, stats, win-rate bar, rank badge |
| `PlayerProfile.css` | PlayerProfile | Full profile: banner, stats overview, army list, battle history |
| `GameHistory.css` | GameHistoryPage | Match list, tabs, game cards with faction art |
| `GameDetail.css` | GameDetailPage | Battle report: faction backgrounds, matchup, scoring table |
| `Tournament.css` | TournamentPage, GameHistoryPage | Standings table, Swiss match cards, round sections |
| `ArmyBuilder.css` | ArmyBuilderPage | Two-panel layout, unit catalog, datasheets, army list |
| `Factions.css` | FactionsPage, UnitDetailPage | Faction browser grid, unit detail datasheet |
| `Login.css` | LoginPage | Full-viewport auth form |
| `AdminPanel.css` | AdminPanelPage | Admin panel sections, mod list, add-mod row |
| `AddPlayerModal.css` | AddPlayerModal, EditPlayerModal | Modal overlay, form fields, faction toggles, danger actions |
| `CustomSelect.css` | CustomSelect | Dropdown trigger, option list, hover states |

## Key Pattern: Dynamic Faction Theming
Most component styles use CSS custom properties or inline `style` props set via `getThemeColors(player.theme)`. The CSS files define the layout/structure, while `themes.ts` provides the per-faction colors at runtime.
