import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const Chevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function WarmupScreen({ data }) {
  const [activeDay, setActiveDay] = useState(0);
  const [expanded,  setExpanded]  = useState(null);
  const [infoOpen,  setInfoOpen]  = useState(false);
  const diaActual = data.dias[activeDay];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* Instrucciones */}
      <div style={{
        borderRadius: "12px", overflow: "hidden",
        background: "linear-gradient(145deg, #121212 0%, #0d0d0d 100%)",
        border: "1px solid #1e1e1e", borderTopColor: "#252525",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 16px rgba(0,0,0,0.5)",
      }}>
        <button onClick={() => setInfoOpen(!infoOpen)} style={{
          display: "flex", alignItems: "center", gap: "8px", width: "100%",
          padding: "12px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/>
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "700", color: "#3a3a3a", letterSpacing: "0.1em" }}>INSTRUCCIONES</span>
          <span style={{ marginLeft: "auto" }}><Chevron open={infoOpen} /></span>
        </button>
        {infoOpen && (
          <div style={{ padding: "14px", borderTop: "1px solid #161616" }} className="anim-expand">
            <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{data.instrucciones}</p>
            <div style={{ height: "1px", background: "#161616", margin: "10px 0" }} />
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#777", marginBottom: "6px" }}>¿Cuándo hacer 2-3 series?</p>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{data.cuandoHacer2o3Series}</p>
          </div>
        )}
      </div>

      {/* Tabs días */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none" }}>
        {data.dias.map((d, i) => {
          const active = activeDay === i;
          return (
            <button key={i} onClick={() => { setActiveDay(i); setExpanded(null); }} style={{
              flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
              padding: "8px 16px", borderRadius: "10px", gap: "2px", cursor: "pointer", fontFamily: "inherit",
              background: active ? "linear-gradient(180deg, #fff 0%, #d0d0d0 100%)" : "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
              border: active ? "1px solid rgba(255,255,255,0.5)" : "1px solid #222",
              borderTopColor: active ? "rgba(255,255,255,0.7)" : "#2a2a2a",
              boxShadow: active
                ? "0 0 20px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.5)"
                : "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.4)",
              transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: "700", lineHeight: 1, color: active ? "#000" : "#555" }}>
                {String(d.dia).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", color: active ? "#555" : "#2a2a2a" }}>DÍA</span>
            </button>
          );
        })}
      </div>

      {/* Ejercicios */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {diaActual.ejercicios.map((ej, i) => {
          const open = expanded === i;
          return (
            <div key={i} className="anim-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div style={{
                borderRadius: "12px", overflow: "hidden",
                background: open ? "linear-gradient(160deg, #171717 0%, #111 100%)" : "linear-gradient(160deg, #141414 0%, #0e0e0e 100%)",
                border: open ? "1px solid #303030" : "1px solid #1e1e1e",
                borderTopColor: open ? "#3a3a3a" : "#252525",
                boxShadow: open
                  ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.6)"
                  : "inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.4)",
                transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
              }}>
                <button onClick={() => setExpanded(open ? null : i)} style={{
                  display: "flex", alignItems: "center", gap: "10px", width: "100%",
                  padding: "13px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "700", color: "#333", flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ flex: 1, fontSize: "13.5px", fontWeight: "600", color: "#d0d0d0" }}>{ej.nombre}</span>
                  <span style={{
                    padding: "3px 9px",
                    background: "linear-gradient(180deg, #1e1e1e 0%, #161616 100%)",
                    border: "1px solid #2a2a2a", borderTopColor: "#333",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                    borderRadius: "99px", fontSize: "11px", fontWeight: "600", color: "#555",
                    fontFamily: "var(--font-mono)", flexShrink: 0,
                  }}>{ej.series}×{ej.reps}</span>
                  <Chevron open={open} />
                </button>
                {open && (
                  <div style={{ padding: "0 14px 14px", borderTop: "1px solid #161616" }} className="anim-expand">
                    <div style={{ display: "flex", gap: "6px", paddingTop: "12px", marginBottom: "12px" }}>
                      {[["SERIES", ej.series], ["REPS", ej.reps], ["DESCANSO", "0s"]].map(([l, v]) => (
                        <div key={l} style={{
                          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                          padding: "8px 12px", borderRadius: "10px",
                          background: "linear-gradient(145deg, #1c1c1c 0%, #141414 100%)",
                          border: "1px solid #252525", borderTopColor: "#2e2e2e",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.4)",
                        }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#444", fontWeight: "700", letterSpacing: "0.1em" }}>{l}</span>
                          <span style={{ fontSize: "15px", fontWeight: "700", color: "#ddd" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <VideoPlayer videoId={ej.videoId} title={ej.nombre} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
