/**
 * PlayersPage.tsx — Player roster grid with sorting
 *
 * Route: /players
 *
 * Displays all non-deleted players as PlayerCard components in a grid.
 * Sorting options: Win Rate (default), Total Wins, Games Played, Name.
 * Win-rate sort pushes 0-game players to the bottom.
 *
 * Admin-only feature: "+ Add Player" button opens AddPlayerModal.
 *
 * Data source: usePlayers (players array)
 */
import React, { useState } from "react";
import { usePlayers } from "../hooks/usePlayers";
import { useAuth } from "../hooks/useAuth";
import PlayerCard from "../components/PlayerCard";
import AddPlayerModal from "../components/AddPlayerModal";
import CustomSelect from "../components/CustomSelect";

const PlayersPage: React.FC = () => {
  const { players, loading } = usePlayers();
  const { isMod } = useAuth();
  const [sortBy, setSortBy] = useState<"winrate" | "wins" | "games" | "name">("winrate");
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) return <div style={{textAlign:'center',color:'#aaa',marginTop:'80px'}}>Loading...</div>;

  /**
   * Sort players according to the current sortBy state.
   * "winrate" mode pushes 0-game players to the bottom (same as getLeaderboard).
   */
  const getSortedPlayers = () => {
    let filtered = [...players];

    switch (sortBy) {
      case "winrate":
        return filtered.sort((a, b) => {
          const aTotal = a.totalWins + a.totalLosses + a.totalDraws;
          const bTotal = b.totalWins + b.totalLosses + b.totalDraws;
          if (aTotal === 0 && bTotal > 0) return 1;
          if (bTotal === 0 && aTotal > 0) return -1;
          const aRate = aTotal > 0 ? a.totalWins / aTotal : 0;
          const bRate = bTotal > 0 ? b.totalWins / bTotal : 0;
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
          <CustomSelect
            value={sortBy}
            onChange={(v) => setSortBy(v as "winrate" | "wins" | "games" | "name")}
            options={[
              { label: "Win Rate", value: "winrate" },
              { label: "Total Wins", value: "wins" },
              { label: "Games Played", value: "games" },
              { label: "Name", value: "name" },
            ]}
          />
        </div>
        {isMod && (
          <button className="add-player-btn" onClick={() => setShowAddModal(true)}>
            + Add Player
          </button>
        )}
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

      {showAddModal && (
        <AddPlayerModal
          onClose={() => setShowAddModal(false)}
          onAdded={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default PlayersPage;
