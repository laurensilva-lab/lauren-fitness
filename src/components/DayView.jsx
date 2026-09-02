import { useState } from "react";
import ExerciseCard from "./ExerciseCard";

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
             transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconWarmup = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#555" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
  </svg>
);

export default function DayView({ dia, warmup }) {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [warmupOpen,  setWarmupOpen]  = useState(false);
  const toggle = (i) => setExpandedIdx(expandedIdx === i ? null : i);

  return (
    <div style={s.container}>
      {/* Header del día */}
      <div style={s.header}>
        <div style={s.dayTag}>
          <span style={s.dayLabel}>DAY</span>
          <span style={s.dayNum}>{String(dia.dia).padStart(2, "0")}</span>
        </div>
        {dia.tipo && <span style={s.tipo}>{dia.tipo}</span>}
        <span style={s.count}>{dia.ejercicios.length} EJ.</span>
      </div>

      {/* Calentamiento */}
      {warmup?.ejercicios?.length > 0 && (
        <div style={s.warmupBox}>
          <button style={s.warmupBtn} onClick={() => setWarmupOpen(!warmupOpen)}>
            <IconWarmup />
            <span style={s.warmupTitle}>ENTRADA EN CALOR</span>
            <span style={s.warmupCount}>{warmup.ejercicios.length} ejercicios</span>
            <span style={{ marginLeft: "auto" }}><IconChevron open={warmupOpen} /></span>
          </button>
          {warmupOpen && (
            <div style={s.warmupList} className="anim-expand">
              {warmup.ejercicios.map((ej, i) => (
                <div key={i} style={{ ...s.warmupItem, animationDelay: `${i * 40}ms` }} className="anim-fade-up">
                  <span style={s.warmupDash}>—</span>
                  <div>
                    <div style={s.warmupName}>{ej.nombre}</div>
                    <div style={s.warmupMeta}>{ej.series} series · {ej.reps}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ejercicios */}
      <div style={s.list}>
        {dia.ejercicios.map((ej, i) => (
          <div key={i} className="anim-fade-up" style={{ animationDelay: `${i * 35}ms` }}>
            <ExerciseCard
              exercise={ej} index={i}
              expanded={expandedIdx === i}
              onToggle={() => toggle(i)}
            />
          </div>
        ))}
      </div>

      {dia.ejercicios.some(e => String(e.series).includes("AMRAP")) && (
        <div style={s.note}>
          <span style={s.noteTag}>AMRAP</span>
          As Many Reps As Possible — tantas reps como puedas con buena técnica.
        </div>
      )}
    </div>
  );
}

const s = {
  container: { display: "flex", flexDirection: "column", gap: "12px" },
  header: {
    display: "flex", alignItems: "center", gap: "10px",
    paddingBottom: "13px", borderBottom: "1px solid #1a1a1a",
  },
  dayTag: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "4px 10px", background: "#fff", borderRadius: "6px",
    boxShadow: "0 0 16px rgba(255,255,255,0.1)",
  },
  dayLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", color: "#888", fontWeight: "700", letterSpacing: "0.12em" },
  dayNum:   { fontFamily: "'JetBrains Mono',monospace", fontSize: "18px", color: "#000", fontWeight: "700", lineHeight: 1 },
  tipo:     { flex: 1, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" },
  count:    { fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#333", fontWeight: "600", letterSpacing: "0.06em" },
  // Calentamiento
  warmupBox: { border: "1px solid #1e1e1e", borderRadius: "10px", overflow: "hidden", background: "#0e0e0e" },
  warmupBtn: {
    display: "flex", alignItems: "center", gap: "8px", width: "100%",
    padding: "11px 13px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
    transition: "background 200ms ease",
  },
  warmupTitle: { fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", fontWeight: "700", color: "#444", letterSpacing: "0.08em" },
  warmupCount: { fontSize: "11px", color: "#333", fontWeight: "500" },
  warmupList: { padding: "10px 13px 13px", borderTop: "1px solid #1a1a1a", display: "flex", flexDirection: "column", gap: "10px" },
  warmupItem: { display: "flex", gap: "10px", alignItems: "flex-start" },
  warmupDash: { fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#2a2a2a", marginTop: "2px", flexShrink: 0 },
  warmupName: { fontSize: "13px", fontWeight: "600", color: "#c0c0c0", lineHeight: 1.3 },
  warmupMeta: { fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#444", marginTop: "2px" },
  list: { display: "flex", flexDirection: "column" },
  note: {
    padding: "10px 12px", background: "#0e0e0e", border: "1px solid #1e1e1e",
    borderRadius: "8px", fontSize: "12px", color: "#555", lineHeight: 1.5,
    display: "flex", gap: "8px", alignItems: "flex-start",
  },
  noteTag: {
    flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "9px",
    fontWeight: "700", color: "#000", background: "#fff", padding: "2px 6px",
    borderRadius: "3px", letterSpacing: "0.06em", marginTop: "1px",
  },
};
