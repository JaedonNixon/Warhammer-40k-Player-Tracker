import { useMemo } from "react";
import { players as playerData } from "../data/players";
import { getAllGames } from "../data/games";
import { Player } from "../types";

export function usePlayers() {
  const players = useMemo(() => {
    const allGames = getAllGames();

    return playerData.map((player) => {
      // Compute per-army stats from games
      const armyStats: Record<string, { gamesPlayed: number; wins: number; losses: number; draws: number }> = {};
      player.armies.forEach((a) => {
        armyStats[a.name] = { gamesPlayed: 0, wins: 0, losses: 0, draws: 0 };
      });

      let totalWins = 0;
      let totalLosses = 0;
      let totalDraws = 0;

      allGames.forEach((game) => {
        const isP1 = game.player1 === player.name;
        const isP2 = game.player2 === player.name;
        if (!isP1 && !isP2) return;

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

      const updatedArmies = player.armies.map((a) => ({
        ...a,
        ...(armyStats[a.name] || {}),
      }));

      return { ...player, totalWins, totalLosses, totalDraws, armies: updatedArmies };
    });
  }, []);

  const getPlayer = (id: string): Player | undefined => {
    return players.find((p) => p.id === id);
  };

  const getLeaderboard = (): Player[] => {
    return [...players].sort((a, b) => {
      const aTotal = a.totalWins + a.totalLosses + a.totalDraws;
      const bTotal = b.totalWins + b.totalLosses + b.totalDraws;
      const aWinRate = aTotal > 0 ? a.totalWins / aTotal : 0;
      const bWinRate = bTotal > 0 ? b.totalWins / bTotal : 0;
      return bWinRate - aWinRate;
    });
  };

  const getTotalGames = (player: Player): number => {
    return player.totalWins + player.totalLosses + player.totalDraws;
  };

  const getWinRate = (player: Player): number => {
    const total = getTotalGames(player);
    if (total === 0) return 0;
    return Math.round((player.totalWins / total) * 100);
  };

  const getSortedArmies = (player: Player) => {
    return [...player.armies].sort((a, b) => b.gamesPlayed - a.gamesPlayed);
  };

  return { players, getPlayer, getLeaderboard, getTotalGames, getWinRate, getSortedArmies };
}
