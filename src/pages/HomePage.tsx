import React from "react";
import { usePlayers } from "../hooks/usePlayers";
import { getRecentGames } from "../data/games";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const { getLeaderboard } = usePlayers();
  const leaderboard = getLeaderboard();
  const recentGames = getRecentGames(3);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">HAM TRACKER</h1>
          <p className="hero-subtitle">
            "To forget history is to forget purpose. Record all. Forget nothing."
            <br />
            — Remembrancer's Creed
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{leaderboard.length}</span>
              <span className="hero-stat-label">Members</span>
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
                {leaderboard.reduce((sum, p) => sum + p.armies.length, 0)}/25
              </span>
              <span className="hero-stat-label">Armies Fielded</span>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-section">
        <h2 className="section-heading">
          <span className="heading-icon">⚔️</span> Recent Battles
        </h2>
        <div className="recent-games-list">
          {recentGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-date">
                {new Date(game.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="game-matchup">
                <div className={`game-player ${game.winner === "player1" ? "winner" : ""}`}>
                  <span className="player-name">{game.player1}</span>
                  <span className="player-army">{game.player1Army}</span>
                </div>
                <div className="game-vs">
                  {game.winner === "draw" ? "DRAW" : "VS"}
                </div>
                <div className={`game-player ${game.winner === "player2" ? "winner" : ""}`}>
                  <span className="player-name">{game.player2}</span>
                  <span className="player-army">{game.player2Army}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
