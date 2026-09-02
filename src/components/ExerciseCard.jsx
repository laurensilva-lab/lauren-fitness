import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const IconChevron = ({ open }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
             transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function ExerciseCard({ exercise, index, expanded, onToggle }) {
  const { nombre, series, reps, rir, kg, videoId, metodo } = exercise;

  return (
    <div style={{ ...s.card, ...(expanded ? s.cardOpen : {}) }}>
      {/* ─── Header ─── */}
      <button style={s.header} onClick={onToggle}>
        <span style={s.idx}>{String(index + 1).padStart(2, "0")}</span>
        <span style={s.name}>{nombre}</span>
        <span style={s.pill}>{series}×{reps}</span>
        <IconChevron open={expanded} />
      </button>

      {/* ─── Detalle expandido con animación ─── */}
      {expanded && (
        <div style={s.detail} className="anim-expand">
          <div style={s.divider} />
          <div style={s.statsRow}>
            <StatCell label="SERIES" value={series} />
            <StatCell label="REPS"   value={reps} mono />
            {rir && rir !== "-" && rir !== "--" && <StatCell label="RIR" value={rir} />}
            {kg  && kg  !== "-" && <StatCell label="PESO" value={kg} mono />}
          </div>
          {metodo && <div style={s.metodoBadge}><span style={s.metodoDot}>◆</span>{metodo}</div>}
          <div style={s.videoWrap}>
            <VideoPlayer videoId={videoId} title={nombre} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCell({ label, value, mono }) {
  return (
    <div style={sc.cell}>
      <span style={sc.label}>{label}</span>
      <span style={{ ...sc.value, ...(mono ? sc.mono : {}) }}>{value}</span>
    </div>
  );
}

const s = {
  card: {
    borderRadius: "10px", border: "1px solid #1e1e1e",
    background: "#111", marginBottom: "6px", overflow: "hidden",
    transition: "border-color 300ms ease, box-shadow 300ms ease, background 300ms ease",
  },
  cardOpen: {
    borderColor: "#2e2e2e",
    background: "#131313",
    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex", alignItems: "center", gap: "10px", width: "100%",
    padding: "13px 14px", background: "none", border: "none",
    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
  },
  idx: {
    fontFamily: "'JetBrains Mono',monospace", fontSize: "11px",
    fontWeight: "700", color: "#333", flexShrink: 0, minWidth: "22px",
    transition: "color 280ms ease",
  },
  name: { flex: 1, fontSize: "13.5px", fontWeight: "600", color: "#d0d0d0", lineHeight: 1.3, letterSpacing: "-0.01em" },
  pill: {
    padding: "3px 8px", background: "#1a1a1a", border: "1px solid #2a2a2a",
    borderRadius: "99px", fontSize: "11px", fontWeight: "600", color: "#555",
    fontFamily: "'JetBrains Mono',monospace", flexShrink: 0,
  },
  detail: { padding: "0 14px 14px" },
  divider: {
    height: "1px", marginBottom: "13px",
    background: "linear-gradient(90deg, transparent, #222 20%, #222 80%, transparent)",
  },
  statsRow: { display: "flex", gap: "6px", flexWrap: "wrap" },
  metodoBadge: {
    display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "10px",
    padding: "4px 10px", background: "#1e1e1e", border: "1px solid #2e2e2e",
    color: "#888", borderRadius: "4px", fontSize: "11px", fontWeight: "700",
    letterSpacing: "0.06em", textTransform: "uppercase",
    fontFamily: "'JetBrains Mono',monospace",
  },
  metodoDot: { fontSize: "7px", color: "#555" },
  videoWrap: { marginTop: "12px" },
};

const sc = {
  cell: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
    padding: "8px 12px", background: "#161616", border: "1px solid #222",
    borderRadius: "8px", minWidth: "54px",
    transition: "background 200ms ease",
  },
  label: {
    fontFamily: "'JetBrains Mono',monospace", fontSize: "9px",
    color: "#444", fontWeight: "700", letterSpacing: "0.1em",
  },
  value: { fontSize: "15px", fontWeight: "700", color: "#e0e0e0", lineHeight: 1 },
  mono:  { fontFamily: "'JetBrains Mono',monospace", fontSize: "13px" },
};
