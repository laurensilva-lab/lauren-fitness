// ============================================================
// COMPONENTE: WarmupScreen
// Pantalla de calentamiento con instrucciones y ejercicios por día
// Props:
//   data — objeto warmupData con instrucciones y dias
// ============================================================

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function WarmupScreen({ data }) {
  // Día de calentamiento activo
  const [activeDay, setActiveDay] = useState(0);
  // Índice del ejercicio expandido
  const [expanded, setExpanded] = useState(null);

  const diaActual = data.dias[activeDay];

  return (
    <div style={styles.container}>
      {/* ─── Instrucciones generales ─── */}
      <div style={styles.infoCard}>
        <h2 style={styles.infoTitle}>Cómo calentar</h2>
        <p style={styles.infoText}>{data.instrucciones}</p>
        <div style={styles.divider} />
        <p style={styles.infoSubtitle}>¿Cuándo hacer 2-3 series?</p>
        <p style={styles.infoText}>{data.cuandoHacer2o3Series}</p>
      </div>

      {/* ─── Selector de día ─── */}
      <div style={styles.dayTabs}>
        {data.dias.map((d, i) => (
          <button
            key={i}
            style={{
              ...styles.tab,
              ...(activeDay === i ? styles.tabActive : {}),
            }}
            onClick={() => {
              setActiveDay(i);
              setExpanded(null);
            }}
          >
            Día {d.dia}
          </button>
        ))}
      </div>

      {/* ─── Ejercicios del día ─── */}
      <div style={styles.list}>
        {diaActual.ejercicios.map((ej, i) => (
          <div key={i} style={styles.card}>
            <button
              style={styles.cardHeader}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <span style={styles.number}>{i + 1}</span>
              <span style={styles.name}>{ej.nombre}</span>
              <span style={styles.meta}>{ej.series} × {ej.reps}</span>
              <span style={{ fontSize: "13px", color: "#aaa" }}>
                {expanded === i ? "▲" : "▼"}
              </span>
            </button>

            {expanded === i && (
              <div style={styles.cardBody}>
                {/* Stats */}
                <div style={styles.statsRow}>
                  <StatBox label="Series" value={ej.series} />
                  <StatBox label="Reps" value={ej.reps} />
                  <StatBox label="Descanso" value="0 seg" />
                </div>
                {/* Video */}
                <VideoPlayer videoId={ej.videoId} title={ej.nombre} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-componente stat box
function StatBox({ label, value }) {
  return (
    <div style={statStyles.box}>
      <span style={statStyles.label}>{label}</span>
      <span style={statStyles.value}>{value}</span>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  // Tarjeta de instrucciones
  infoCard: {
    padding: "16px",
    background: "#f7f7f7",
    borderRadius: "12px",
    border: "1px solid #eee",
  },
  infoTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111",
    marginBottom: "8px",
  },
  infoText: {
    fontSize: "13px",
    color: "#555",
    lineHeight: 1.6,
  },
  infoSubtitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "6px",
  },
  divider: {
    height: "1px",
    background: "#e5e5e5",
    margin: "12px 0",
  },
  // Tabs de días
  dayTabs: {
    display: "flex",
    gap: "6px",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tab: {
    flexShrink: 0,
    padding: "8px 16px",
    borderRadius: "99px",
    border: "1.5px solid #e0e0e0",
    background: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    color: "#555",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  tabActive: {
    background: "#111",
    color: "#fff",
    border: "1.5px solid #111",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  card: {
    border: "1px solid #e8e8e8",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "13px 14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
  },
  number: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    color: "#333",
    flexShrink: 0,
  },
  name: {
    flex: 1,
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
  },
  meta: {
    fontSize: "12px",
    color: "#888",
    fontWeight: "500",
  },
  cardBody: {
    padding: "0 14px 14px",
    borderTop: "1px solid #f0f0f0",
  },
  statsRow: {
    display: "flex",
    gap: "8px",
    paddingTop: "12px",
  },
};

const statStyles = {
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 12px",
    background: "#f5f5f5",
    borderRadius: "8px",
    gap: "2px",
    minWidth: "60px",
  },
  label: {
    fontSize: "10px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
  },
  value: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111",
  },
};
