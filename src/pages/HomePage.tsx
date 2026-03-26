import React from "react";
import { Link } from "react-router-dom";
import { usePlayers } from "../hooks/usePlayers";
import PlayerCard from "../components/PlayerCard";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const { getLeaderboard } = usePlayers();
  const leaderboard = getLeaderboard();
  const topPlayers = leaderboard.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-emblem">⚔️</div>
          <h1 className="hero-title">WAR LEDGER</h1>
          <p className="hero-subtitle">
            In the grim darkness of the far future, there is only war...
            <br />
            and meticulous record keeping.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{leaderboard.length}</span>
              <span className="hero-stat-label">Warriors</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">
                {leaderboard.reduce(
                  (sum, p) => sum + p.totalWins + p.totalLosses + p.totalDraws,
                  0
                )}
              </span>
              <span className="hero-stat-label">Battles Fought</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">
                {leaderboard.reduce(
                  (sum, p) => sum + p.armies.length,
                  0
                )}
              </span>
              <span className="hero-stat-label">Armies Fielded</span>
            </div>
          </div>
          <Link to="/players" className="hero-cta">
            View All Players →
          </Link>
        </div>
      </section>

      <section className="leaderboard-section">
        <h2 className="section-heading">
          <span className="heading-icon">🏆</span> Top Commanders
        </h2>
        <div className="top-players-grid">
          {topPlayers.map((player, index) => (
            <PlayerCard key={player.id} player={player} rank={index + 1} />
          ))}
        </div>
      </section>

      <section className="recent-section">
        <h2 className="section-heading">
          <span className="heading-icon">📋</span> All Warriors
        </h2>
        <div className="all-players-grid">
          {leaderboard.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
        <div className="section-cta">
          <Link to="/players" className="view-all-link">
            View Full Roster →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
