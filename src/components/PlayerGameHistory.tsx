import React from "react";
import { Link } from "react-router-dom";
import { Player } from "../types";
import { ThemeColors } from "../types";
import { getAllGames, Game } from "../data/games";

interface PlayerGameHistoryProps {
  player: Player;
  theme: ThemeColors;
}

const PlayerGameHistory: React.FC<PlayerGameHistoryProps> = ({ player, theme }) => {
  const allGames = getAllGames();
  const playerGames = allGames.filter(
    (g) => g.player1 === player.name || g.player2 === player.name
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getFinalScores = (game: Game) => {
    const lastTurn = game.turnScores[game.turnScores.length - 1];
    return lastTurn ? { p1: lastTurn.player1Points, p2: lastTurn.player2Points } : { p1: 0, p2: 0 };
  };

  const getResult = (game: Game): "win" | "loss" | "draw" => {
    if (game.winner === "draw") return "draw";
    if (game.player1 === player.name && game.winner === "player1") return "win";
    if (game.player2 === player.name && game.winner === "player2") return "win";
    return "loss";
  };

  const resultColors = {
    win: "#4caf50",
    loss: "#f44336",
    draw: "#ff9800",
  };

  const resultLabels = {
    win: "VICTORY",
    loss: "DEFEAT",
    draw: "DRAW",
  };

  return (
    <div className="player-game-history">
      {playerGames.length === 0 ? (
        <div className="no-history">
          <p>No battles recorded yet.</p>
        </div>
      ) : (
        <div className="player-history-list">
          {playerGames.map((game) => {
            const result = getResult(game);
            const scores = getFinalScores(game);
            const isPlayer1 = game.player1 === player.name;
            const opponent = isPlayer1 ? game.player2 : game.player1;
            const playerArmy = isPlayer1 ? game.player1Army : game.player2Army;
            const opponentArmy = isPlayer1 ? game.player2Army : game.player1Army;
            const playerScore = isPlayer1 ? scores.p1 : scores.p2;
            const opponentScore = isPlayer1 ? scores.p2 : scores.p1;

            return (
              <Link
                key={game.id}
                to={`/history/${game.id}`}
                className="player-history-card"
                style={{ borderLeft: `4px solid ${resultColors[result]}` }}
              >
                <div className="player-history-result" style={{ color: resultColors[result] }}>
                  {resultLabels[result]}
                </div>
                <div className="player-history-meta">
                  <span className="player-history-date">
                    {new Date(game.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="player-history-turn">Turn {game.finalTurn}</span>
                </div>
                <div className="player-history-matchup">
                  <div className="player-history-side">
                    <span className="player-history-name" style={{ color: theme.primary }}>
                      {player.name}
                    </span>
                    <span className="player-history-army">{playerArmy}</span>
                  </div>
                  <div className="player-history-score">
                    <span style={{ color: resultColors[result] }}>{playerScore}</span>
                    <span className="score-sep">–</span>
                    <span style={{ color: "#aaa" }}>{opponentScore}</span>
                  </div>
                  <div className="player-history-side right">
                    <span className="player-history-name" style={{ color: "#aaa" }}>
                      {opponent}
                    </span>
                    <span className="player-history-army">{opponentArmy}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlayerGameHistory;
