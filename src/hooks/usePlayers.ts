/**
 * hooks/usePlayers.ts — The primary data hook for player information.
 *
 * This is the MOST IMPORTANT hook in the app. It:
 * 1. Fetches all players and games from Firestore in parallel
 * 2. Filters out soft-deleted players (deleted: true)
 * 3. RECOMPUTES all player stats at runtime from the games collection:
 *    - totalWins, totalLosses, totalDraws (per player)
 *    - Per-army gamesPlayed, wins, losses, draws
 *    - Dynamically sets player.theme to their most-played army's faction
 *
 * Provides:
 * - `players`: Enriched Player[] with computed stats
 * - `getPlayer(id)`: Find a single player by ID
 * - `getLeaderboard()`: Players sorted by win rate (0-game players at bottom)
 * - `getTotalGames(player)`: Total games for a player
 * - `getWinRate(player)`: Win rate percentage (0-100)
 * - `getSortedArmies(player)`: Player's armies sorted by games played
 * - `loading`: Whether data is still being fetched
 *
 * Used by: Almost every page and component in the app.
 */
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Game } from "../data/games";
import { Player } from "../types";

export function usePlayers() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch players and games in parallel from Firestore
    async function fetchData() {
      const [playersSnap, gamesSnap] = await Promise.all([
        getDocs(collection(db, "players")),
        getDocs(collection(db, "games")),
      ]);
      // Filter out soft-deleted players (deleted flag = true)
      setPlayerData(
        playersSnap.docs
          .map((doc) => doc.data() as Player & { deleted?: boolean })
          .filter((p) => !p.deleted) as Player[]
      );
      setAllGames(gamesSnap.docs.map((doc) => doc.data() as Game));
      setLoading(false);
    }
    fetchData();
  }, []);

  /**
   * Computed player data with runtime stats from games.
   * Recalculates whenever playerData or allGames changes.
   * For each player:
   * - Tallies W/L/D from games where player is player1 or player2
   * - Maps stats to individual armies
   * - Sets theme to most-played army's faction
   */
  const players = useMemo(() => {
    return playerData.map((player) => {
      // Initialize per-army stat accumulators
      const armyStats: Record<string, { gamesPlayed: number; wins: number; losses: number; draws: number }> = {};
      player.armies.forEach((a) => {
        armyStats[a.name] = { gamesPlayed: 0, wins: 0, losses: 0, draws: 0 };
      });

      let totalWins = 0;
      let totalLosses = 0;
      let totalDraws = 0;

      // Scan all games to tally this player's stats
      allGames.forEach((game) => {
        const isP1 = game.player1Id === player.id;  // Is this player "player1" in the game?
        const isP2 = game.player2Id === player.id;  // Is this player "player2" in the game?
        if (!isP1 && !isP2) return; // Player not in this game

        const armyName = isP1 ? game.player1Army : game.player2Army;
        if (!armyStats[armyName]) {
          armyStats[armyName] = { gamesPlayed: 0, wins: 0, losses: 0, draws: 0 };
        }
        armyStats[armyName].gamesPlayed += 1;

        if (game.winner === "draw") {
          totalDraws += 1;
          armyStats[armyName].draws += 1;
        } else if ((isP1 && game.winner === "player1") || (isP2 && game.winner === "player2")) {
          totalWins += 1;
          armyStats[armyName].wins += 1;
        } else {
          totalLosses += 1;
          armyStats[armyName].losses += 1;
        }
      });

      // Merge computed stats back into army objects
      const updatedArmies = player.armies.map((a) => ({
        ...a,
        ...(armyStats[a.name] || {}),
      }));

      // Dynamic theme: set to most-played army's faction (if they've played any games)
      const mostPlayed = updatedArmies.length > 0
        ? updatedArmies.reduce((best, a) => a.gamesPlayed > best.gamesPlayed ? a : best, updatedArmies[0])
        : null;
      const dynamicTheme = mostPlayed && mostPlayed.gamesPlayed > 0 ? mostPlayed.faction : player.theme;

      return { ...player, totalWins, totalLosses, totalDraws, armies: updatedArmies, theme: dynamicTheme };
    });
  }, [playerData, allGames]);

  /** Find a player by their slug ID. */
  const getPlayer = (id: string): Player | undefined => {
    return players.find((p) => p.id === id);
  };

  /**
   * Returns players sorted by win rate (descending).
   * Players with 0 games are pushed to the bottom of the list.
   */
  const getLeaderboard = (): Player[] => {
    return [...players].sort((a, b) => {
      const aTotal = a.totalWins + a.totalLosses + a.totalDraws;
      const bTotal = b.totalWins + b.totalLosses + b.totalDraws;
      // Players with 0 games go to the bottom
      if (aTotal === 0 && bTotal > 0) return 1;
      if (bTotal === 0 && aTotal > 0) return -1;
      const aWinRate = aTotal > 0 ? a.totalWins / aTotal : 0;
      const bWinRate = bTotal > 0 ? b.totalWins / bTotal : 0;
      return bWinRate - aWinRate;
    });
  };

  /** Total games played by a player (W + L + D). */
  const getTotalGames = (player: Player): number => {
    return player.totalWins + player.totalLosses + player.totalDraws;
  };

  /** Win rate as a whole number percentage (0-100). Returns 0 if no games. */
  const getWinRate = (player: Player): number => {
    const total = getTotalGames(player);
    if (total === 0) return 0;
    return Math.round((player.totalWins / total) * 100);
  };

  /** Returns a player's armies sorted by most games played first. */
  const getSortedArmies = (player: Player) => {
    return [...player.armies].sort((a, b) => b.gamesPlayed - a.gamesPlayed);
  };

  return { players, getPlayer, getLeaderboard, getTotalGames, getWinRate, getSortedArmies, loading };
}
