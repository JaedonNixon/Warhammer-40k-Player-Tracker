import React from "react";
import { Link } from "react-router-dom";
import { Player } from "../types";
import { usePlayers } from "../hooks/usePlayers";
import { getThemeColors } from "../styles/themes";
import { getFavoriteArmyBackground } from "../utils/factionBackgrounds";
import "../styles/PlayerCard.css";

interface PlayerCardProps {
  player: Player;
  rank?: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, rank }) => {
  const { getWinRate, getTotalGames } = usePlayers();
  const theme = getThemeColors(player.theme);
  const winRate = getWinRate(player);
  const totalGames = getTotalGames(player);
  const factionImage = getFavoriteArmyBackground(player.armies);

  return (
    <Link to={`/players/${player.id}`} className="player-card-link">
      <div
        className="player-card"
        style={{
          borderColor: theme.primary,
          background: `linear-gradient(145deg, ${theme.cardBg}, ${theme.background})`,
          boxShadow: `0 0 15px ${theme.glow}40`,
        }}
      >
        {rank && (
          <div className="card-rank" style={{ backgroundColor: theme.primary, color: theme.text }}>
            #{rank}
          </div>
        )}

        <div className="card-header">
          <div className="card-avatar" style={{ borderColor: theme.accent, overflow: 'hidden' }}>
            {factionImage ? (
              <img 
                src={factionImage} 
                alt="Faction" 
                className="avatar-faction-img"
              />
            ) : (
              <div className="avatar-placeholder" style={{ backgroundColor: theme.primary }} />
            )}
          </div>
          <div className="card-identity">
            <h3 className="card-name" style={{ color: theme.primary }}>
              {player.name}
            </h3>
            {player.nickname && (
              <p className="card-nickname" style={{ color: theme.accent }}>
                "{player.nickname}"
              </p>
            )}
          </div>
        </div>

        <div className="card-stats">
          <div className="stat-row">
            <div className="stat-item wins">
              <span className="stat-value" style={{ color: "#4caf50" }}>
                {player.totalWins}
              </span>
              <span className="stat-label">Wins</span>
            </div>
            <div className="stat-item losses">
              <span className="stat-value" style={{ color: "#f44336" }}>
                {player.totalLosses}
              </span>
              <span className="stat-label">Losses</span>
            </div>
            <div className="stat-item draws">
              <span className="stat-value" style={{ color: "#ff9800" }}>
                {player.totalDraws}
              </span>
              <span className="stat-label">Draws</span>
            </div>
          </div>

          <div className="win-rate-bar">
            <div className="win-rate-label">
              <span>Win Rate</span>
              <span style={{ color: theme.accent }}>{winRate}%</span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${winRate}%`,
                  background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                }}
              />
            </div>
          </div>

          <div className="card-footer-info">
            <span className="total-games">{totalGames} Games Played</span>
            <span className="army-count">{player.armies.length} Armies</span>
          </div>
        </div>

        <div className="card-theme-stripe" style={{ backgroundColor: theme.primary }} />
      </div>
    </Link>
  );
};

export default PlayerCard;
