import React from "react";
import { Army } from "../types";
import { ThemeColors } from "../types";
import { getThemeColors } from "../styles/themes";

interface ArmyListProps {
  armies: Army[];
  theme: ThemeColors;
}

const ArmyList: React.FC<ArmyListProps> = ({ armies, theme }) => {
  const sorted = [...armies].sort((a, b) => b.gamesPlayed - a.gamesPlayed);
  const maxGames = sorted.length > 0 ? sorted[0].gamesPlayed : 1;

  return (
    <div className="army-list">
      <h3 className="section-title" style={{ color: theme.primary }}>
        ⚔️ Army Roster
      </h3>
      <div className="army-items">
        {sorted.map((army, index) => {
          const armyTheme = getThemeColors(army.faction);
          const armyWinRate =
            army.gamesPlayed > 0 ? Math.round((army.wins / army.gamesPlayed) * 100) : 0;
          const barWidth = (army.gamesPlayed / maxGames) * 100;

          return (
            <div
              key={army.name}
              className="army-item"
              style={{
                borderLeft: `4px solid ${armyTheme.primary}`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="army-header">
                <div className="army-rank" style={{ color: armyTheme.accent }}>
                  #{index + 1}
                </div>
                <div className="army-info">
                  <h4 className="army-name" style={{ color: armyTheme.primary }}>
                    {army.name}
                  </h4>
                  <div className="army-stats-row">
                    <span className="army-stat">
                      <span className="stat-icon">🎮</span> {army.gamesPlayed} games
                    </span>
                    <span className="army-stat win">
                      <span className="stat-icon">✅</span> {army.wins}W
                    </span>
                    <span className="army-stat loss">
                      <span className="stat-icon">❌</span> {army.losses}L
                    </span>
                    <span className="army-stat draw">
                      <span className="stat-icon">➖</span> {army.draws}D
                    </span>
                  </div>
                </div>
                <div className="army-winrate" style={{ color: armyTheme.accent }}>
                  {armyWinRate}%
                  <span className="winrate-label">win rate</span>
                </div>
              </div>
              <div className="army-bar-track">
                <div
                  className="army-bar-fill"
                  style={{
                    width: `${barWidth}%`,
                    background: `linear-gradient(90deg, ${armyTheme.primary}, ${armyTheme.accent})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArmyList;
