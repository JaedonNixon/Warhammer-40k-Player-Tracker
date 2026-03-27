import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Game } from "../data/games";

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      const [gamesSnap, playersSnap] = await Promise.all([
        getDocs(collection(db, "games")),
        getDocs(collection(db, "players")),
      ]);
      const playerNames: Record<string, string> = {};
      playersSnap.docs.forEach((doc) => {
        const d = doc.data();
        playerNames[d.id] = d.name;
      });
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

  const getAllGames = (): Game[] => {
    return [...games].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const getRecentGames = (count: number = 3): Game[] => {
    return getAllGames().slice(0, count);
  };

  return { games, getAllGames, getRecentGames, loading };
}
