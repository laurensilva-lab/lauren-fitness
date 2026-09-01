// ============================================================
// COMPONENTE: MonthView
// Muestra UN mes de entrenamiento con navegación entre días.
// Props:
//   mes     — objeto del mes con { mes, nombre, objetivo, duracion, inicio, dias }
//   warmups — array de calentamientos por día (del warmupData)
// ============================================================

import { useState } from "react";
import DayView from "./DayView";

export default function MonthView({ mes, warmups }) {
  // Día activo (por defecto el primero)
  const [activeDay, setActiveDay] = useState(0);

  const diaActual = mes.dias[activeDay];

  // Buscar el calentamiento correspondiente al día actual
  const warmupDelDia = warmups?.find((w) => w.dia === diaActual.dia);

  return (
    <div style={styles.container}>
      {/* ─── Info del mes ─── */}
      <div style={styles.monthInfo}>
        <div style={styles.infoRow}>
          <InfoPill label="Objetivo" value={mes.objetivo} />
          <InfoPill label="Duración" value={mes.duracion} />
          <InfoPill label="Inicio" value={mes.inicio} />
        </div>
      </div>

      {/* ─── Selector de días (tabs) ─── */}
      <div style={styles.dayTabs}>
        {mes.dias.map((dia, i) => (
          <button
            key={i}
            style={{
              ...styles.dayTab,
              ...(activeDay === i ? styles.dayTabActive : {}),
            }}
            onClick={() => setActiveDay(i)}
          >
            Día {dia.dia}
          </button>
        ))}
      </div>

      {/* ─── Contenido del día seleccionado ─── */}
      <DayView dia={diaActual} warmup={warmupDelDia} />
    </div>
  );
}

// Sub-componente: pastilla de información
function InfoPill({ label, value }) {
  return (
    <div style={infoPillStyles.pill}>
      <span style={infoPillStyles.label}>{label}</span>
      <span style={infoPillStyles.value}>{value}</span>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  // Fila de información del mes
  monthInfo: {
    padding: "14px",
    background: "#f7f7f7",
    borderRadius: "12px",
    border: "1px solid #eee",
  },
  infoRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  // Tabs de días
  dayTabs: {
    display: "flex",
    gap: "6px",
    overflowX: "auto",
    paddingBottom: "2px",
    /* Sin scrollbar visible en móvil */
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  dayTab: {
    flexShrink: 0,
    padding: "8px 16px",
    borderRadius: "99px",
    border: "1.5px solid #e0e0e0",
    background: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    color: "#555",
    cursor: "pointer",
    transition: "all 150ms ease",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  dayTabActive: {
    background: "#111",
    color: "#fff",
    border: "1.5px solid #111",
  },
};

const infoPillStyles = {
  pill: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "8px 12px",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #eee",
    minWidth: "80px",
  },
  label: {
    fontSize: "10px",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontWeight: "600",
  },
  value: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1.2,
  },
};
