// ============================================================
// COMPONENTE: WarmupScreen — Entrada en calor
// Diseño tech, sin emojis, iconografía SVG lineal
// ============================================================
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 200ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="8" x2="12" y2="8.5"/>
    <line x1="12" y1="11" x2="12" y2="16"/>
  </svg>
);

export default function WarmupScreen({ data }) {
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const diaActual = data.dias[activeDay];

  return (
    <div style={styles.container}>

      {/* ─── Instrucciones colapsables ─── */}
      <div style={styles.infoBox}>
        <button style={styles.infoToggle} onClick={() => setInfoOpen(!infoOpen)}>
          <span style={styles.infoIconWrap}><IconInfo /></span>
          <span style={styles.infoToggleLabel}>INSTRUCCIONES</span>
          <span style={{ color: "#a8a8a8", marginLeft: "auto" }}><IconChevron open={infoOpen} /></span>
        </button>
        {infoOpen && (
          <div style={styles.infoBody}>
            <p style={styles.infoText}>{data.instrucciones}</p>
            <div style={styles.infoDivider} />
            <p style={styles.infoSubtitle}>¿Cuándo hacer 2-3 series?</p>
            <p style={styles.infoText}>{data.cuandoHacer2o3Series}</p>
          </div>
        )}
      </div>

      {/* ─── Tabs de días ─── */}
      <div style={styles.dayTabs}>
        {data.dias.map((d, i) => (
          <button key={i}
            style={{ ...styles.tab, ...(activeDay === i ? styles.tabActive : {}) }}
            onClick={() => { setActiveDay(i); setExpanded(null); }}>
            <span style={activeDay === i ? styles.tabNumActive : styles.tabNum}>
              {String(d.dia).padStart(2, "0")}
            </span>
            <span style={activeDay === i ? styles.tabSubActive : styles.tabSub}>DÍA</span>
          </button>
        ))}
      </div>

      {/* ─── Lista de ejercicios ─── */}
      <div style={styles.list}>
        {diaActual.ejercicios.map((ej, i) => (
          <div key={i} style={{ ...styles.card, ...(expanded === i ? styles.cardOpen : {}) }}>
            <button style={styles.cardHeader} onClick={() => setExpanded(expanded === i ? null : i)}>
              <span style={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span style={styles.name}>{ej.nombre}</span>
              <span style={styles.meta}>{ej.series}×{ej.reps}</span>
              <span style={{ color: "#a8a8a8" }}><IconChevron open={expanded === i} /></span>
            </button>

            {expanded === i && (
              <div style={styles.cardBody}>
                <div style={styles.divider} />
                <div style={styles.statsRow}>
                  <StatBox label="SERIES" value={ej.series} />
                  <StatBox label="REPS"   value={ej.reps} />
                  <StatBox label="DESCANSO" value="0s" />
                </div>
                <VideoPlayer videoId={ej.videoId} title={ej.nombre} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={statStyles.box}>
      <span style={statStyles.label}>{label}</span>
      <span style={statStyles.value}>{value}</span>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "14px" },
  infoBox: {
    border: "1px solid #eeeeee",
    borderRadius: "10px",
    overflow: "hidden",
  },
  infoToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "12px 14px",
    background: "#fafafa",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  infoIconWrap: { color: "#737373", display: "flex" },
  infoToggleLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    fontWeight: "700",
    color: "#404040",
    letterSpacing: "0.1em",
  },
  infoBody: { padding: "14px", borderTop: "1px solid #eeeeee" },
  infoText: { fontSize: "13px", color: "#555", lineHeight: 1.6 },
  infoDivider: { height: "1px", background: "#eeeeee", margin: "10px 0" },
  infoSubtitle: { fontSize: "12px", fontWeight: "700", color: "#333", marginBottom: "6px" },
  dayTabs: { display: "flex", gap: "5px", overflowX: "auto", scrollbarWidth: "none" },
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
  },
  tabActive: { background: "#0a0a0a", border: "1px solid #0a0a0a" },
  tabNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", fontWeight: "700", color: "#737373" },
  tabNumActive: { fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", fontWeight: "700", color: "#fff" },
  tabSub: { fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#a8a8a8", letterSpacing: "0.1em" },
  tabSubActive: { fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#737373", letterSpacing: "0.1em" },
  list: { display: "flex", flexDirection: "column", gap: "6px" },
  card: {
    border: "1px solid #eeeeee",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    transition: "border-color 200ms ease",
  },
  cardOpen: { borderColor: "#d1d1d1" },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "12px 14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
  },
  num: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    fontWeight: "700",
    color: "#a8a8a8",
    flexShrink: 0,
  },
  name: { flex: 1, fontSize: "13.5px", fontWeight: "600", color: "#0a0a0a" },
  meta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: "#a8a8a8",
    fontWeight: "600",
    flexShrink: 0,
  },
  cardBody: { padding: "0 14px 14px" },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e4e4e4 20%, #e4e4e4 80%, transparent)",
    marginBottom: "12px",
  },
  statsRow: { display: "flex", gap: "6px" },
};

const statStyles = {
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    padding: "8px 12px",
    background: "#fafafa",
    border: "1px solid #eeeeee",
    borderRadius: "8px",
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "9px",
    color: "#a8a8a8",
    fontWeight: "700",
    letterSpacing: "0.1em",
  },
  value: { fontSize: "15px", fontWeight: "700", color: "#0a0a0a" },
};
