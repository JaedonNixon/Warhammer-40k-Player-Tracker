import React from "react";
import { useParams, Link } from "react-router-dom";
import { usePlayers } from "../hooks/usePlayers";
import PlayerProfile from "../components/PlayerProfile";

const PlayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPlayer } = usePlayers();
  const player = getPlayer(id || "");

  if (!player) {
    return (
      <div className="not-found">
        <h1>⚠️ Player Not Found</h1>
        <p>This warrior has been lost to the Warp.</p>
        <Link to="/players" className="back-link">
          ← Return to Roster
        </Link>
      </div>
    );
  }

  return (
    <div className="player-detail-page">
      <div className="detail-nav">
        <Link to="/players" className="back-link">
          ← Back to Roster
        </Link>
      </div>
      <PlayerProfile player={player} />
    </div>
  );
};

export default PlayerDetailPage;
