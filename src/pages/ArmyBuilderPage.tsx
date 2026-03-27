import React, { useState } from "react";
import { factionUnits, Unit, WeaponProfile } from "../data/units";
import "../styles/ArmyBuilder.css";

interface ArmyEntry {
  unit: Unit;
  id: number;
}

const ArmyBuilderPage: React.FC = () => {
  const [selectedFaction] = useState("Ultramarines");
  const [army, setArmy] = useState<ArmyEntry[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [expandedArmy, setExpandedArmy] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);

  const availableUnits = factionUnits[selectedFaction] || [];

  const totalPoints = army.reduce((sum, entry) => {
    const pts = entry.unit.points[0];
    return sum + (pts ? pts.cost : 0);
  }, 0);

  const addUnit = (unit: Unit) => {
    setArmy([...army, { unit, id: nextId }]);
    setNextId(nextId + 1);
  };

  const removeUnit = (id: number) => {
    setArmy(army.filter((e) => e.id !== id));
    if (expandedArmy === id) setExpandedArmy(null);
  };

  const renderWeaponTable = (weapons: WeaponProfile[], type: "ranged" | "melee") => (
    <div className="weapon-section">
      <h5 className="weapon-type-label">{type === "ranged" ? "Ranged Weapons" : "Melee Weapons"}</h5>
      <div className="weapon-table">
        <div className="weapon-header">
          <span className="wcol-name">Weapon</span>
          <span className="wcol">Range</span>
          <span className="wcol">A</span>
          <span className="wcol">{type === "ranged" ? "BS" : "WS"}</span>
          <span className="wcol">S</span>
          <span className="wcol">AP</span>
          <span className="wcol">D</span>
        </div>
        {weapons.map((w) => (
          <div key={w.name} className="weapon-row">
            <span className="wcol-name">
              {w.name}
              {w.keywords && w.keywords.length > 0 && (
                <span className="weapon-keywords">
                  [{w.keywords.join(", ")}]
                </span>
              )}
            </span>
            <span className="wcol">{w.range}</span>
            <span className="wcol">{w.attacks}</span>
            <span className="wcol">{w.skill}</span>
            <span className="wcol">{w.strength}</span>
            <span className="wcol">{w.ap}</span>
            <span className="wcol">{w.damage}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUnitStats = (unit: Unit) => (
    <div className="unit-stats">
      <div className="stat-grid">
        <div className="stat-box"><span className="stat-label">M</span><span className="stat-val">{unit.profile.movement}</span></div>
        <div className="stat-box"><span className="stat-label">T</span><span className="stat-val">{unit.profile.toughness}</span></div>
        <div className="stat-box"><span className="stat-label">SV</span><span className="stat-val">{unit.profile.save}</span></div>
        <div className="stat-box"><span className="stat-label">W</span><span className="stat-val">{unit.profile.wounds}</span></div>
        <div className="stat-box"><span className="stat-label">LD</span><span className="stat-val">{unit.profile.leadership}</span></div>
        <div className="stat-box"><span className="stat-label">OC</span><span className="stat-val">{unit.profile.oc}</span></div>
      </div>
      {unit.rangedWeapons.length > 0 && renderWeaponTable(unit.rangedWeapons, "ranged")}
      {unit.meleeWeapons.length > 0 && renderWeaponTable(unit.meleeWeapons, "melee")}
      {unit.abilities.length > 0 && (
        <div className="abilities-section">
          <h5 className="weapon-type-label">Abilities</h5>
          <ul className="abilities-list">
            {unit.abilities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="points-info">
        {unit.points.map((p) => (
          <span key={p.models} className="points-tag">{p.models} models — {p.cost} pts</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="army-builder-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🛠️</span> Army Builder
        </h1>
        <p className="page-description">
          Forge your army for the battles ahead
        </p>
      </header>

      <div className="builder-layout">
        {/* Left Panel — Unit Catalog */}
        <div className="unit-catalog">
          <div className="catalog-header">
            <h3 className="catalog-title">{selectedFaction}</h3>
            <span className="catalog-count">{availableUnits.length} units</span>
          </div>
          <div className="catalog-list">
            {availableUnits.map((unit) => (
              <div key={unit.id} className="catalog-unit">
                <div className="catalog-unit-header">
                  <div
                    className="catalog-unit-clickable"
                    onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                  >
                    <div className="catalog-unit-info">
                      <span className="catalog-unit-name">{unit.name}</span>
                      <span className="catalog-unit-pts">{unit.points[0].cost} pts</span>
                    </div>
                    <div className="catalog-unit-keywords">
                      {unit.keywords.filter(k => ["Infantry", "Battleline", "Vehicle", "Monster"].includes(k)).map(k => (
                        <span key={k} className="keyword-tag">{k}</span>
                      ))}
                    </div>
                  </div>
                  <button className="quick-add-btn" onClick={() => addUnit(unit)} title="Add to army">+</button>
                </div>
                {expandedUnit === unit.id && (
                  <div className="catalog-unit-detail">
                    {renderUnitStats(unit)}
                    <button className="add-unit-btn" onClick={() => addUnit(unit)}>
                      + Add to Army
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Your Army */}
        <div className="army-list-panel">
          <div className="army-header">
            <h3 className="army-title">Your Army</h3>
            <span className="army-points">{totalPoints} pts</span>
          </div>
          {army.length === 0 ? (
            <div className="army-empty">
              <p>Add units from the catalog to start building</p>
            </div>
          ) : (
            <div className="army-entries">
              {army.map((entry) => (
                <div key={entry.id} className="army-entry">
                  <div
                    className="army-entry-header"
                    onClick={() => setExpandedArmy(expandedArmy === entry.id ? null : entry.id)}
                  >
                    <span className="army-entry-name">{entry.unit.name}</span>
                    <div className="army-entry-actions">
                      <span className="army-entry-pts">{entry.unit.points[0].cost} pts</span>
                      <button
                        className="remove-unit-btn"
                        onClick={(e) => { e.stopPropagation(); removeUnit(entry.id); }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  {expandedArmy === entry.id && (
                    <div className="army-entry-detail">
                      {renderUnitStats(entry.unit)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArmyBuilderPage;
