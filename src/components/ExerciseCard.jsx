// ============================================================
// COMPONENTE: ExerciseCard
// - Peso recomendado (solo lectura, viene del coach)
// - Peso logrado (editable, guardado en localStorage)
// - Checks por serie con barra de progreso
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

// Ícono lápiz para el campo editable
const IconEdit = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

// Checkbox de serie
function SerieCheck({ done, onToggle }) {
  return (
    <button
      style={{ ...cs.box, ...(done ? cs.boxDone : {}) }}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
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
  const numSeries = parseInt(String(series).replace(/\D.*/, "")) || 1;

  // ── Checks de series (localStorage) ─────────────────────
  const checksKey = `lauren_check_${checkKey}_${index}`;
  const [done, setDone] = useState(() => {
    try { const s = localStorage.getItem(checksKey); return s ? JSON.parse(s) : Array(numSeries).fill(false); }
    catch { return Array(numSeries).fill(false); }
  });

  const toggleSerie = (i) => {
    const next = done.map((v, idx) => idx === i ? !v : v);
    setDone(next);
    try { localStorage.setItem(checksKey, JSON.stringify(next)); } catch {}
  };

  const resetAll = (e) => {
    e.stopPropagation();
    const fresh = Array(numSeries).fill(false);
    setDone(fresh);
    try { localStorage.setItem(checksKey, JSON.stringify(fresh)); } catch {}
  };

  // ── Peso logrado (editable, localStorage) ───────────────
  const pesoKey = `lauren_peso_${checkKey}_${index}`;
  const [pesoLogrado, setPesoLogrado] = useState(() => {
    try { return localStorage.getItem(pesoKey) || ""; } catch { return ""; }
  });
  const [editingPeso, setEditingPeso] = useState(false);

  const savePeso = (val) => {
    setPesoLogrado(val);
    try { localStorage.setItem(pesoKey, val); } catch {}
  };

  const allDone  = done.every(Boolean);
  const doneCnt  = done.filter(Boolean).length;
  const progress = numSeries > 0 ? doneCnt / numSeries : 0;

  return (
    <div style={{ ...s.card, ...(expanded ? s.cardOpen : {}), ...(allDone ? s.cardDone : {}) }}>

      {/* Barra de progreso superior */}
      <div style={s.progressBar}>
        <div style={{ ...s.progressFill, width: `${progress * 100}%` }} />
      </div>

      {/* Header */}
      <button style={s.header} onClick={onToggle}>
        <span style={{ ...s.idx, ...(allDone ? s.idxDone : {}) }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ ...s.name, ...(allDone ? s.nameDone : {}) }}>{nombre}</span>
        {doneCnt > 0 && !allDone && <span style={s.progressBadge}>{doneCnt}/{numSeries}</span>}
        {allDone && (
          <span style={s.doneBadge}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            LISTO
          </span>
        )}
        <span style={s.pill}>{series}×{reps}</span>
        <IconChevron open={expanded} />
      </button>

      {/* Detalle expandido */}
      {expanded && (
        <div style={s.detail} className="anim-expand">
          <div style={s.divider} />

          {/* Stats row */}
          <div style={s.statsRow}>
            <StatCell label="SERIES" value={series} />
            <StatCell label="REPS"   value={reps} mono />
            {rir && rir !== "-" && rir !== "--" && <StatCell label="RIR" value={rir} />}

            {/* ── Peso recomendado (coach) — solo lectura ── */}
            {kg && kg !== "-" && (
              <StatCell label="RECOMENDADO" value={kg} mono muted />
            )}

            {/* ── Peso logrado — editable ── */}
            <div style={pw.cell}>
              <span style={pw.label}>MI PESO</span>
              {editingPeso ? (
                <input
                  autoFocus
                  style={pw.input}
                  value={pesoLogrado}
                  onChange={e => savePeso(e.target.value)}
                  onBlur={() => setEditingPeso(false)}
                  onKeyDown={e => { if (e.key === "Enter") setEditingPeso(false); }}
                  placeholder="ej: 30kg"
                  maxLength={10}
                />
              ) : (
                <button style={pw.valueBtn} onClick={() => setEditingPeso(true)}>
                  <span style={pw.value}>
                    {pesoLogrado || <span style={pw.placeholder}>—</span>}
                  </span>
                  <span style={pw.editIcon}><IconEdit /></span>
                </button>
              )}
            </div>
          </div>

          {/* Checks de series */}
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

          {metodo && (
            <div style={s.metodoBadge}><span style={s.metodoDot}>◆</span>{metodo}</div>
          )}

          <div style={s.videoWrap}>
            <VideoPlayer videoId={videoId} title={nombre} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-componente StatCell ──────────────────────────────────
function StatCell({ label, value, mono, muted }) {
  return (
    <div style={{ ...sc.cell, ...(muted ? sc.cellMuted : {}) }}>
      <span style={sc.label}>{label}</span>
      <span style={{ ...sc.value, ...(mono ? sc.mono : {}), ...(muted ? sc.valueMuted : {}) }}>
        {value}
      </span>
    </div>
  );
}

// ── Estilos ──────────────────────────────────────────────────
const s = {
  card: { borderRadius: "10px", border: "1px solid #1e1e1e", background: "#111", marginBottom: "6px", overflow: "hidden", transition: "border-color 300ms ease, box-shadow 300ms ease, background 300ms ease" },
  cardOpen: { borderColor: "#2e2e2e", background: "#131313", boxShadow: "0 4px 24px rgba(0,0,0,0.5)" },
  cardDone: { borderColor: "#2a2a2a", background: "#0f0f0f" },
  progressBar: { height: "2px", background: "#1a1a1a", position: "relative" },
  progressFill: { position: "absolute", top: 0, left: 0, height: "100%", background: "linear-gradient(90deg,#555,#fff)", borderRadius: "0 2px 2px 0", transition: "width 400ms cubic-bezier(0.16,1,0.3,1)" },
  header: { display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "13px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" },
  idx:     { fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "700", color: "#333", flexShrink: 0, minWidth: "22px", transition: "color 300ms ease" },
  idxDone: { color: "#555" },
  name:     { flex: 1, fontSize: "13.5px", fontWeight: "600", color: "#d0d0d0", lineHeight: 1.3, letterSpacing: "-0.01em", transition: "color 300ms ease" },
  nameDone: { color: "#444" },
  pill: { padding: "3px 8px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "99px", fontSize: "11px", fontWeight: "600", color: "#555", fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 },
  progressBadge: { fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", fontWeight: "700", color: "#888", flexShrink: 0 },
  doneBadge: { display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 7px", background: "#1e1e1e", border: "1px solid #2e2e2e", borderRadius: "99px", fontSize: "10px", fontWeight: "700", color: "#666", fontFamily: "'JetBrains Mono',monospace", flexShrink: 0, letterSpacing: "0.06em" },
  detail: { padding: "0 14px 14px" },
  divider: { height: "1px", marginBottom: "13px", background: "linear-gradient(90deg,transparent,#222 20%,#222 80%,transparent)" },
  statsRow: { display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" },
  checksSection: { marginBottom: "12px" },
  checksHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" },
  checksLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", fontWeight: "700", color: "#333", letterSpacing: "0.12em" },
  resetBtn: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#333", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em", textDecoration: "underline", fontWeight: "600" },
  checksRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  checkItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" },
  serieLabel:     { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", fontWeight: "700", color: "#333", letterSpacing: "0.06em" },
  serieLabelDone: { color: "#555" },
  metodoBadge: { display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "10px", padding: "4px 10px", background: "#1e1e1e", border: "1px solid #2e2e2e", color: "#666", borderRadius: "4px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" },
  metodoDot: { fontSize: "7px", color: "#444" },
  videoWrap: {},
};

// Checkbox
const cs = {
  box: { width: "32px", height: "32px", borderRadius: "8px", border: "1.5px solid #2a2a2a", background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 250ms cubic-bezier(0.34,1.56,0.64,1)", flexShrink: 0 },
  boxDone: { background: "#fff", border: "1.5px solid #fff", boxShadow: "0 0 12px rgba(255,255,255,0.2)", transform: "scale(1.05)" },
};

// StatCell
const sc = {
  cell: { display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "8px 12px", background: "#161616", border: "1px solid #222", borderRadius: "8px", minWidth: "54px" },
  cellMuted: { background: "#0e0e0e", border: "1px solid #1a1a1a" },
  label: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#444", fontWeight: "700", letterSpacing: "0.1em" },
  value: { fontSize: "15px", fontWeight: "700", color: "#e0e0e0", lineHeight: 1 },
  valueMuted: { fontSize: "13px", color: "#444" },
  mono: { fontFamily: "'JetBrains Mono',monospace", fontSize: "13px" },
};

// Peso logrado — celda editable
const pw = {
  cell: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
    padding: "8px 10px", background: "#161616",
    border: "1.5px solid #2e2e2e",      // borde ligeramente más visible para destacarlo
    borderRadius: "8px", minWidth: "62px",
    position: "relative",
  },
  label: {
    fontFamily: "'JetBrains Mono',monospace", fontSize: "9px",
    color: "#888",                        // label más brillante que los otros
    fontWeight: "700", letterSpacing: "0.1em",
  },
  valueBtn: {
    display: "flex", alignItems: "center", gap: "4px",
    background: "none", border: "none", cursor: "pointer",
    padding: 0, fontFamily: "inherit",
  },
  value: {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "15px", fontWeight: "700", color: "#f0f0f0", lineHeight: 1,
  },
  placeholder: { fontSize: "18px", color: "#333", fontWeight: "300" },
  editIcon: { color: "#444", display: "flex", marginTop: "1px" },
  input: {
    width: "60px", background: "none", border: "none",
    borderBottom: "1px solid #555",
    color: "#f0f0f0", fontSize: "14px", fontWeight: "700",
    fontFamily: "'JetBrains Mono',monospace",
    textAlign: "center", outline: "none", padding: "2px 0",
    lineHeight: 1,
  },
};
