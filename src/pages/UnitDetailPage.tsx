/**
 * UnitDetailPage.tsx — Full datasheet view for a single unit
 *
 * Route: /factions/:faction/:unitId
 *
 * Displays the complete unit datasheet:
 *   - Faction background image (behind the card)
 *   - Name + faction label
 *   - Stat line: M, T, SV, W, LD, OC
 *   - Ranged and melee weapon tables (name, range, A, BS/WS, S, AP, D, keywords)
 *   - Abilities list
 *   - Keywords tags
 *   - Points options (different model counts)
 *
 * Data source: data/units.ts (factionUnits map, looked up by URL params)
 * Styled by: styles/Factions.css
 */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { factionUnits, WeaponProfile } from "../data/units";
import { factionBackgrounds } from "../utils/factionBackgrounds";
import { Faction } from "../types";
import "../styles/Factions.css";

/** Maps faction display names to Faction slug IDs for background image lookup */
const factionKeyMap: Record<string, Faction> = {
  Ultramarines: "ultramarines",
  "Emperor's Children": "emperors-children",
};

const UnitDetailPage: React.FC = () => {
  const { faction, unitId } = useParams<{ faction: string; unitId: string }>();
  const decodedFaction = decodeURIComponent(faction || "");
  const units = factionUnits[decodedFaction] || [];
  const unit = units.find((u) => u.id === unitId);
  const factionKey = factionKeyMap[decodedFaction];
  const bgImage = factionKey ? factionBackgrounds[factionKey] : undefined;

  if (!unit) {
    return (
      <div className="unit-detail-page">
        <p className="unit-not-found">Unit not found.</p>
        <Link to="/factions" className="back-link">← Back to Factions</Link>
      </div>
    );
  }

  const renderWeaponTable = (weapons: WeaponProfile[], label: string) => {
    if (weapons.length === 0) return null;
    return (
      <div className="ud-weapon-section">
        <h3 className="ud-section-label">{label}</h3>
        <table className="ud-weapon-table">
          <thead>
            <tr>
              <th>Weapon</th>
              <th>Range</th>
              <th>A</th>
              <th>BS/WS</th>
              <th>S</th>
              <th>AP</th>
              <th>D</th>
              <th>Keywords</th>
            </tr>
          </thead>
          <tbody>
            {weapons.map((w, i) => (
              <tr key={i}>
                <td className="ud-wname">{w.name}</td>
                <td>{w.range}</td>
                <td>{w.attacks}</td>
                <td>{w.skill}</td>
                <td>{w.strength}</td>
                <td>{w.ap}</td>
                <td>{w.damage}</td>
                <td className="ud-wkeywords">
                  {w.keywords?.join(", ") || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="unit-detail-page">
      {bgImage && (
        <div
          className="factions-bg"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <Link to="/factions" className="back-link">← Back to Factions</Link>

      <div className="ud-card">
        {/* Header */}
        <div className="ud-header">
          <h1 className="ud-name">{unit.name}</h1>
          <span className="ud-faction">{unit.faction}</span>
        </div>

        {/* Stat line */}
        <div className="ud-stat-line">
          {[
            { label: "M", value: unit.profile.movement },
            { label: "T", value: unit.profile.toughness },
            { label: "SV", value: unit.profile.save },
            { label: "W", value: unit.profile.wounds },
            { label: "LD", value: unit.profile.leadership },
            { label: "OC", value: unit.profile.oc },
          ].map((s) => (
            <div key={s.label} className="ud-stat-box">
              <span className="ud-stat-label">{s.label}</span>
              <span className="ud-stat-value">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Weapons */}
        {renderWeaponTable(unit.rangedWeapons, "Ranged Weapons")}
        {renderWeaponTable(unit.meleeWeapons, "Melee Weapons")}

        {/* Abilities */}
        {unit.abilities.length > 0 && (
          <div className="ud-abilities">
            <h3 className="ud-section-label">Abilities</h3>
            <ul className="ud-abilities-list">
              {unit.abilities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Keywords */}
        <div className="ud-keywords">
          <h3 className="ud-section-label">Keywords</h3>
          <div className="ud-keyword-tags">
            {unit.keywords.map((kw) => (
              <span key={kw} className="ud-kw-tag">{kw}</span>
            ))}
          </div>
        </div>

        {/* Points */}
        <div className="ud-points">
          <h3 className="ud-section-label">Points</h3>
          <div className="ud-points-row">
            {unit.points.map((p, i) => (
              <div key={i} className="ud-points-block">
                <span className="ud-points-models">{p.models} models</span>
                <span className="ud-points-cost">{p.cost} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailPage;
