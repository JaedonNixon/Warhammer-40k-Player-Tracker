import React from "react";
import { Link } from "react-router-dom";
import { usePlayers } from "../hooks/usePlayers";
import { useGames } from "../hooks/useGames";
import { useTournaments } from "../hooks/useTournaments";
import { getArmyBackground } from "../utils/factionBackgrounds";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const { getLeaderboard, loading: playersLoading } = usePlayers();
  const { getRecentGames, loading: gamesLoading } = useGames();
  const { tournaments, loading: tournamentsLoading } = useTournaments();

  if (playersLoading || gamesLoading || tournamentsLoading) return <div className="home-page"><p style={{textAlign:'center',color:'#aaa',marginTop:'80px'}}>Loading...</p></div>;

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
              <span className="hero-stat-value">{tournaments.length}</span>
              <span className="hero-stat-label">Tournaments</span>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">
                {leaderboard.reduce((sum, p) => sum + p.armies.length, 0)}/30
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
            <Link key={game.id} to={`/history/${game.id}`} className="game-card game-card-link">
              <div
                className="card-art card-art-left"
                style={getArmyBackground(game.player1Army)
                  ? { backgroundImage: `url(${getArmyBackground(game.player1Army)})` }
                  : undefined}
              />
              <div className="card-content">
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
                <div className="view-details">View Details →</div>
              </div>
              <div
                className="card-art card-art-right"
                style={getArmyBackground(game.player2Army)
                  ? { backgroundImage: `url(${getArmyBackground(game.player2Army)})` }
                  : undefined}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
