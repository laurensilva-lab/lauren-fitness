import { useState } from "react";
import DayView from "./DayView";

export default function MonthView({ mes, warmups }) {
  const [activeDay, setActiveDay] = useState(0);
  const diaActual    = mes.dias[activeDay];
  const warmupDelDia = warmups?.find(w => w.dia === diaActual.dia);

  return (
    <div style={s.container}>
      {/* Info del mes */}
      <div style={s.infoBar}>
        <Chip label="OBJ"    value={mes.objetivo} />
        <Chip label="DUR"    value={mes.duracion} />
        <Chip label="INICIO" value={mes.inicio} />
      </div>

      {/* Tabs de días */}
      <div style={s.tabs}>
        {mes.dias.map((dia, i) => (
          <button
            key={i}
            style={{ ...s.tab, ...(activeDay === i ? s.tabActive : {}) }}
            onClick={() => setActiveDay(i)}
          >
            <span style={activeDay === i ? s.tabNumActive : s.tabNum}>
              {String(dia.dia).padStart(2, "0")}
            </span>
            <span style={activeDay === i ? s.tabSubActive : s.tabSub}>DÍA</span>
          </button>
        ))}
      </div>

      {/* DayView con checkKey único por mes+día */}
      <DayView
        dia={diaActual}
        warmup={warmupDelDia}
        checkKeyPrefix={`m${mes.mes}`}
      />
    </div>
  );
}

function Chip({ label, value }) {
  return (
    <div style={c.wrap}>
      <span style={c.label}>{label}</span>
      <span style={c.value}>{value}</span>
    </div>
  );
}

const s = {
  container: { display: "flex", flexDirection: "column", gap: "14px" },
  infoBar:   { display: "flex", gap: "6px", flexWrap: "wrap" },
  tabs: { display: "flex", gap: "5px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "2px" },
  tab: {
    flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
    padding: "8px 14px", borderRadius: "8px", border: "1px solid #1e1e1e",
    background: "#111", cursor: "pointer", fontFamily: "inherit", gap: "1px",
    transition: "all 260ms cubic-bezier(0.16,1,0.3,1)",
  },
  tabActive:    { background: "#fff", border: "1px solid #fff", boxShadow: "0 0 16px rgba(255,255,255,0.1)" },
  tabNum:       { fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#444", lineHeight: 1, transition: "color 260ms ease" },
  tabNumActive: { fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#000", lineHeight: 1 },
  tabSub:       { fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", color: "#333", letterSpacing: "0.1em" },
  tabSubActive: { fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", color: "#777", letterSpacing: "0.1em" },
};

const c = {
  wrap: { display: "flex", flexDirection: "column", gap: "2px", padding: "7px 11px", border: "1px solid #1e1e1e", borderRadius: "8px", background: "#111" },
  label: { fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", fontWeight: "700", color: "#333", letterSpacing: "0.12em" },
  value: { fontSize: "12px", fontWeight: "600", color: "#b0b0b0", lineHeight: 1.2 },
};
