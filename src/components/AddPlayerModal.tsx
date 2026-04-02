/**
 * AddPlayerModal.tsx — Modal dialog for creating a new player
 *
 * Used in: PlayersPage (admin-only "Add Player" button)
 *
 * Flow:
 *   1. Admin enters player name
 *   2. Selects an avatar emoji
 *   3. Selects one or more factions (multi-select toggle list)
 *   4. On submit:
 *      a. Generates a slug ID from the name (lowercase, hyphens)
 *      b. Auto-increments accountId (queries all players for max)
 *      c. Creates army entries with zeroed stats for each faction
 *      d. Writes to Firestore "players" collection via setDoc
 *
 * The modal uses the same CSS as EditPlayerModal (AddPlayerModal.css).
 * Callback props: onClose (dismiss), onAdded (trigger data refresh).
 *
 * Styled by: styles/AddPlayerModal.css
 */
import React, { useState } from "react";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Faction } from "../types";
import "../styles/AddPlayerModal.css";

interface AddPlayerModalProps {
  onClose: () => void;
  onAdded: () => void;
}

/** All available factions a player can be assigned to (alphabetical) */
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

/** Emoji choices for player avatar */
const AVATAR_OPTIONS = ["⚔️", "🛡️", "🗡️", "🏰", "🪓", "🔥", "🐺", "🎯", "🔔", "💀", "🦅", "👑", "⭐", "🌙", "🔱"];

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ onClose, onAdded }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("⚔️");
  const [selectedFactions, setSelectedFactions] = useState<{ label: string; value: Faction }[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleFaction = (faction: { label: string; value: Faction }) => {
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
      const id = name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const armies = selectedFactions.map((f) => ({
        name: f.label,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        faction: f.value,
      }));

      // Auto-increment accountId: find the highest existing ID and add 1
      const playersSnap = await getDocs(collection(db, "players"));
      let maxAccountId = 0;
      playersSnap.forEach((doc) => {
        const data = doc.data();
        if (typeof data.accountId === "number" && data.accountId > maxAccountId) {
          maxAccountId = data.accountId;
        }
      });

      const player = {
        id,
        accountId: maxAccountId + 1,
        name: name.trim(),
        avatar,
        theme: selectedFactions[0].value,
        totalWins: 0,
        totalLosses: 0,
        totalDraws: 0,
        armies,
        joinedDate: new Date().toISOString().split("T")[0],
      };

      await setDoc(doc(db, "players", id), player);
      onAdded();
      onClose();
    } catch (err) {
      setError("Failed to add player. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Add New Player</h2>

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
            <label>Avatar</label>
            <div className="avatar-grid">
              {AVATAR_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`avatar-option ${avatar === a ? "selected" : ""}`}
                  onClick={() => setAvatar(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label>Factions ({selectedFactions.length} selected)</label>
            <div className="faction-list">
              {FACTION_OPTIONS.map((f) => {
                const isSelected = selectedFactions.some((s) => s.value === f.value);
                return (
                  <button
                    key={f.value}
                    type="button"
                    className={`faction-row ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleFaction(f)}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" className="modal-submit" disabled={saving}>
            {saving ? "Adding..." : "Add Player"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlayerModal;
