import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePlayers } from "../hooks/usePlayers";
import { useAuth } from "../hooks/useAuth";
import PlayerProfile from "../components/PlayerProfile";
import EditPlayerModal from "../components/EditPlayerModal";

const PlayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPlayer, loading } = usePlayers();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  if (loading) return <div style={{textAlign:'center',color:'#aaa',marginTop:'80px'}}>Loading...</div>;

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
      <PlayerProfile player={player} isAdmin={isAdmin} onEdit={() => setShowEditModal(true)} />
      {showEditModal && (
        <EditPlayerModal
          player={player}
          onClose={() => setShowEditModal(false)}
          onSaved={() => window.location.reload()}
          onDeleted={() => navigate('/players')}
        />
      )}
    </div>
  );
};

export default PlayerDetailPage;
