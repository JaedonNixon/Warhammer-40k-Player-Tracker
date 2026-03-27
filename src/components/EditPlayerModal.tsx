import React, { useState } from "react";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { Player, Faction } from "../types";
import "../styles/AddPlayerModal.css";

interface EditPlayerModalProps {
  player: Player;
  onClose: () => void;
  onSaved: () => void;
  onDeleted?: () => void;
}

const FACTION_OPTIONS: { label: string; value: Faction }[] = [
  { label: "Adepta Sororitas", value: "sisters-of-battle" },
  { label: "Adeptus Custodes", value: "custodes" },
  { label: "Adeptus Mechanicus", value: "adeptus-mechanicus" },
  { label: "Astra Militarum", value: "imperial-guard" },
  { label: "Black Templars", value: "black-templars" },
  { label: "Chaos Knights", value: "chaos-knights" },
  { label: "Dark Angels", value: "dark-angels" },
  { label: "Death Guard", value: "death-guard" },
  { label: "Deathwatch", value: "deathwatch" },
  { label: "Drukhari", value: "dark-eldar" },
  { label: "Emperor's Children", value: "emperors-children" },
  { label: "Genestealer Cults", value: "genestealer-cults" },
  { label: "Grey Knights", value: "grey-knights" },
  { label: "Harlequins", value: "harlequins" },
  { label: "Imperial Fists", value: "imperial-fists" },
  { label: "Imperial Knights", value: "imperial-knights" },
  { label: "Iron Hands", value: "iron-hands" },
  { label: "Khorne Daemons", value: "khorne-daemons" },
  { label: "Leagues of Votann", value: "leagues-of-votann" },
  { label: "Necrons", value: "necrons" },
  { label: "Nurgle Daemons", value: "nurgle-daemons" },
  { label: "Orks", value: "orks" },
  { label: "Raven Guard", value: "raven-guard" },
  { label: "Salamanders", value: "salamanders" },
  { label: "Slaanesh Daemons", value: "slaanesh-daemons" },
  { label: "Space Wolves", value: "space-wolves" },
  { label: "T'au Empire", value: "tau" },
  { label: "Thousand Sons", value: "thousand-sons" },
  { label: "Tzeentch Daemons", value: "tzeentch-daemons" },
  { label: "Tyranids", value: "tyranids" },
  { label: "Ultramarines", value: "ultramarines" },
  { label: "White Scars", value: "white-scars" },
  { label: "World Eaters", value: "world-eaters" },
  { label: "Ynnari", value: "ynnari" },
];

