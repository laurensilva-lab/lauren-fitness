// ============================================================
// COMPONENTE: DayView
// Vista de un día de entrenamiento — diseño tech minimalista
// ============================================================
import { useState } from "react";
import ExerciseCard from "./ExerciseCard";

// Ícono de fuego lineal (calentamiento)
const IconWarmup = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
  </svg>
);

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 200ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function DayView({ dia, warmup }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [warmupExpanded, setWarmupExpanded] = useState(false);

  const toggle = (i) => setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <div style={styles.container}>

      {/* ─── Header del día ─── */}
      <div style={styles.header}>
        <div style={styles.dayTag}>
          <span style={styles.dayLabel}>DAY</span>
          <span style={styles.dayNum}>{String(dia.dia).padStart(2, "0")}</span>
        </div>
        {dia.tipo && (
          <span style={styles.tipo}>{dia.tipo}</span>
        )}
        <span style={styles.count}>
          {dia.ejercicios.length} EJ.
        </span>
      </div>

      {/* ─── Calentamiento ─── */}
      {warmup && warmup.ejercicios.length > 0 && (
        <div style={styles.warmupBox}>
          <button style={styles.warmupToggle} onClick={() => setWarmupExpanded(!warmupExpanded)}>
            <span style={styles.warmupIcon}><IconWarmup /></span>
            <span style={styles.warmupTitle}>ENTRADA EN CALOR</span>
            <span style={styles.warmupCount}>{warmup.ejercicios.length} ejercicios</span>
            <span style={{ color: "#a8a8a8", marginLeft: "auto" }}><IconChevron open={warmupExpanded} /></span>
          </button>

          {warmupExpanded && (
            <div style={styles.warmupList}>
              {warmup.ejercicios.map((ej, i) => (
                <div key={i} style={styles.warmupItem}>
                  <span style={styles.warmupDot}>—</span>
                  <div>
                    <div style={styles.warmupName}>{ej.nombre}</div>
                    <div style={styles.warmupMeta}>{ej.series} series · {ej.reps}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Ejercicios ─── */}
      <div style={styles.list}>
        {dia.ejercicios.map((ejercicio, i) => (
          <ExerciseCard
            key={i}
            exercise={ejercicio}
            index={i}
            expanded={expandedIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* Nota AMRAP */}
      {dia.ejercicios.some((e) => String(e.series).includes("AMRAP")) && (
        <div style={styles.note}>
          <span style={styles.noteTag}>AMRAP</span>
          As Many Reps As Possible — tantas repeticiones como puedas con buena técnica.
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "12px" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingBottom: "12px",
    borderBottom: "1px solid #eeeeee",
  },
  dayTag: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4px 10px",
    background: "#0a0a0a",
    borderRadius: "6px",
    gap: "0px",
  },
  dayLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "8px",
    color: "#737373",
    fontWeight: "700",
    letterSpacing: "0.12em",
  },
  dayNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "18px",
    color: "#fff",
    fontWeight: "700",
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },
  tipo: {
    flex: 1,
    fontSize: "11px",
    fontWeight: "700",
    color: "#737373",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  },
  count: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    color: "#a8a8a8",
    fontWeight: "600",
    letterSpacing: "0.06em",
  },
  // Calentamiento
  warmupBox: {
    border: "1px solid #eeeeee",
    borderRadius: "10px",
    overflow: "hidden",
  },
  warmupToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "11px 13px",
    background: "#fafafa",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  warmupIcon: { color: "#737373", display: "flex" },
  warmupTitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    fontWeight: "700",
    color: "#404040",
    letterSpacing: "0.08em",
  },
  warmupCount: {
    marginLeft: "auto",
    fontSize: "11px",
    color: "#a8a8a8",
    fontWeight: "500",
  },
  warmupList: {
    padding: "10px 13px 13px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },
  warmupItem: { display: "flex", gap: "10px", alignItems: "flex-start" },
  warmupDot: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    color: "#d1d1d1",
    marginTop: "2px",
    flexShrink: 0,
  },
  warmupName: { fontSize: "13px", fontWeight: "600", color: "#171717", lineHeight: 1.3 },
  warmupMeta: { fontSize: "11px", color: "#a8a8a8", marginTop: "2px", fontFamily: "'JetBrains Mono', monospace" },
  list: { display: "flex", flexDirection: "column" },
  note: {
    padding: "10px 12px",
    background: "#fafafa",
    border: "1px solid #eeeeee",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#737373",
    lineHeight: 1.5,
    display: "flex",
    gap: "8px",
    alignItems: "flex-start",
  },
  noteTag: {
    flexShrink: 0,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "9px",
    fontWeight: "700",
    color: "#fff",
    background: "#0a0a0a",
    padding: "2px 6px",
    borderRadius: "3px",
    letterSpacing: "0.06em",
    marginTop: "1px",
  },
};
