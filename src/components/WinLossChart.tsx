/**
 * WinLossChart.tsx — Doughnut chart showing W/L/D breakdown
 *
 * Uses Chart.js (via react-chartjs-2) to render a doughnut chart.
 * Colors: green (wins), red (losses), orange (draws).
 * Border and tooltip colors match the player's faction theme.
 *
 * NOTE: This component is defined but currently NOT rendered in the app.
 * The PlayerProfile uses PlayerGameHistory + ArmyList instead.
 * It could be re-added to the profile layout in the future.
 */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Player } from "../types";
import { getThemeColors } from "../styles/themes";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface WinLossChartProps {
  player: Player;
}

const WinLossChart: React.FC<WinLossChartProps> = ({ player }) => {
  const theme = getThemeColors(player.theme);

  const data = {
    labels: ["Wins", "Losses", "Draws"],
    datasets: [
      {
        data: [player.totalWins, player.totalLosses, player.totalDraws],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
        borderColor: [theme.cardBg, theme.cardBg, theme.cardBg],
        borderWidth: 3,
        hoverBorderColor: [theme.primary, theme.primary, theme.primary],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#e0e0e0",
          font: { size: 13, family: "Roboto" },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: theme.cardBg,
        titleColor: theme.primary,
        bodyColor: "#e0e0e0",
        borderColor: theme.primary,
        borderWidth: 1,
      },
    },
    cutout: "60%",
  };

  return (
    <div className="chart-container" style={{ height: "280px", position: "relative" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default WinLossChart;
