// ============================================================
// COMPONENTE: MonthView
// Vista de un mes con tabs de días — estilo tech
// ============================================================
import { useState } from "react";
import DayView from "./DayView";

export default function MonthView({ mes, warmups }) {
  const [activeDay, setActiveDay] = useState(0);
  const diaActual = mes.dias[activeDay];
  const warmupDelDia = warmups?.find((w) => w.dia === diaActual.dia);

  return (
    <div style={styles.container}>

      {/* ─── Info del mes ─── */}
      <div style={styles.infoBar}>
        <InfoChip label="OBJ" value={mes.objetivo} />
        <InfoChip label="DUR" value={mes.duracion} />
        <InfoChip label="INICIO" value={mes.inicio} />
      </div>

      {/* ─── Selector de días ─── */}
      <div style={styles.dayTabs}>
        {mes.dias.map((dia, i) => (
          <button
            key={i}
            style={{ ...styles.tab, ...(activeDay === i ? styles.tabActive : {}) }}
            onClick={() => setActiveDay(i)}
          >
            <span style={activeDay === i ? styles.tabNumActive : styles.tabNum}>
              {String(dia.dia).padStart(2, "0")}
            </span>
            <span style={activeDay === i ? styles.tabSubActive : styles.tabSub}>
              DÍA
            </span>
          </button>
        ))}
      </div>

      {/* ─── Contenido ─── */}
      <DayView dia={diaActual} warmup={warmupDelDia} />
    </div>
  );
}

function InfoChip({ label, value }) {
  return (
    <div style={chipStyles.wrap}>
      <span style={chipStyles.label}>{label}</span>
      <span style={chipStyles.value}>{value}</span>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "14px" },
  infoBar: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  dayTabs: {
    display: "flex",
    gap: "5px",
    overflowX: "auto",
    scrollbarWidth: "none",
    paddingBottom: "2px",
  },
  tab: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "7px 14px",
    borderRadius: "8px",
    border: "1px solid #e4e4e4",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    gap: "1px",
    transition: "all 150ms ease",
  },
  tabActive: {
    background: "#0a0a0a",
    border: "1px solid #0a0a0a",
  },
  tabNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "15px",
    fontWeight: "700",
    color: "#737373",
    lineHeight: 1,
  },
  tabNumActive: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "15px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: 1,
  },
  tabSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "8px",
    fontWeight: "600",
    color: "#a8a8a8",
    letterSpacing: "0.1em",
  },
  tabSubActive: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "8px",
    fontWeight: "600",
    color: "#737373",
    letterSpacing: "0.1em",
  },
};

const chipStyles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "7px 10px",
    border: "1px solid #eeeeee",
    borderRadius: "8px",
    background: "#fafafa",
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "8px",
    fontWeight: "700",
    color: "#a8a8a8",
    letterSpacing: "0.12em",
  },
  value: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#171717",
    lineHeight: 1.2,
  },
};