const EditPlayerModal: React.FC<EditPlayerModalProps> = ({ player, onClose, onSaved, onDeleted }) => {
  const [name, setName] = useState(player.name);
  const [selectedFactions, setSelectedFactions] = useState<{ label: string; value: Faction }[]>(
    player.armies.map((a) => {
      const match = FACTION_OPTIONS.find((f) => f.value === a.faction);
      return { label: match?.label || a.name, value: a.faction };
    })
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Change ID state
  const [showChangeId, setShowChangeId] = useState(false);
  const [newAccountId, setNewAccountId] = useState(String(player.accountId));
  const [changeIdEmail, setChangeIdEmail] = useState("");
  const [changeIdPassword, setChangeIdPassword] = useState("");
  const [changingId, setChangingId] = useState(false);
  const [changeIdError, setChangeIdError] = useState("");

  // Factions that have games played — these cannot be removed
  const lockedFactions = new Set(
    player.armies.filter((a) => a.gamesPlayed > 0).map((a) => a.faction)
  );

  const toggleFaction = (faction: { label: string; value: Faction }) => {
    if (lockedFactions.has(faction.value)) return;
    setSelectedFactions((prev) => {
      const exists = prev.find((f) => f.value === faction.value);
      if (exists) return prev.filter((f) => f.value !== faction.value);
      return [...prev, faction];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Player name is required.");
      return;
    }
    if (selectedFactions.length === 0) {
      setError("Select at least one faction.");
      return;
    }

    setSaving(true);
    try {
      // Build updated armies: keep existing army stats for factions that already exist,
      // add new armies with zeroed stats for newly selected factions
      const existingByFaction = new Map(player.armies.map((a) => [a.faction, a]));
      const armies = selectedFactions.map((f) => {
        const existing = existingByFaction.get(f.value);
        if (existing) return existing;
        return {
          name: f.label,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          faction: f.value,
        };
      });

      await updateDoc(doc(db, "players", player.id), {
        name: name.trim(),
        theme: armies[0].faction,
        armies,
      });

      onSaved();
      onClose();
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError("");

    if (!deleteEmail.trim() || !deletePassword.trim()) {
      setDeleteError("Enter your admin credentials to confirm deletion.");
      return;
    }

    setDeleting(true);
    try {
      // Re-authenticate with provided credentials to confirm identity
      await signInWithEmailAndPassword(auth, deleteEmail.trim(), deletePassword);

      // Soft-delete: mark as deleted, preserve data under accountId
      await updateDoc(doc(db, "players", player.id), {
        deleted: true,
        deletedAt: new Date().toISOString(),
      });

      onDeleted?.();
      onClose();
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setDeleteError("Invalid credentials. Please try again.");
      } else {
        setDeleteError("Failed to delete player. Please try again.");
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleChangeId = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeIdError("");

    const parsed = parseInt(newAccountId, 10);
    if (isNaN(parsed) || parsed < 1) {
      setChangeIdError("Account ID must be a positive number.");
      return;
    }
    if (parsed === player.accountId) {
      setChangeIdError("That is already this player's ID.");
      return;
    }
    if (!changeIdEmail.trim() || !changeIdPassword.trim()) {
      setChangeIdError("Enter your admin credentials to confirm.");
      return;
    }

    setChangingId(true);
    try {
      // Check if the ID is already taken by any player (including deleted)
      const playersSnap = await getDocs(collection(db, "players"));
      const taken = playersSnap.docs.some((d) => {
        const data = d.data();
        return data.accountId === parsed && d.id !== player.id;
      });
      if (taken) {
        setChangeIdError(`Account ID #${parsed} is already assigned to another player.`);
        setChangingId(false);
        return;
      }

      // Re-authenticate
      await signInWithEmailAndPassword(auth, changeIdEmail.trim(), changeIdPassword);

      await updateDoc(doc(db, "players", player.id), {
        accountId: parsed,
      });

      onSaved();
      onClose();
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setChangeIdError("Invalid credentials. Please try again.");
      } else {
        setChangeIdError("Failed to change ID. Please try again.");
      }
    } finally {
      setChangingId(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {showChangeId ? (
          <>
            <h2 className="modal-title change-id-title">🔁 Change Account ID</h2>
            <div className="delete-warning change-id-warning">
              <p>You are changing the Account ID for <strong>{player.name}</strong> (currently #{player.accountId}).</p>
              <p><strong>⚠️ Warning:</strong> Changing a player's Account ID is a sensitive operation. It will update their displayed ID across the app. This does <em>not</em> affect game history linkage, but may cause confusion if other players or records reference the old ID number.</p>
              <p>Enter your admin credentials to confirm.</p>
            </div>

            <form onSubmit={handleChangeId} className="add-player-form">
              {changeIdError && <div className="modal-error">{changeIdError}</div>}

              <div className="modal-field">
                <label>New Account ID</label>
                <input
                  type="number"
                  min="1"
                  value={newAccountId}
                  onChange={(e) => setNewAccountId(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="modal-field">
                <label>Admin Email</label>
                <input
                  type="email"
                  value={changeIdEmail}
                  onChange={(e) => setChangeIdEmail(e.target.value)}
                  placeholder="Enter your email..."
                />
              </div>

              <div className="modal-field">
                <label>Admin Password</label>
                <input
                  type="password"
                  value={changeIdPassword}
                  onChange={(e) => setChangeIdPassword(e.target.value)}
                  placeholder="Enter your password..."
                />
              </div>

              <button type="submit" className="modal-submit change-id-confirm-btn" disabled={changingId}>
                {changingId ? "Updating..." : "Confirm ID Change"}
              </button>
              <button
                type="button"
                className="modal-submit cancel-delete-btn"
                onClick={() => { setShowChangeId(false); setChangeIdError(""); setNewAccountId(String(player.accountId)); }}
              >
                Cancel
              </button>
            </form>
          </>
        ) : showDeleteConfirm ? (
          <>
            <h2 className="modal-title delete-title">⚠️ Delete Player</h2>
            <div className="delete-warning">
              <p>You are about to delete <strong>{player.name}</strong> (Account ID #{player.accountId}).</p>
              <p>This will remove the player from all rosters and leaderboards. Game history data will be preserved.</p>
              <p>Enter your admin credentials to confirm.</p>
            </div>

            <form onSubmit={handleDelete} className="add-player-form">
              {deleteError && <div className="modal-error">{deleteError}</div>}

              <div className="modal-field">
                <label>Admin Email</label>
                <input
                  type="email"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  placeholder="Enter your email..."
                  autoFocus
                />
              </div>

              <div className="modal-field">
                <label>Admin Password</label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your password..."
                />
              </div>

              <button type="submit" className="modal-submit delete-confirm-btn" disabled={deleting}>
                {deleting ? "Deleting..." : "Confirm Deletion"}
              </button>
              <button
                type="button"
                className="modal-submit cancel-delete-btn"
                onClick={() => { setShowDeleteConfirm(false); setDeleteError(""); }}
              >
                Cancel
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="modal-title">Edit Player</h2>

            <form onSubmit={handleSubmit} className="add-player-form">
              {error && <div className="modal-error">{error}</div>}

              <div className="modal-field">
                <label>Player Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter player name..."
                  autoFocus
                />
              </div>

              <div className="modal-field">
                <label>Factions ({selectedFactions.length} selected)</label>
                <div className="faction-list">
                  {FACTION_OPTIONS.map((f) => {
                    const isSelected = selectedFactions.some((s) => s.value === f.value);
                    const isLocked = lockedFactions.has(f.value);
                    return (
                      <button
                        key={f.value}
                        type="button"
                        className={`faction-row ${isSelected ? "selected" : ""} ${isLocked ? "locked" : ""}`}
                        onClick={() => toggleFaction(f)}
                        title={isLocked ? "Has game history — cannot be removed" : ""}
                      >
                        {f.label}
                        {isLocked && <span className="lock-icon">🔒</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button type="submit" className="modal-submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <div className="modal-danger-actions">
                <button
                  type="button"
                  className="modal-change-id-btn"
                  onClick={() => setShowChangeId(true)}
                >
                  🔁 Change Account ID
                </button>
                <button
                  type="button"
                  className="modal-delete-btn"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  🗑️ Delete Player
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPlayerModal;
