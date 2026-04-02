/**
 * hooks/useGames.ts — Fetches and manages game data from Firestore.
 *
 * Provides:
 * - `games`: Raw array of all Game objects
 * - `getAllGames()`: All games sorted by date (newest first)
 * - `getRecentGames(count)`: Most recent N games
 * - `loading`: Whether data is still being fetched
 *
 * IMPORTANT: This hook resolves player display names at fetch time.
 * Game docs in Firestore store player1Id/player2Id (slug IDs), and this
 * hook cross-references the "players" collection to populate the
 * player1/player2 display name fields. If a player is deleted or not
 * found, it falls back to the stored name or "Unknown".
 */
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Game } from "../data/games";

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      // Fetch both games and players in parallel for name resolution
      const [gamesSnap, playersSnap] = await Promise.all([
        getDocs(collection(db, "games")),
        getDocs(collection(db, "players")),
      ]);

      // Build lookup map: player ID → display name
      const playerNames: Record<string, string> = {};
      playersSnap.docs.forEach((doc) => {
        const d = doc.data();
        playerNames[d.id] = d.name;
      });

      // Map game docs, resolving player names from IDs
      const data = gamesSnap.docs.map((doc) => {
        const g = doc.data() as Game;
        return {
          ...g,
          player1: playerNames[g.player1Id] || g.player1 || "Unknown",
          player2: playerNames[g.player2Id] || g.player2 || "Unknown",
        };
      });
      setGames(data);
      setLoading(false);
    }
    fetchGames();
  }, []);

  /** Returns all games sorted newest-first by date. */
  const getAllGames = (): Game[] => {
    return [...games].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  /** Returns the N most recent games (sorted newest-first). */
  const getRecentGames = (count: number = 3): Game[] => {
    return getAllGames().slice(0, count);
  };

  return { games, getAllGames, getRecentGames, loading };
}
