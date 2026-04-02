# scripts/

Standalone Node.js scripts for managing the Firestore database outside of the React app. These run directly with `node` and use the Firebase Web SDK (ESM imports).

## Files

| File | Purpose |
|------|---------|
| `seedFirestore.mjs` | Uploads hardcoded player, game, and tournament data to Firestore. Use for initial setup or restoring the database to a known seed state. |
| `resetFirestore.mjs` | Deletes all games and tournaments, then resets every player's stats (W/L/D and per-army stats) to zero. Players themselves are preserved. |

## Usage

```bash
# Seed the database with sample data
node scripts/seedFirestore.mjs

# Reset all stats and wipe game/tournament history
node scripts/resetFirestore.mjs
```

## Notes

- Both scripts contain the Firebase config inline (same project as the React app: `ham-tracker`).
- `seedFirestore.mjs` uses `setDoc` with explicit document IDs, so re-running it overwrites existing documents.
- `resetFirestore.mjs` is **destructive** — all game history and tournament data is permanently deleted.
- Neither script requires authentication; they connect directly using the Firebase Web SDK.
