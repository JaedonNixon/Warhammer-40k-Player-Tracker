import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { games } from "../data/games";
import { getArmyBackground } from "../utils/factionBackgrounds";
import "../styles/GameDetail.css";

const GameDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games.find((g) => g.id === Number(id));

  if (!game) {
    return (
      <div className="game-detail-page">
        <div className="not-found">
          <h2>Battle Record Not Found</h2>
          <p>This battle has been lost to the warp...</p>
          <button onClick={() => navigate(-1)} className="back-link">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const getFinalScores = () => {
    const lastTurn = game.turnScores[game.turnScores.length - 1];
    return lastTurn ? { p1: lastTurn.player1Points, p2: lastTurn.player2Points } : { p1: 0, p2: 0 };
  };

  const finalScores = getFinalScores();

  return (
    <div className="game-detail-page">
      {getArmyBackground(game.player1Army) && (
        <div
          className="page-bg page-bg-left"
          style={{ backgroundImage: `url(${getArmyBackground(game.player1Army)})` }}
        />
      )}
      {getArmyBackground(game.player2Army) && (
        <div
          className="page-bg page-bg-right"
          style={{ backgroundImage: `url(${getArmyBackground(game.player2Army)})` }}
        />
      )}
      <button onClick={() => navigate(-1)} className="back-link">
        ← Back
      </button>

      <header className="game-detail-header">
        <div className="game-detail-date">
          {new Date(game.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <h1 className="game-detail-title">Battle Report</h1>
        <div className="game-detail-turn-info">
          Game ended on Turn {game.finalTurn}
          {game.surrendered && " — Surrender"}
        </div>
      </header>

      <section className="game-detail-matchup">
        <div className={`detail-player ${game.winner === "player1" ? "winner" : ""}`}>
          {game.winner === "player1" && <div className="victory-banner">VICTORY</div>}
          <div className="detail-player-name">{game.player1}</div>
          <div className="detail-player-army">{game.player1Army}</div>
          <div className="detail-player-score">{finalScores.p1}</div>
          <div className="detail-score-label">Victory Points</div>
        </div>

        <div className="detail-vs">
          {game.winner === "draw" ? (
            <span className="draw-badge">DRAW</span>
          ) : (
            "VS"
          )}
        </div>

        <div className={`detail-player ${game.winner === "player2" ? "winner" : ""}`}>
          {game.winner === "player2" && <div className="victory-banner">VICTORY</div>}
          <div className="detail-player-name">{game.player2}</div>
          <div className="detail-player-army">{game.player2Army}</div>
          <div className="detail-player-score">{finalScores.p2}</div>
          <div className="detail-score-label">Victory Points</div>
        </div>
      </section>

      <section className="game-detail-scoring">
        <h2 className="section-title">📊 Turn-by-Turn Scoring</h2>
        <div className="scoring-table">
          <div className="scoring-header">
            <span className="col-turn">Turn</span>
            <span className="col-player">{game.player1}</span>
            <span className="col-player">{game.player2}</span>
            <span className="col-diff">Diff</span>
          </div>
          {game.turnScores.map((turnScore, index) => {
            const diff = turnScore.player1Points - turnScore.player2Points;
            const isFinalTurn = index === game.turnScores.length - 1;
            const showSurrender = isFinalTurn && game.surrendered;
            return (
              <div key={turnScore.turn} className={`scoring-row ${showSurrender ? "surrender-row" : ""}`}>
                <span className="col-turn">{turnScore.turn}</span>
                <span className={`col-player ${game.winner === "player1" ? "winner-col" : ""}`}>
                  {turnScore.player1Points}
                  {showSurrender && game.surrendered === "player1" && (
                    <span className="surrender-marker">⚐ SURRENDER</span>
                  )}
                </span>
                <span className={`col-player ${game.winner === "player2" ? "winner-col" : ""}`}>
                  {turnScore.player2Points}
                  {showSurrender && game.surrendered === "player2" && (
                    <span className="surrender-marker">⚐ SURRENDER</span>
                  )}
                </span>
                <span className={`col-diff ${diff > 0 ? "positive" : diff < 0 ? "negative" : ""}`}>
                  {diff > 0 ? `+${diff}` : diff}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Placeholder sections for future expansion */}
      <section className="game-detail-notes">
        <h2 className="section-title">📝 Battle Notes</h2>
        <div className="placeholder-content">
          <p>No notes recorded for this battle.</p>
        </div>
      </section>
    </div>
  );
};

export default GameDetailPage;
