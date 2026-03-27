import React, { useState } from "react";
import { Link } from "react-router-dom";
import { factionUnits } from "../data/units";
import CustomSelect from "../components/CustomSelect";
import "../styles/Factions.css";

const factions = Object.keys(factionUnits);

const FactionsPage: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<string>("");

  const units = selectedFaction ? factionUnits[selectedFaction] || [] : [];

  return (
    <div className="factions-page">
      <h1 className="factions-title">Factions</h1>

      <div className="faction-selector">
        <CustomSelect
          value={selectedFaction}
          onChange={setSelectedFaction}
          placeholder="— Select a Faction —"
          options={[
            { label: "— Select a Faction —", value: "" },
            ...factions.map((f) => ({ label: f, value: f }))
          ]}
        />
      </div>

      {selectedFaction && (
        <div className="faction-units">
          <h2 className="faction-units-title">{selectedFaction} — Units</h2>
          <div className="faction-unit-grid">
            {units.map((unit) => (
              <Link
                key={unit.id}
                to={`/factions/${encodeURIComponent(selectedFaction)}/${unit.id}`}
                className="faction-unit-card"
              >
                <div className="faction-unit-card-header">
                  <span className="faction-unit-card-name">{unit.name}</span>
                  <span className="faction-unit-card-pts">
                    {unit.points[0].cost} pts
                  </span>
                </div>
                <div className="faction-unit-card-stats">
                  <span className="mini-stat">M {unit.profile.movement}</span>
                  <span className="mini-stat">T {unit.profile.toughness}</span>
                  <span className="mini-stat">SV {unit.profile.save}</span>
                  <span className="mini-stat">W {unit.profile.wounds}</span>
                </div>
                <div className="faction-unit-card-keywords">
                  {unit.keywords.slice(0, 4).map((kw) => (
                    <span key={kw} className="faction-kw-tag">{kw}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {selectedFaction && units.length === 0 && (
        <p className="faction-empty">No units found for {selectedFaction}.</p>
      )}
    </div>
  );
};

export default FactionsPage;
