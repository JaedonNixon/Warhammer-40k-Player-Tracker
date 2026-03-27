import React, { useState } from "react";
import { usePlayers } from "../hooks/usePlayers";
import { useAuth } from "../hooks/useAuth";
import PlayerCard from "../components/PlayerCard";
import AddPlayerModal from "../components/AddPlayerModal";
import CustomSelect from "../components/CustomSelect";

const PlayersPage: React.FC = () => {
  const { players, loading } = usePlayers();
  const { isAdmin } = useAuth();
  const [sortBy, setSortBy] = useState<"winrate" | "wins" | "games" | "name">("winrate");
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) return <div style={{textAlign:'center',color:'#aaa',marginTop:'80px'}}>Loading...</div>;

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
        {isAdmin && (
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
