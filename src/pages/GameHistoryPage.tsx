import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAllGames, Game } from "../data/games";
import { tournaments, getStandings, Tournament, SwissMatch } from "../data/tournaments";
import { getArmyBackground } from "../utils/factionBackgrounds";
import "../styles/GameHistory.css";
import "../styles/Tournament.css";

type Tab = "matches" | "tournaments";

const GameHistoryPage: React.FC = () => {
  const allGames = getAllGames();
  const [activeTab, setActiveTab] = useState<Tab>("matches");
  const [selectedTournament, setSelectedTournament] = useState<string>(
    tournaments.length > 0 ? tournaments[0].id : ""
  );

  const currentTournament = tournaments.find((t) => t.id === selectedTournament) || null;

  const getFinalScores = (game: Game) => {
    const lastTurn = game.turnScores[game.turnScores.length - 1];
    return lastTurn ? { p1: lastTurn.player1Points, p2: lastTurn.player2Points } : { p1: 0, p2: 0 };
  };

  const renderMatch = (match: SwissMatch) => {
    const bg1 = getArmyBackground(match.player1Army);
    const bg2 = getArmyBackground(match.player2Army);
    const p1Win = match.winner === match.player1;
    const p2Win = match.winner === match.player2;

    return (
      <div key={match.id} className={`swiss-match ${match.winner ? "played" : ""}`}>
        <div className={`swiss-slot ${p1Win ? "winner" : ""} ${match.winner && !p1Win && match.winner !== "draw" ? "loser" : ""}`}>
          {bg1 && <div className="slot-art" style={{ backgroundImage: `url(${bg1})` }} />}
          <div className="slot-info">
            <span className="slot-name">{match.player1}</span>
            <span className="slot-army">{match.player1Army}</span>
          </div>
          {match.score1 !== null && <span className="slot-score">{match.score1}</span>}
        </div>
        <div className="swiss-vs">VS</div>
        <div className={`swiss-slot ${p2Win ? "winner" : ""} ${match.winner && !p2Win && match.winner !== "draw" ? "loser" : ""}`}>
          {bg2 && <div className="slot-art" style={{ backgroundImage: `url(${bg2})` }} />}
          <div className="slot-info">
            <span className="slot-name">{match.player2}</span>
            <span className="slot-army">{match.player2Army}</span>
          </div>
          {match.score2 !== null && <span className="slot-score">{match.score2}</span>}
        </div>
      </div>
    );
  };

  const renderTournamentDetail = (tournament: Tournament) => {
    const standings = getStandings(tournament);

    return (
      <div className="tournament-detail">
        <div className="tournament-detail-header">
          <h3 className="tournament-detail-name">{tournament.name}</h3>
          <p className="tournament-detail-meta">
            {tournament.date} &bull; Swiss Format &bull; {tournament.totalRounds} Rounds &bull;{" "}
            <span className={`tournament-status status-${tournament.status}`}>
              {tournament.status.replace("-", " ").toUpperCase()}
            </span>
          </p>
        </div>

        <div className="standings-section">
          <h4 className="subsection-title">Final Standings</h4>
          <div className="standings-table">
            <div className="standings-header">
              <span className="col-rank">#</span>
              <span className="col-player">Player</span>
              <span className="col-record">W</span>
              <span className="col-record">L</span>
              <span className="col-record">D</span>
              <span className="col-pts">Pts</span>
              <span className="col-diff">Diff</span>
            </div>
            {standings.map((s, i) => (
              <div key={s.player} className={`standings-row ${i === 0 ? "first" : ""}`}>
                <span className="col-rank">{i + 1}</span>
                <div className="col-player">
                  {(() => {
                    const bg = getArmyBackground(s.army);
                    return bg ? <div className="standing-art" style={{ backgroundImage: `url(${bg})` }} /> : null;
                  })()}
                  <div className="standing-info">
                    <span className="standing-name">{s.player}</span>
                    <span className="standing-army">{s.army}</span>
                  </div>
                </div>
                <span className="col-record wins">{s.wins}</span>
                <span className="col-record losses">{s.losses}</span>
                <span className="col-record draws">{s.draws}</span>
                <span className="col-pts">{s.wins * 3 + s.draws}</span>
                <span className={`col-diff ${s.pointsFor - s.pointsAgainst > 0 ? "positive" : s.pointsFor - s.pointsAgainst < 0 ? "negative" : ""}`}>
                  {s.pointsFor - s.pointsAgainst > 0 ? "+" : ""}{s.pointsFor - s.pointsAgainst}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounds-section">
          <h4 className="subsection-title">Round Results</h4>
          {tournament.rounds.map((round) => (
            <div key={round.round} className="swiss-round">
              <h5 className="round-label">Round {round.round}</h5>
              {round.matches.length === 0 ? (
                <p className="round-pending">Pairings not yet determined</p>
              ) : (
                <div className="round-matches">
                  {round.matches.map(renderMatch)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
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

      <div className="history-tabs">
        <button
          className={`history-tab ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          ⚔️ Matches
        </button>
        <button
          className={`history-tab ${activeTab === "tournaments" ? "active" : ""}`}
          onClick={() => setActiveTab("tournaments")}
        >
          🏆 Tournaments
        </button>
      </div>

      {activeTab === "matches" && (
        <>
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
                    <div
                      className="card-art card-art-left"
                      style={getArmyBackground(game.player1Army)
                        ? { backgroundImage: `url(${getArmyBackground(game.player1Army)})` }
                        : undefined}
                    />
                    <div className="card-content">
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
                    </div>
                    <div
                      className="card-art card-art-right"
                      style={getArmyBackground(game.player2Army)
                        ? { backgroundImage: `url(${getArmyBackground(game.player2Army)})` }
                        : undefined}
                    />
                  </Link>
                );
              })
            )}
          </div>
        </>
      )}

      {activeTab === "tournaments" && (
        <div className="tournaments-tab">
          <div className="tournament-selector">
            <select
              className="tournament-dropdown"
              value={selectedTournament}
              onChange={(e) => setSelectedTournament(e.target.value)}
            >
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.date} ({t.status.replace("-", " ")})
                </option>
              ))}
            </select>
          </div>

          {currentTournament && renderTournamentDetail(currentTournament)}
        </div>
      )}
    </div>
  );
};

export default GameHistoryPage;
