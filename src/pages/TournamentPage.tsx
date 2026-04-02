/**
 * TournamentPage.tsx — Dedicated tournament view (latest tournament)
 *
 * Route: /tournament
 *
 * Shows the FIRST tournament in the array (typically the most recent).
 * Layout:
 *   1. Header — tournament name, format (Swiss), round count, status badge
 *   2. Standings table — rank, player/army, W/L/D, points (3×W + 1×D), score diff
 *   3. Round results — each round's match cards with faction art
 *
 * Note: For viewing all tournaments, use GameHistoryPage's "Tournaments" tab.
 *
 * Data source: useTournaments (first tournament)
 * Styled by: styles/Tournament.css
 */
import React from "react";
import { getStandings, SwissMatch } from "../data/tournaments";
import { useTournaments } from "../hooks/useTournaments";
import { getArmyBackground } from "../utils/factionBackgrounds";
import "../styles/Tournament.css";

const TournamentPage: React.FC = () => {
  const { tournaments, loading } = useTournaments();

  if (loading) return <div className="tournament-page"><p style={{textAlign:'center',color:'#aaa',marginTop:'80px'}}>Loading...</p></div>;
  if (tournaments.length === 0) return <div className="tournament-page"><p style={{textAlign:'center',color:'#aaa',marginTop:'80px'}}>No tournaments found.</p></div>;

  const tournament = tournaments[0];
  const standings = getStandings(tournament);

  const renderMatch = (match: SwissMatch) => {
    const bg1 = getArmyBackground(match.player1Army);
    const bg2 = getArmyBackground(match.player2Army);
    const isPlayed = match.winner !== null;
    const p1Win = match.winner === match.player1;
    const p2Win = match.winner === match.player2;

    return (
      <div key={match.id} className={`swiss-match ${isPlayed ? "played" : ""}`}>
        <div className={`swiss-slot ${p1Win ? "winner" : ""} ${isPlayed && !p1Win && match.winner !== "draw" ? "loser" : ""}`}>
          {bg1 && <div className="slot-art" style={{ backgroundImage: `url(${bg1})` }} />}
          <div className="slot-info">
            <span className="slot-name">{match.player1}</span>
            <span className="slot-army">{match.player1Army}</span>
          </div>
          {match.score1 !== null && <span className="slot-score">{match.score1}</span>}
        </div>
        <div className="swiss-vs">VS</div>
        <div className={`swiss-slot ${p2Win ? "winner" : ""} ${isPlayed && !p2Win && match.winner !== "draw" ? "loser" : ""}`}>
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

  return (
    <div className="tournament-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🏆</span> {tournament.name}
        </h1>
        <p className="page-description">
          Swiss Format &bull; {tournament.totalRounds} Rounds &bull;{" "}
          <span className={`tournament-status status-${tournament.status}`}>
            {tournament.status.replace("-", " ").toUpperCase()}
          </span>
        </p>
      </header>

      {/* Standings Table */}
      <section className="standings-section">
        <h2 className="section-title">Standings</h2>
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
      </section>

      {/* Rounds */}
      <section className="rounds-section">
        <h2 className="section-title">Rounds</h2>
        {tournament.rounds.map((round) => (
          <div key={round.round} className="swiss-round">
            <h3 className="round-label">Round {round.round}</h3>
            {round.matches.length === 0 ? (
              <p className="round-pending">Pairings not yet determined</p>
            ) : (
              <div className="round-matches">
                {round.matches.map(renderMatch)}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default TournamentPage;
