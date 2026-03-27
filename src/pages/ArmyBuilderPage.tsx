import React, { useState } from "react";
import { factionUnits, alliedUnits, alliedFactionNames, Unit, WeaponProfile } from "../data/units";
import CustomSelect from "../components/CustomSelect";
import "../styles/ArmyBuilder.css";

interface ArmyEntry {
  unit: Unit;
  id: number;
  pointsIndex: number;
  isAllied: boolean;
}

const factionOptions = Object.keys(factionUnits);

const ArmyBuilderPage: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState("Ultramarines");
  const [army, setArmy] = useState<ArmyEntry[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [expandedAllied, setExpandedAllied] = useState<string | null>(null);
  const [expandedArmy, setExpandedArmy] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);

  const availableUnits = factionUnits[selectedFaction] || [];
  const availableAllied = alliedUnits[selectedFaction] || [];
  const alliedLabel = alliedFactionNames[selectedFaction] || "Allied Units";

  const totalPoints = army.reduce((sum, entry) => {
    const pts = entry.unit.points[entry.pointsIndex];
    return sum + (pts ? pts.cost : 0);
  }, 0);

  const addUnit = (unit: Unit, pointsIndex: number = 0, isAllied: boolean = false) => {
    setArmy([...army, { unit, id: nextId, pointsIndex, isAllied }]);
    setNextId(nextId + 1);
  };

  const isUniqueInArmy = (unit: Unit) =>
    unit.keywords.includes("Epic Hero") && army.some((e) => e.unit.id === unit.id);

  const getUnitCategory = (unit: Unit): string => {
    const kw = unit.keywords;
    if (kw.includes("Character")) return "Characters";
    if (kw.includes("Battleline")) return "Battleline";
    if (kw.includes("Dedicated Transport")) return "Dedicated Transports";
    return "Other Datasheets";
  };

  const categoryOrder = ["Characters", "Battleline", "Dedicated Transports", "Other Datasheets"];

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
        <div className="catalog-column">
          {/* Left Panel — Unit Catalog */}
          <div className="unit-catalog">
          <div className="catalog-header">
            <CustomSelect
              value={selectedFaction}
              onChange={(v) => {
                if (army.length > 0) {
                  if (!window.confirm("Switching factions will clear your army list. Continue?")) return;
                  setArmy([]);
                  setNextId(1);
                }
                setSelectedFaction(v);
                setExpandedUnit(null);
              }}
              options={factionOptions.map((f) => ({ label: f, value: f }))}
            />
            <span className="catalog-count">{availableUnits.length} units</span>
          </div>
          <div className="catalog-list">
            {(() => {
              const grouped: Record<string, Unit[]> = {};
              availableUnits.forEach((unit) => {
                const cat = getUnitCategory(unit);
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(unit);
              });

              return categoryOrder
                .filter((cat) => grouped[cat] && grouped[cat].length > 0)
                .map((cat) => (
                  <div key={cat} className="catalog-category">
                    <div className="catalog-category-header">
                      <span className="catalog-category-name">{cat}</span>
                      <span className="catalog-category-count">{grouped[cat].length}</span>
                    </div>
                    {grouped[cat].map((unit) => {
                      const locked = isUniqueInArmy(unit);
                      const hasMultipleSizes = unit.points.length > 1;
                      return (
                      <div key={unit.id} className={`catalog-unit ${locked ? "unit-locked" : ""}`}>
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
                          {!hasMultipleSizes ? (
                            <button className="quick-add-btn" onClick={() => addUnit(unit, 0)} title={locked ? "Already in army (unique)" : "Add to army"} disabled={locked}>+</button>
                          ) : (
                            <div className="quick-size-btns">
                              {unit.points.map((p, i) => (
                                <button
                                  key={i}
                                  className="quick-add-btn quick-size-btn"
                                  onClick={() => addUnit(unit, i)}
                                  title={locked ? "Already in army (unique)" : `Add ${p.models} models`}
                                  disabled={locked}
                                >{p.models}</button>
                              ))}
                            </div>
                          )}
                        </div>
                        {expandedUnit === unit.id && (
                          <div className="catalog-unit-detail">
                            {renderUnitStats(unit)}
                            <div className="size-picker">
                              {unit.points.map((p, i) => (
                                <button
                                  key={i}
                                  className="size-picker-btn"
                                  onClick={() => addUnit(unit, i)}
                                  disabled={locked}
                                >
                                  + Add {p.models} {p.models === 1 ? "model" : "models"} — {p.cost} pts
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                ));
            })()}
          </div>
        </div>

        {/* Allied Units Block */}
        {availableAllied.length > 0 && (
          <div className="unit-catalog allied-catalog">
            <div className="catalog-header allied-header">
              <h3 className="catalog-title">{alliedLabel}</h3>
              <span className="catalog-count">{availableAllied.length} units</span>
            </div>
            <div className="catalog-list">
              {availableAllied.map((unit) => (
                <div key={unit.id} className="catalog-unit">
                  <div className="catalog-unit-header">
                    <div
                      className="catalog-unit-clickable"
                      onClick={() => setExpandedAllied(expandedAllied === unit.id ? null : unit.id)}
                    >
                      <div className="catalog-unit-info">
                        <span className="catalog-unit-name">{unit.name}</span>
                        <span className="catalog-unit-pts">{unit.points[0].cost} pts</span>
                      </div>
                      <div className="catalog-unit-keywords">
                        {unit.keywords.filter(k => ["Infantry", "Battleline", "Vehicle", "Monster", "Walker"].includes(k)).map(k => (
                          <span key={k} className="keyword-tag">{k}</span>
                        ))}
                      </div>
                    </div>
                    <button className="quick-add-btn" onClick={() => addUnit(unit, 0, true)} title="Add to army">+</button>
                  </div>
                  {expandedAllied === unit.id && (
                    <div className="catalog-unit-detail">
                      {renderUnitStats(unit)}
                      <button className="add-unit-btn" onClick={() => addUnit(unit, 0, true)}>
                        + Add to Army
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
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
              {(() => {
                const getCategory = (entry: ArmyEntry): string => {
                  if (entry.isAllied) return "Allied Units";
                  return getUnitCategory(entry.unit);
                };

                const armyCategoryOrder = [...categoryOrder, "Allied Units"];
                const grouped: Record<string, ArmyEntry[]> = {};
                army.forEach((entry) => {
                  const cat = getCategory(entry);
                  if (!grouped[cat]) grouped[cat] = [];
                  grouped[cat].push(entry);
                });

                return armyCategoryOrder
                  .filter((cat) => grouped[cat] && grouped[cat].length > 0)
                  .map((cat) => (
                    <div key={cat} className="army-category">
                      <div className="army-category-header">
                        <span className="army-category-name">{cat}</span>
                        <span className="army-category-count">{grouped[cat].length}</span>
                      </div>
                      {grouped[cat].map((entry) => (
                        <div key={entry.id} className="army-entry">
                          <div
                            className="army-entry-header"
                            onClick={() => setExpandedArmy(expandedArmy === entry.id ? null : entry.id)}
                          >
                            <span className="army-entry-name">{entry.unit.name}</span>
                            <div className="army-entry-actions">
                              <span className="army-entry-pts">
                                {entry.unit.points[entry.pointsIndex].models} models — {entry.unit.points[entry.pointsIndex].cost} pts
                              </span>
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
                  ));
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArmyBuilderPage;
