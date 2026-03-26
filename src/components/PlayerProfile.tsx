import React from "react";
import { Player } from "../types";
import { usePlayers } from "../hooks/usePlayers";
import { getThemeColors } from "../styles/themes";
import WinLossChart from "./WinLossChart";
import ArmyList from "./ArmyList";
import "../styles/PlayerProfile.css";

interface PlayerProfileProps {
  player: Player;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ player }) => {
  const { getWinRate, getTotalGames } = usePlayers();
  const theme = getThemeColors(player.theme);
  const winRate = getWinRate(player);
  const totalGames = getTotalGames(player);

  return (
    <div
      className="player-profile"
      style={{
        background: `linear-gradient(180deg, ${theme.background}, #0a0a0a)`,
      }}
    >
      <div
        className="profile-banner"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}20, ${theme.accent}20, ${theme.background})`,
          borderBottom: `2px solid ${theme.primary}`,
        }}
      >
        <div className="profile-avatar-large" style={{ borderColor: theme.primary, boxShadow: `0 0 30px ${theme.glow}60` }}>
          <span className="avatar-emoji-large">{player.avatar}</span>
        </div>
        <div className="profile-identity">
          <h1 className="profile-name" style={{ color: theme.primary }}>
            {player.name}
          </h1>
          {player.nickname && (
            <p className="profile-nickname" style={{ color: theme.accent }}>
              "{player.nickname}"
            </p>
          )}
          {player.bio && <p className="profile-bio">{player.bio}</p>}
          <p className="profile-joined">
            Enlisted: {new Date(player.joinedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="profile-stats-overview">
        <div className="overview-stat" style={{ borderColor: theme.primary }}>
          <span className="overview-value" style={{ color: theme.primary }}>
            {totalGames}
          </span>
          <span className="overview-label">Total Games</span>
        </div>
        <div className="overview-stat" style={{ borderColor: "#4caf50" }}>
          <span className="overview-value" style={{ color: "#4caf50" }}>
            {player.totalWins}
          </span>
          <span className="overview-label">Victories</span>
        </div>
        <div className="overview-stat" style={{ borderColor: "#f44336" }}>
          <span className="overview-value" style={{ color: "#f44336" }}>
            {player.totalLosses}
          </span>
          <span className="overview-label">Defeats</span>
        </div>
        <div className="overview-stat" style={{ borderColor: "#ff9800" }}>
          <span className="overview-value" style={{ color: "#ff9800" }}>
            {player.totalDraws}
          </span>
          <span className="overview-label">Draws</span>
        </div>
        <div className="overview-stat" style={{ borderColor: theme.accent }}>
          <span className="overview-value" style={{ color: theme.accent }}>
            {winRate}%
          </span>
          <span className="overview-label">Win Rate</span>
        </div>
      </div>

      <div className="profile-content-grid">
        <div className="profile-chart-section" style={{ borderColor: theme.primary }}>
          <h3 className="section-title" style={{ color: theme.primary }}>
            📊 Battle Record
          </h3>
          <WinLossChart player={player} />
        </div>
        <div className="profile-army-section" style={{ borderColor: theme.primary }}>
          <ArmyList armies={player.armies} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
