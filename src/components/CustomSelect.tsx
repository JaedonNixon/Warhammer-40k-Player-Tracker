import React, { useState, useRef, useEffect } from "react";
import "../styles/CustomSelect.css";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, className }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder ?? "Select...";

  return (
    <div className={`custom-select-wrapper ${className ?? ""}`} ref={wrapperRef}>
      <button className="custom-select-btn" onClick={() => setOpen(!open)}>
        {selectedLabel}
        <span className="custom-select-arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="custom-select-dropdown" style={{ backgroundColor: "#1a1a1e" }}>
          {options.map((o) => (
            <div
              key={o.value}
              className={`custom-select-option ${o.value === value ? "active" : ""}`}
              style={{ backgroundColor: "#1a1a1e", color: o.value === value ? "#ffd600" : "#ccc" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,215,0,0.12)"; e.currentTarget.style.color = "#ffd600"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1a1a1e"; e.currentTarget.style.color = o.value === value ? "#ffd600" : "#ccc"; }}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
