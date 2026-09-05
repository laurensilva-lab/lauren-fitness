import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const IconChevron = ({ open }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
             transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconEdit = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

function SerieCheck({ done, onToggle }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{
        width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        background: done
          ? "linear-gradient(145deg, #ffffff 0%, #cccccc 100%)"
          : "linear-gradient(145deg, #1c1c1c 0%, #111111 100%)",
        border: done
          ? "1px solid rgba(255,255,255,0.6)"
          : "1px solid #2a2a2a",
        boxShadow: done
          ? "0 0 16px rgba(255,255,255,0.25), inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.4)"
          : "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.4)",
        transition: "all 280ms cubic-bezier(0.34,1.56,0.64,1)",
        transform: done ? "scale(1.08)" : "scale(1)",
      }}>
      {done && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
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

  const checksStorageKey = `lauren_check_${checkKey}_${index}`;
  const [done, setDone] = useState(() => {
    try { const s = localStorage.getItem(checksStorageKey); return s ? JSON.parse(s) : Array(numSeries).fill(false); }
    catch { return Array(numSeries).fill(false); }
  });
  const toggleSerie = (i) => {
    const next = done.map((v, idx) => idx === i ? !v : v);
    setDone(next);
    try { localStorage.setItem(checksStorageKey, JSON.stringify(next)); } catch {}
  };
  const resetAll = (e) => {
    e.stopPropagation();
    const fresh = Array(numSeries).fill(false);
    setDone(fresh);
    try { localStorage.setItem(checksStorageKey, JSON.stringify(fresh)); } catch {}
  };

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
    <div style={{
      borderRadius: "12px",
      border: expanded ? "1px solid #303030" : "1px solid #1e1e1e",
      borderTopColor: expanded ? "#3a3a3a" : "#262626",
      background: expanded
        ? "linear-gradient(160deg, #171717 0%, #111111 100%)"
        : "linear-gradient(160deg, #141414 0%, #0e0e0e 100%)",
      boxShadow: expanded
        ? "0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)"
        : "0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.4)",
      marginBottom: "8px",
      overflow: "hidden",
      transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
      ...(allDone ? { opacity: 0.6 } : {}),
    }}>

      {/* Barra de progreso */}
      <div style={{ height: "2px", background: "#111", position: "relative" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%",
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #444 0%, #fff 100%)",
          boxShadow: progress > 0 ? "0 0 8px rgba(255,255,255,0.4)" : "none",
          borderRadius: "0 2px 2px 0",
          transition: "width 400ms cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      {/* Header */}
      <button onClick={onToggle} style={{
        display: "flex", alignItems: "center", gap: "10px", width: "100%",
        padding: "13px 14px", background: "none", border: "none",
        cursor: "pointer", textAlign: "left", fontFamily: "inherit",
      }}>
        {/* Número con badge volumétrico */}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "700",
          color: allDone ? "#555" : "#666",
          flexShrink: 0, minWidth: "22px",
          transition: "color 300ms ease",
        }}>{String(index + 1).padStart(2, "0")}</span>

        <span style={{
          flex: 1, fontSize: "13.5px", fontWeight: "600",
          color: allDone ? "#3a3a3a" : "#d8d8d8",
          lineHeight: 1.3, letterSpacing: "-0.01em",
          transition: "color 300ms ease",
        }}>{nombre}</span>

        {/* Badge progreso */}
        {doneCnt > 0 && !allDone && (
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "700",
            color: "#888", flexShrink: 0,
          }}>{doneCnt}/{numSeries}</span>
        )}
        {allDone && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            padding: "2px 8px",
            background: "linear-gradient(180deg, #252525 0%, #1a1a1a 100%)",
            border: "1px solid #333", borderTopColor: "#3a3a3a",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 4px rgba(0,0,0,0.3)",
            borderRadius: "99px", fontSize: "10px", fontWeight: "700", color: "#777",
            fontFamily: "var(--font-mono)", flexShrink: 0, letterSpacing: "0.06em",
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            LISTO
          </span>
        )}

        {/* Pill series×reps */}
        <span style={{
          padding: "3px 9px",
          background: "linear-gradient(180deg, #1e1e1e 0%, #161616 100%)",
          border: "1px solid #2a2a2a", borderTopColor: "#333",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 4px rgba(0,0,0,0.3)",
          borderRadius: "99px", fontSize: "11px", fontWeight: "600", color: "#666",
          fontFamily: "var(--font-mono)", flexShrink: 0,
        }}>{series}×{reps}</span>

        <IconChevron open={expanded} />
      </button>

      {/* Detalle */}
      {expanded && (
        <div style={{ padding: "0 14px 16px" }} className="anim-expand">
          <div className="divider-grad" style={{ marginBottom: "14px" }} />

          {/* Stats */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            <StatCell label="SERIES" value={series} />
            <StatCell label="REPS"   value={reps} mono />
            {rir && rir !== "-" && rir !== "--" && <StatCell label="RIR" value={rir} />}
            {kg && kg !== "-" && <StatCell label="RECOMENDADO" value={kg} mono muted />}

            {/* Peso logrado editable */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
              padding: "8px 10px", minWidth: "64px",
              background: "linear-gradient(145deg, #1e1e1e 0%, #161616 100%)",
              border: "1.5px solid #303030", borderTopColor: "#3a3a3a",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.4)",
              borderRadius: "10px",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "9px", color: "#aaa",
                fontWeight: "700", letterSpacing: "0.1em",
              }}>MI PESO</span>
              {editingPeso ? (
                <input autoFocus
                  style={{
                    width: "58px", background: "none", border: "none",
                    borderBottom: "1px solid #555", color: "#f0f0f0",
                    fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-mono)",
                    textAlign: "center", outline: "none", padding: "2px 0",
                  }}
                  value={pesoLogrado}
                  onChange={e => savePeso(e.target.value)}
                  onBlur={() => setEditingPeso(false)}
                  onKeyDown={e => { if (e.key === "Enter") setEditingPeso(false); }}
                  placeholder="ej: 30kg" maxLength={10}
                />
              ) : (
                <button onClick={() => setEditingPeso(true)} style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "15px",
                    fontWeight: "700", color: pesoLogrado ? "#f0f0f0" : "#2a2a2a", lineHeight: 1,
                  }}>{pesoLogrado || "—"}</span>
                  <span style={{ color: "#555", display: "flex" }}><IconEdit /></span>
                </button>
              )}
            </div>
          </div>

          {/* Checks de series */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: "700",
                color: "#333", letterSpacing: "0.12em",
              }}>SERIES COMPLETADAS</span>
              {doneCnt > 0 && (
                <button onClick={resetAll} style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px", color: "#333",
                  background: "none", border: "none", cursor: "pointer",
                  textDecoration: "underline", fontWeight: "600",
                }}>reiniciar</button>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {done.map((isDone, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                  <SerieCheck done={isDone} onToggle={() => toggleSerie(i)} />
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: "700",
                    color: isDone ? "#555" : "#2a2a2a", letterSpacing: "0.06em",
                  }}>S{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {metodo && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "12px",
              padding: "4px 12px",
              background: "linear-gradient(180deg, #1e1e1e 0%, #141414 100%)",
              border: "1px solid #2e2e2e", borderTopColor: "#333",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.4)",
              color: "#777", borderRadius: "6px", fontSize: "11px", fontWeight: "700",
              letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-mono)",
            }}>◆ {metodo}</div>
          )}

          <VideoPlayer videoId={videoId} title={nombre} />
        </div>
      )}
    </div>
  );
}

function StatCell({ label, value, mono, muted }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
      padding: "8px 12px", minWidth: "54px", borderRadius: "10px",
      background: muted
        ? "linear-gradient(145deg, #111 0%, #0d0d0d 100%)"
        : "linear-gradient(145deg, #1c1c1c 0%, #141414 100%)",
      border: muted ? "1px solid #1a1a1a" : "1px solid #252525",
      borderTopColor: muted ? "#1e1e1e" : "#2e2e2e",
      boxShadow: muted
        ? "inset 0 1px 0 rgba(255,255,255,0.02), 0 1px 4px rgba(0,0,0,0.3)"
        : "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.4)",
    }}>
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: "9px",
        color: muted ? "#333" : "#444", fontWeight: "700", letterSpacing: "0.1em",
      }}>{label}</span>
      <span style={{
        fontSize: mono ? "13px" : "15px", fontWeight: "700",
        color: muted ? "#444" : "#ddd", lineHeight: 1,
        fontFamily: mono ? "var(--font-mono)" : "inherit",
      }}>{value}</span>
    </div>
  );
}
