// ============================================================
// COMPONENTE: ExerciseCard
// Tarjeta de ejercicio con checkbox de completado por serie.
// Los checks se guardan en localStorage via prop onCheck.
// ============================================================
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

// Checkbox animado — check visual elegante
function SerieCheck({ done, onToggle }) {
  return (
    <button
      style={{ ...cs.box, ...(done ? cs.boxDone : {}) }}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      aria-label="Marcar serie"
    >
      {done && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: "fadeIn 150ms ease both" }}>
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
    </button>
  );
}

export default function ExerciseCard({ exercise, index, expanded, onToggle, checkKey }) {
  const { nombre, series, reps, rir, kg, videoId, metodo } = exercise;

  // Número de series como entero
  const numSeries = parseInt(String(series).replace(/\D.*/, "")) || 1;

  // Estado local de qué series están completadas: [false, false, ...]
  // Guardado en localStorage con clave única por ejercicio
  const storageKey = `lauren_check_${checkKey}_${index}`;
  const [done, setDone] = useState(() => {
    try {
      const s = localStorage.getItem(storageKey);
      return s ? JSON.parse(s) : Array(numSeries).fill(false);
    } catch { return Array(numSeries).fill(false); }
  });

  const toggleSerie = (i) => {
    const next = done.map((v, idx) => idx === i ? !v : v);
    setDone(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  const resetAll = (e) => {
    e.stopPropagation();
    const fresh = Array(numSeries).fill(false);
    setDone(fresh);
    try { localStorage.setItem(storageKey, JSON.stringify(fresh)); } catch {}
  };

  const allDone   = done.every(Boolean);
  const doneCnt   = done.filter(Boolean).length;
  const progress  = numSeries > 0 ? doneCnt / numSeries : 0;

  return (
    <div style={{
      ...s.card,
      ...(expanded  ? s.cardOpen  : {}),
      ...(allDone   ? s.cardDone  : {}),
    }}>

      {/* ── Barra de progreso superior ── */}
      <div style={s.progressBar}>
        <div style={{ ...s.progressFill, width: `${progress * 100}%` }} />
      </div>

      {/* ── Header ── */}
      <button style={s.header} onClick={onToggle}>
        <span style={{ ...s.idx, ...(allDone ? s.idxDone : {}) }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ ...s.name, ...(allDone ? s.nameDone : {}) }}>{nombre}</span>

        {/* Badge de progreso */}
        {doneCnt > 0 && !allDone && (
          <span style={s.progressBadge}>{doneCnt}/{numSeries}</span>
        )}
        {allDone && (
          <span style={s.doneBadge}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            LISTO
          </span>
        )}

        <span style={s.pill}>{series}×{reps}</span>
        <IconChevron open={expanded} />
      </button>

      {/* ── Detalle expandido ── */}
      {expanded && (
        <div style={s.detail} className="anim-expand">
          <div style={s.divider} />

          {/* Stats */}
          <div style={s.statsRow}>
            <StatCell label="SERIES" value={series} />
            <StatCell label="REPS"   value={reps} mono />
            {rir && rir !== "-" && rir !== "--" && <StatCell label="RIR" value={rir} />}
            {kg  && kg  !== "-" && <StatCell label="PESO" value={kg} mono />}
          </div>

          {/* ── Checks por serie ── */}
          <div style={s.checksSection}>
            <div style={s.checksHeader}>
              <span style={s.checksLabel}>SERIES COMPLETADAS</span>
              {doneCnt > 0 && (
                <button style={s.resetBtn} onClick={resetAll}>reiniciar</button>
              )}
            </div>
            <div style={s.checksRow}>
              {done.map((isDone, i) => (
                <div key={i} style={s.checkItem}>
                  <SerieCheck done={isDone} onToggle={() => toggleSerie(i)} />
                  <span style={{ ...s.serieLabel, ...(isDone ? s.serieLabelDone : {}) }}>
                    S{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Método */}
          {metodo && (
            <div style={s.metodoBadge}><span style={s.metodoDot}>◆</span>{metodo}</div>
          )}

          {/* Video */}
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

// ── Estilos ──────────────────────────────────────────────────
const s = {
  card: {
    borderRadius: "10px", border: "1px solid #1e1e1e",
    background: "#111", marginBottom: "6px", overflow: "hidden",
    transition: "border-color 300ms ease, box-shadow 300ms ease, background 300ms ease",
  },
  cardOpen: { borderColor: "#2e2e2e", background: "#131313", boxShadow: "0 4px 24px rgba(0,0,0,0.5)" },
  cardDone: { borderColor: "#2a2a2a", background: "#0f0f0f" },

  // Barra de progreso fina arriba de la card
  progressBar: { height: "2px", background: "#1a1a1a", position: "relative" },
  progressFill: {
    position: "absolute", top: 0, left: 0, height: "100%",
    background: "linear-gradient(90deg, #555, #fff)",
    borderRadius: "0 2px 2px 0",
    transition: "width 400ms cubic-bezier(0.16,1,0.3,1)",
  },

  header: {
    display: "flex", alignItems: "center", gap: "10px", width: "100%",
    padding: "13px 14px", background: "none", border: "none",
    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
  },
  idx:     { fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "700", color: "#333", flexShrink: 0, minWidth: "22px", transition: "color 300ms ease" },
  idxDone: { color: "#555" },
  name:     { flex: 1, fontSize: "13.5px", fontWeight: "600", color: "#d0d0d0", lineHeight: 1.3, letterSpacing: "-0.01em", transition: "color 300ms ease" },
  nameDone: { color: "#444" },
  pill: {
    padding: "3px 8px", background: "#1a1a1a", border: "1px solid #2a2a2a",
    borderRadius: "99px", fontSize: "11px", fontWeight: "600", color: "#555",
    fontFamily: "'JetBrains Mono',monospace", flexShrink: 0,
  },
  progressBadge: {
    fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", fontWeight: "700",
    color: "#888", flexShrink: 0,
  },
  doneBadge: {
    display: "inline-flex", alignItems: "center", gap: "4px",
    padding: "2px 7px", background: "#1e1e1e", border: "1px solid #2e2e2e",
    borderRadius: "99px", fontSize: "10px", fontWeight: "700", color: "#666",
    fontFamily: "'JetBrains Mono',monospace", flexShrink: 0,
    letterSpacing: "0.06em",
  },
  detail: { padding: "0 14px 14px" },
  divider: {
    height: "1px", marginBottom: "13px",
    background: "linear-gradient(90deg, transparent, #222 20%, #222 80%, transparent)",
  },
  statsRow: { display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" },

  // Checks de series
  checksSection: { marginBottom: "12px" },
  checksHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" },
  checksLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", fontWeight: "700", color: "#333", letterSpacing: "0.12em" },
  resetBtn: {
    fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#333",
    background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em",
    textDecoration: "underline", fontWeight: "600",
    transition: "color 200ms ease",
  },
  checksRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  checkItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" },
  serieLabel:     { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", fontWeight: "700", color: "#333", letterSpacing: "0.06em" },
  serieLabelDone: { color: "#555" },

  metodoBadge: {
    display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "10px",
    padding: "4px 10px", background: "#1e1e1e", border: "1px solid #2e2e2e",
    color: "#666", borderRadius: "4px", fontSize: "11px", fontWeight: "700",
    letterSpacing: "0.06em", textTransform: "uppercase",
    fontFamily: "'JetBrains Mono',monospace",
  },
  metodoDot: { fontSize: "7px", color: "#444" },
  videoWrap: {},
};

// Checkbox visual
const cs = {
  box: {
    width: "32px", height: "32px", borderRadius: "8px",
    border: "1.5px solid #2a2a2a", background: "#0e0e0e",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 250ms cubic-bezier(0.34,1.56,0.64,1)",
    flexShrink: 0,
  },
  boxDone: {
    background: "#fff", border: "1.5px solid #fff",
    boxShadow: "0 0 12px rgba(255,255,255,0.2)",
    transform: "scale(1.05)",
  },
};

const sc = {
  cell: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
    padding: "8px 12px", background: "#161616", border: "1px solid #222",
    borderRadius: "8px", minWidth: "54px",
  },
  label: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#444", fontWeight: "700", letterSpacing: "0.1em" },
  value: { fontSize: "15px", fontWeight: "700", color: "#e0e0e0", lineHeight: 1 },
  mono:  { fontFamily: "'JetBrains Mono',monospace", fontSize: "13px" },
};
