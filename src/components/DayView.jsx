// ============================================================
// COMPONENTE: DayView
// Muestra todos los ejercicios de UN día de entrenamiento.
// Props:
//   dia      — objeto del día con { dia, tipo, ejercicios }
//   warmup   — ejercicios de calentamiento para este día (opcional)
// ============================================================

import { useState } from "react";
import ExerciseCard from "./ExerciseCard";

export default function DayView({ dia, warmup }) {
  // Rastrea qué ejercicio está expandido (solo uno a la vez)
  // null = ninguno expandido
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Rastrea si el calentamiento está expandido
  const [warmupExpanded, setWarmupExpanded] = useState(false);

  // Toggle: si ya está abierto el mismo, lo cierra; si no, abre el nuevo
  const toggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      {/* ─── Encabezado del día ─── */}
      <div style={styles.header}>
        <div style={styles.dayBadge}>DÍA {dia.dia}</div>
        {dia.tipo && <div style={styles.tipo}>{dia.tipo}</div>}
      </div>

      {/* ─── Calentamiento (si existe para este día) ─── */}
      {warmup && warmup.ejercicios.length > 0 && (
        <div style={styles.warmupSection}>
          {/* Toggle del calentamiento */}
          <button
            style={styles.warmupToggle}
            onClick={() => setWarmupExpanded(!warmupExpanded)}
          >
            <span style={styles.warmupIcon}>🔥</span>
            <span style={styles.warmupLabel}>Calentamiento</span>
            <span style={{ marginLeft: "auto", fontSize: "13px", color: "#aaa" }}>
              {warmupExpanded ? "▲" : "▼"}
            </span>
          </button>

          {warmupExpanded && (
            <div style={styles.warmupList}>
              {warmup.ejercicios.map((ej, i) => (
                <div key={i} style={styles.warmupItem}>
                  {/* Punto decorativo */}
                  <span style={styles.warmupDot} />
                  <div>
                    <div style={styles.warmupName}>{ej.nombre}</div>
                    <div style={styles.warmupMeta}>
                      {ej.series} series · {ej.reps}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Lista de ejercicios principales ─── */}
      <div style={styles.exerciseList}>
        {dia.ejercicios.map((ejercicio, i) => (
          <ExerciseCard
            key={i}
            exercise={ejercicio}
            index={i}
            expanded={expandedIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* ─── Nota sobre AMRAP ─── */}
      {dia.ejercicios.some((e) => String(e.series).includes("AMRAP")) && (
        <div style={styles.note}>
          <strong>AMRAP:</strong> As Many Reps As Possible (tantas como puedas con buena técnica)
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "0 0 8px",
  },
  // Encabezado con número de día y tipo
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
    paddingBottom: "12px",
    borderBottom: "1px solid #eee",
  },
  dayBadge: {
    background: "#111",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "99px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.05em",
  },
  tipo: {
    fontSize: "12px",
    color: "#888",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  // Sección calentamiento
  warmupSection: {
    marginBottom: "16px",
    border: "1px solid #e8e8e8",
    borderRadius: "10px",
    overflow: "hidden",
  },
  warmupToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "12px 14px",
    background: "#fafafa",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
  },
  warmupIcon: { fontSize: "15px" },
  warmupLabel: { flex: 1, textAlign: "left" },
  warmupList: {
    padding: "10px 14px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderTop: "1px solid #eee",
  },
  warmupItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  warmupDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#ccc",
    marginTop: "6px",
    flexShrink: 0,
  },
  warmupName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#222",
    lineHeight: 1.3,
  },
  warmupMeta: {
    fontSize: "12px",
    color: "#888",
    marginTop: "2px",
  },
  exerciseList: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  // Nota al pie sobre términos
  note: {
    marginTop: "12px",
    padding: "10px 12px",
    background: "#f5f5f5",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#666",
    lineHeight: 1.5,
  },
};
