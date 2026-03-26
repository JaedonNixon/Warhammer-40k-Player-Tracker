import { useMemo } from "react";
import { players as playerData } from "../data/players";
import { Player } from "../types";

export function usePlayers() {
  const players = useMemo(() => playerData, []);

  const getPlayer = (id: string): Player | undefined => {
    return players.find((p) => p.id === id);
  };

  const getLeaderboard = (): Player[] => {
    return [...players].sort((a, b) => {
      const aWinRate = a.totalWins / (a.totalWins + a.totalLosses + a.totalDraws);
      const bWinRate = b.totalWins / (b.totalWins + b.totalLosses + b.totalDraws);
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
