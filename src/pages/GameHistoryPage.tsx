import React from "react";
import { Link } from "react-router-dom";
import { getAllGames, Game } from "../data/games";
import "../styles/GameHistory.css";

const GameHistoryPage: React.FC = () => {
  const allGames = getAllGames();

  const getFinalScores = (game: Game) => {
    const lastTurn = game.turnScores[game.turnScores.length - 1];
    return lastTurn ? { p1: lastTurn.player1Points, p2: lastTurn.player2Points } : { p1: 0, p2: 0 };
  };

  return (
    <div className="game-history-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">📜</span> Battle Archives
        </h1>
        <p className="page-description">
          A chronicle of all battles fought in the endless war
        </p>
      </header>

      <div className="history-stats">
        <div className="history-stat">
          <span className="stat-value">{allGames.length}</span>
          <span className="stat-label">Total Battles</span>
        </div>
      </div>

      <div className="game-history-list">
        {allGames.length === 0 ? (
          <div className="no-games">
            <p>No battles have been recorded yet.</p>
          </div>
        ) : (
          allGames.map((game) => {
            const finalScores = getFinalScores(game);

            return (
              <Link
                key={game.id}
                to={`/history/${game.id}`}
                className="history-game-card"
              >
                <div className="game-date">
                  {new Date(game.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <span className="game-turns">Turn {game.finalTurn}</span>
                </div>
                <div className="game-matchup">
                  <div className={`game-player ${game.winner === "player1" ? "winner" : ""}`}>
                    <span className="player-name">{game.player1}</span>
                    <span className="player-army">{game.player1Army}</span>
                    <span className="player-final-score">{finalScores.p1} pts</span>
                    {game.winner === "player1" && <span className="winner-badge">VICTORY</span>}
                  </div>
                  <div className="game-vs">
                    {game.winner === "draw" ? "DRAW" : "VS"}
                  </div>
                  <div className={`game-player ${game.winner === "player2" ? "winner" : ""}`}>
                    <span className="player-name">{game.player2}</span>
                    <span className="player-army">{game.player2Army}</span>
                    <span className="player-final-score">{finalScores.p2} pts</span>
                    {game.winner === "player2" && <span className="winner-badge">VICTORY</span>}
                  </div>
                </div>

                <div className="view-details">
                  View Details →
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameHistoryPage;
