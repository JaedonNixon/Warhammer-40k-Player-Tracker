/**
 * PlayerProfile.tsx — Full player detail view
 *
 * Used in: PlayerDetailPage
 *
 * Layout (top to bottom):
 *   1. Faction background image (full-width, behind banner)
 *   2. Edit button (visible only when isAdmin + onEdit callback provided)
 *   3. Profile banner — name, nickname, bio, join date, account ID
 *   4. Stats overview — Total Games, Victories, Defeats, Draws, Win Rate
 *   5. Content grid (2 columns):
 *      - Left:  Battle History (PlayerGameHistory component)
 *      - Right: Army Roster (ArmyList component)
 *
 * Theme colors dynamically match the player's primary faction.
 *
 * Styled by: styles/PlayerProfile.css
 */
import React from "react";
import { Player } from "../types";
import { usePlayers } from "../hooks/usePlayers";
import { getThemeColors } from "../styles/themes";
import { factionBackgrounds, getFavoriteArmyImagePosition } from "../utils/factionBackgrounds";
import PlayerGameHistory from "./PlayerGameHistory";
import ArmyList from "./ArmyList";
import "../styles/PlayerProfile.css";

interface PlayerProfileProps {
  player: Player;
  isAdmin?: boolean;
  onEdit?: () => void;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ player, isAdmin, onEdit }) => {
  const { getWinRate, getTotalGames } = usePlayers();
  const theme = getThemeColors(player.theme);
  const winRate = getWinRate(player);
  const totalGames = getTotalGames(player);

  // Get the player's top army (most games played)
  const topArmy = player.armies.length > 0
    ? player.armies.reduce((best, a) => a.gamesPlayed > best.gamesPlayed ? a : best, player.armies[0])
    : null;
  
  const backgroundImage = topArmy ? factionBackgrounds[topArmy.faction] : null;
  const backgroundPosition = getFavoriteArmyImagePosition(player.armies);

  return (
    <div
      className="player-profile"
      style={{
        background: `linear-gradient(180deg, rgba(30, 30, 35, 0.98), #1a1a1f)`,
      }}
    >
      {backgroundImage && (
        <div 
          className="profile-faction-bg"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition }}
        />
      )}
      {isAdmin && onEdit && (
        <button className="edit-player-btn" onClick={onEdit}>✏️ Edit Player</button>
      )}
      <div
        className="profile-banner"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}25, ${theme.accent}15, rgba(25, 25, 30, 0.95))`,
          borderBottom: `2px solid ${theme.primary}`,
        }}
      >
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
          <p className="profile-joined">Account ID #{player.accountId}</p>
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
            ⚔️ Battle History
          </h3>
          <PlayerGameHistory player={player} theme={theme} />
        </div>
        <div className="profile-army-section" style={{ borderColor: theme.primary }}>
          <ArmyList armies={player.armies} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
