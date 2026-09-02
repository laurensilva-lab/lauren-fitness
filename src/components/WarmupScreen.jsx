import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
             transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#555" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/>
  </svg>
);

export default function WarmupScreen({ data }) {
  const [activeDay, setActiveDay] = useState(0);
  const [expanded,  setExpanded]  = useState(null);
  const [infoOpen,  setInfoOpen]  = useState(false);
  const diaActual = data.dias[activeDay];

  return (
    <div style={s.container}>
      {/* Instrucciones */}
      <div style={s.infoBox}>
        <button style={s.infoBtn} onClick={() => setInfoOpen(!infoOpen)}>
          <IconInfo />
          <span style={s.infoLabel}>INSTRUCCIONES</span>
          <span style={{ marginLeft: "auto" }}><IconChevron open={infoOpen} /></span>
        </button>
        {infoOpen && (
          <div style={s.infoBody} className="anim-expand">
            <p style={s.infoText}>{data.instrucciones}</p>
            <div style={s.infoDivider} />
            <p style={s.infoSub}>¿Cuándo hacer 2-3 series?</p>
            <p style={s.infoText}>{data.cuandoHacer2o3Series}</p>
          </div>
        )}
      </div>

      {/* Tabs días */}
      <div style={s.tabs}>
        {data.dias.map((d, i) => (
          <button key={i}
            style={{ ...s.tab, ...(activeDay === i ? s.tabActive : {}) }}
            onClick={() => { setActiveDay(i); setExpanded(null); }}>
            <span style={activeDay === i ? s.tabNumActive : s.tabNum}>{String(d.dia).padStart(2, "0")}</span>
            <span style={activeDay === i ? s.tabSubActive : s.tabSub}>DÍA</span>
          </button>
        ))}
      </div>

      {/* Ejercicios */}
      <div style={s.list}>
        {diaActual.ejercicios.map((ej, i) => (
          <div key={i} className="anim-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <div style={{ ...s.card, ...(expanded === i ? s.cardOpen : {}) }}>
              <button style={s.cardHeader} onClick={() => setExpanded(expanded === i ? null : i)}>
                <span style={s.num}>{String(i + 1).padStart(2, "0")}</span>
                <span style={s.name}>{ej.nombre}</span>
                <span style={s.meta}>{ej.series}×{ej.reps}</span>
                <IconChevron open={expanded === i} />
              </button>
              {expanded === i && (
                <div style={s.cardBody} className="anim-expand">
                  <div style={s.divider} />
                  <div style={s.statsRow}>
                    <SBox label="SERIES" value={ej.series} />
                    <SBox label="REPS"   value={ej.reps} />
                    <SBox label="PAUSA"  value="0s" />
                  </div>
                  <div style={{ marginTop: "12px" }}>
                    <VideoPlayer videoId={ej.videoId} title={ej.nombre} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SBox({ label, value }) {
  return (
    <div style={sb.box}>
      <span style={sb.label}>{label}</span>
      <span style={sb.value}>{value}</span>
    </div>
  );
}

const s = {
  container: { display: "flex", flexDirection: "column", gap: "14px" },
  infoBox: { border: "1px solid #1e1e1e", borderRadius: "10px", overflow: "hidden", background: "#0e0e0e" },
  infoBtn: {
    display: "flex", alignItems: "center", gap: "8px", width: "100%",
    padding: "12px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
    transition: "background 200ms ease",
  },
  infoLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", fontWeight: "700", color: "#444", letterSpacing: "0.1em" },
  infoBody:  { padding: "14px", borderTop: "1px solid #1a1a1a" },
  infoText:  { fontSize: "13px", color: "#666", lineHeight: 1.6 },
  infoDivider: { height: "1px", background: "#1a1a1a", margin: "10px 0" },
  infoSub:   { fontSize: "12px", fontWeight: "700", color: "#888", marginBottom: "6px" },
  tabs: { display: "flex", gap: "5px", overflowX: "auto", scrollbarWidth: "none" },
  tab: {
    flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
    padding: "8px 14px", borderRadius: "8px", border: "1px solid #1e1e1e",
    background: "#111", cursor: "pointer", fontFamily: "inherit", gap: "1px",
    transition: "all 260ms cubic-bezier(0.16,1,0.3,1)",
  },
  tabActive: { background: "#fff", border: "1px solid #fff", boxShadow: "0 0 16px rgba(255,255,255,0.1)" },
  tabNum:       { fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#444", lineHeight: 1 },
  tabNumActive: { fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", fontWeight: "700", color: "#000", lineHeight: 1 },
  tabSub:       { fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", color: "#333", letterSpacing: "0.1em" },
  tabSubActive: { fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", color: "#777", letterSpacing: "0.1em" },
  list: { display: "flex", flexDirection: "column", gap: "6px" },
  card: {
    border: "1px solid #1e1e1e", borderRadius: "10px", overflow: "hidden", background: "#111",
    transition: "border-color 280ms ease, box-shadow 280ms ease, background 280ms ease",
  },
  cardOpen: { borderColor: "#2e2e2e", background: "#131313", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" },
  cardHeader: {
    display: "flex", alignItems: "center", gap: "10px", width: "100%",
    padding: "12px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left",
  },
  num:  { fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "700", color: "#333", flexShrink: 0 },
  name: { flex: 1, fontSize: "13.5px", fontWeight: "600", color: "#d0d0d0" },
  meta: { fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#444", fontWeight: "600", flexShrink: 0 },
  cardBody: { padding: "0 14px 14px" },
  divider: { height: "1px", background: "linear-gradient(90deg,transparent,#222 20%,#222 80%,transparent)", marginBottom: "12px" },
  statsRow: { display: "flex", gap: "6px" },
};

const sb = {
  box: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
    padding: "8px 12px", background: "#161616", border: "1px solid #222", borderRadius: "8px",
  },
  label: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#444", fontWeight: "700", letterSpacing: "0.1em" },
  value: { fontSize: "15px", fontWeight: "700", color: "#e0e0e0" },
};
