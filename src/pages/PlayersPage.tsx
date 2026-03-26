import React, { useState } from "react";
import { usePlayers } from "../hooks/usePlayers";
import PlayerCard from "../components/PlayerCard";

const PlayersPage: React.FC = () => {
  const { players } = usePlayers();
  const [sortBy, setSortBy] = useState<"winrate" | "wins" | "games" | "name">("winrate");

  const getSortedPlayers = () => {
    let filtered = [...players];

    switch (sortBy) {
      case "winrate":
        return filtered.sort((a, b) => {
          const aRate = a.totalWins / (a.totalWins + a.totalLosses + a.totalDraws);
          const bRate = b.totalWins / (b.totalWins + b.totalLosses + b.totalDraws);
          return bRate - aRate;
        });
      case "wins":
        return filtered.sort((a, b) => b.totalWins - a.totalWins);
      case "games":
        return filtered.sort(
          (a, b) =>
            b.totalWins + b.totalLosses + b.totalDraws -
            (a.totalWins + a.totalLosses + a.totalDraws)
        );
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  };

  const sortedPlayers = getSortedPlayers();

  return (
    <div className="players-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-icon">👥</span> Player Roster
        </h1>
        <p className="page-description">
          The warriors who have answered the call to battle.
        </p>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">Sort By:</label>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "winrate" | "wins" | "games" | "name")}
          >
            <option value="winrate">Win Rate</option>
            <option value="wins">Total Wins</option>
            <option value="games">Games Played</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="players-grid">
        {sortedPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
        {sortedPlayers.length === 0 && (
          <div className="no-results">
            <p>No warriors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
